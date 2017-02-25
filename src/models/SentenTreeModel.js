import { max, min } from 'lodash';

import Heap from 'heap';
import RawGraph from './RawGraph.js';

const DEFAULT_NODE_COUNT = 150;

function growSeq(seq, terms, minSupport, maxSupport, itemset) {
  /* find the next frequent sequence by inserting a new word to current sequence */
  let pos = -1;
  let word = null;
  let count = 0;
  const len = seq.words.length;
  for (let s = 0; s <= len; s++) {
    const fdist = {};
    seq.DBs.forEach(t => {
      const l = s === 0 ? 0 : t.seqIndices[s - 1] + 1;
      const r = s === len ? t.tokens.length : t.seqIndices[s];
      const duplicate = {};
      for (let i = l; i < r; i++) {
        const w = t.tokens[i];

        if (duplicate[w]) continue;
        duplicate[w] = true;

        if (w in fdist) {
          fdist[w] += t.count;
        } else {
          fdist[w] = t.count;
        }
      }
    });

    let maxw = null;
    let maxc = 0;

    const isNotRoot = len > 0;
    const words = isNotRoot
      ? Object.keys(fdist)
      : Object.keys(fdist).filter(w => !itemset[w].startsWith('#'));

    words.forEach(w => {
      const value = fdist[w];
      if (value < maxSupport && value > maxc) {
        maxw = +w;
        maxc = value;
      }
    });

    if (maxc > count) {
      pos = s;
      word = maxw;
      count = maxc;
    }
  }

  let s0 = null;
  let s1 = null;

  /* split the current group in two */
  if (count >= minSupport) {
    s0 = { size: 0, DBs: [] };
    s1 = { size: 0, DBs: [] };
    const words = seq.words;
    for (let ti = 0; ti < seq.DBs.length; ti ++) {
      const t = seq.DBs[ti];
      const l = pos === 0 ? 0 : t.seqIndices[pos - 1] + 1;
      const r = pos === words.length ? t.tokens.length : t.seqIndices[pos];
      let i = t.tokens.slice(l, r).indexOf(word);
      if (i < 0) {
        s0.DBs.push(t);
        s0.size += t.count;
      } else {
        i += l;
        t.seqIndices.splice(pos, 0, i);
        s1.DBs.push(t);
        s1.size += t.count;
      }
    }
  }

  return { word, pos, count, s0, s1 };
}

function expandSeqTree(rootSeq, graphs, expandCnt, minSupport, maxSupport, terms, itemset) {
  if (rootSeq.words && rootSeq.words.length > 0) {
    rootSeq.graph.nodes = rootSeq.graph.nodes.concat(rootSeq.words);
    expandCnt -= rootSeq.words.length;
  }

  /* Create a max heap */
  const seqs = new Heap((a, b) => b.size - a.size);
  seqs.push(rootSeq);
  const leafSeqs = [];

  while (!seqs.empty() && expandCnt > 0) {
    /* find the candidate sequence with largest support DB */
    const s = seqs.pop();
    let graph = s.graph;
    let s0 = s.r;
    let s1 = s.l;

    if (!s0 && !s1) {
      /* find the next frequent sequence */
      const result = growSeq(s, terms, minSupport, maxSupport, itemset);
      s0 = result.s0;
      s1 = result.s1;
      const { word, pos, count } = result;

      if (count < minSupport) {
        leafSeqs.push(s);
      } else {
        /* create new sequences and add new word */
        if (!graph) {
          graph = new RawGraph(minSupport, maxSupport);
          graphs.push(graph);
        }
        const newWord = {
          id: graph.totalNodeCnt++,
          entity: itemset[word],
          freq: count,
          topEntries: s1.DBs.slice(0, 5),
          seq: s1,
        };
        const newWords = s.words.slice();
        newWords.splice(pos, 0, newWord);
        s0.words = s.words;
        s1.words = newWords;
        s1.newWord = newWord;
        s0.graph = s.graph;
        s1.graph = graph;
      }
    }

    if (s1) {
      s1.graph.nodes.push(s1.newWord);
      expandCnt--;
    }

    /* add new sequences to seqTree */
    s.l = s1;
    s.r = s0;

    /* add new sequences to candidates */
    if (s1) {
      seqs.push(s1);
    }
    if (s0 && s0.size >= minSupport) {
      seqs.push(s0);
    }
  }

  return leafSeqs.concat(seqs.toArray());
}

function updateNodesEdges(graphs, leafSeqs) {
  leafSeqs
    .filter(seq => graphs.indexOf(seq.graph) >= 0)
    .forEach(seq => {
      const words = seq.words;
      const linkadj = seq.graph.linkadj;
      // printSeq(seq);
      for (let i = 0; i < words.length - 1; i++) {
        const word = words[i];
        const id = word.id;
        const nextId = words[i + 1].id;

        if (!(id in linkadj)) linkadj[id] = {};

        if (nextId in linkadj[id]) {
          linkadj[id][nextId] += seq.size;
        } else {
          linkadj[id][nextId] = seq.size;
        }
      }

      words
        .filter(word => !word.leafSeq || word.leafSeq < seq.size)
        .forEach(word => { word.leafSeq = seq; });
    });
}

function printSeq(words) {
  const str = words.map(w => w.entity).join(' ');
  console.log(str);
}

export default class SentenTreeModel {
  constructor(tokenizedData, termWeights = {}) {
    // Revised from initGraphs
    const { itemset, entries } = tokenizedData;
    this.tokenizedData = tokenizedData;
    this.terms = tokenizedData.encodeTermWeights(termWeights);
    const size = tokenizedData.computeSize();

    this.supportRange = [
      Math.max(size * 0.001, 2),
      size / 3,
    ];
    const [minSupport, maxSupport] = this.supportRange;

    this.rootSeq = {
      words: [],
      newWord: null,
      graph: null,
      size,
      DBs: entries,
    };

    const graphs = [];
    const visibleGroups = expandSeqTree(
      this.rootSeq,
      graphs,
      DEFAULT_NODE_COUNT,
      minSupport,
      maxSupport,
      this.terms,
      itemset
    );

    this.graphs = graphs
      .filter(g => g.nodes.length > 2)
      .slice(0, 10);

    updateNodesEdges(this.graphs, visibleGroups);
  }

  updateGraphs(newRootSeq) {
    this.graphs.forEach(g => g.clear());
    const rootSeq = newRootSeq || this.rootSeq;
    const [minSupport, maxSupport] = this.supportRange;

    const visibleGroups = expandSeqTree(
      rootSeq,
      this.graphs,
      DEFAULT_NODE_COUNT,
      minSupport,
      maxSupport,
      this.terms,
      this.tokenizedData.itemset
    );

    updateNodesEdges(this.graphs, visibleGroups);
    return this;
  }

  size() {
    return this.rootSeq.size;
  }

  getRenderedGraphs(limit) {
    const graphs = arguments.length === 1
      ? this.graphs.slice(0, limit)
      : this.graphs;
    const renderedGraphs = graphs.map(g => g.toRenderedGraph());
    const globalFreqRange = [
      min(renderedGraphs.map(g => g.freqRange[0])),
      max(renderedGraphs.map(g => g.freqRange[1])),
    ];
    let idPool = 0;
    renderedGraphs.forEach(g => {
      g.globalFreqRange = globalFreqRange;
      g.nodes.forEach(n => {
        n.gid = idPool;
        idPool++;
      });
    });
    return renderedGraphs;
  }

}
