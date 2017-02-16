import Heap from 'heap';
import RawGraph from './RawGraph.js';
import WordFilter from './WordFilter.js';
import { tokenize } from './tokenizer.js';

const DEFAULT_NODE_COUNT = 150;

function expandSeqTree(rootSeq, graphs, expandCnt, minSupport, maxSupport, terms, itemset) {
  if (rootSeq.words && rootSeq.words.length > 0) {
    rootSeq.graph.nodes = rootSeq.graph.nodes.concat(rootSeq.words);
    expandCnt -= rootSeq.words.length;
  }

  /* Create a max heap */
  const seqs = new Heap((a, b) => b.size - a.size);
  seqs.push(rootSeq);
  const leafSeqs = [];

  while(!seqs.empty() && expandCnt > 0) {
    /* find the candidate sequence with largest support DB */
    const s = seqs.pop();
    let graph = s.graph;
    let s0 = s.r;
    let s1 = s.l;

    if( !s0 && !s1 ) {
      /* find the next frequent sequence */
      var result = growSeq(s, terms, minSupport, maxSupport, itemset);
      s0 = result.s0;
      s1 = result.s1;
      var word = result.word;
      var pos = result.pos;
      var count = result.count;

      if( count < minSupport ) {
        leafSeqs.push(s);
      }
      else{
        /* create new sequences and add new word */
        if(!graph) {
          graph = new RawGraph(minSupport, maxSupport);
          graphs.push(graph);
        }
        var newWord = {
          entity:itemset[word],
          freq:count,
          id:graph.totalNodeCnt++
        };
        newWord.topEntry = s1.DBs[0];
        var newWords = s.words.slice();
        newWords.splice(pos, 0, newWord);
        newWord.seq = s1;
        s0.words = s.words;
        s1.words = newWords;
        s1.newWord = newWord;
        s0.graph = s.graph;
        s1.graph = graph;
      }
    }

    if(s1) {
      s1.graph.nodes.push(s1.newWord);
      expandCnt--;
    }

    /* add new sequences to seqTree */
    s.l = s1;
    s.r = s0;

    /* add new sequences to candidates */
    if(s1)
      seqs.push(s1);
    if(s0 && s0.size >= minSupport )
      seqs.push(s0);
  }

  return leafSeqs.concat(seqs.toArray());
}

function growSeq(seq, terms, minSupport, maxSupport, itemset) {
  /* find the next frequent sequence by inserting a new word to current sequence */
  var pos = -1;
  var word = null;
  var count = 0;
  for(var s = 0; s <= seq.words.length; s++ ) {
    const fdist = {};
    seq.DBs.forEach(function(t) {
      const l = s === 0 ? 0 : t.seqIndices[s-1] + 1;
      const r = s === seq.words.length ? t.tokens.length : t.seqIndices[s];
      // const duplicate = {};
      // for(var i = l; i < r; i++ ) {
      //   const w = t.tokens[i];

      //   if(duplicate[w]) continue;
      //   duplicate[w] = true;

      //   if( w in fdist) {
      //     fdist[w] += t.count;
      //   } else {
      //     fdist[w] = t.count;
      //   }
      // }
      var duplicate = [];
      for(var i = l; i < r; i++ ) {
        var w = t.tokens[i];
        console.log('w', w);
        if( w in duplicate )
          continue;
        else
          duplicate.push(w);
        if( w in fdist)
          fdist[w] += t.count;
        else
          fdist[w] = t.count;
      }

    });
    var maxw = null, maxc = 0;
    for(var w in fdist)
      if( fdist[w] < maxSupport && fdist[w] > maxc &&
        (!itemset[w].startsWith('#') || seq.words.length > 0) // no hashtag as root of tree
      ) {

//      if (fdist[w] > maxc && !itemset[w].startsWith('#') && (!(w in terms) || seq.words.length >= terms[w] ) ) {
// console.log(itemset[w].startsWith('#'));
        maxw = +w;
        maxc = fdist[w];
      }
    if( maxc > count ) {
      pos = s;
      word = maxw;
      count = maxc;
    }
  }

  let s0 = null, s1 = null;

  /* split the current group in two */
  if( count >= minSupport ) {
      s0 = {size:0, DBs:[]};
      s1 = {size:0, DBs:[]};
      var words = seq.words;
      for(var ti = 0; ti < seq.DBs.length; ti ++ ) {
        var t = seq.DBs[ti];
        const l = pos === 0 ? 0 : t.seqIndices[pos-1] + 1;
        const r = pos === words.length ? t.tokens.length : t.seqIndices[pos];
        var i = t.tokens.slice(l, r).indexOf(word);
        if( i < 0 ) {
          s0.DBs.push(t);
          s0.size += t.count;
        }
        else {
          i += l;
          t.seqIndices.splice(pos, 0, i);
          s1.DBs.push(t);
          s1.size += t.count;
        }
      }
  }

  return { word, pos, count, s0, s1 };
}

function printSeq (words) {
  const str = words.map(w => w.entity).join(' ');
  console.log(str);
}

export default class SentenTreeModel {
  constructor(
    inputEntries,
    wordFilter = WordFilter.DEFAULT,
    termWeights = {}
  ) {
    const dataset = tokenize(inputEntries).filter(wordFilter);
    const terms = dataset.encodeTermWeights(termWeights);

    // Revised from initGraphs
    const entries = dataset.entries;
    const dbsize = dataset.computeSize();
    entries.forEach(function(t) {
      t.seqIndices = [];
      t.tokens.forEach(function(i) {return +i;});
    });
    console.log('dbsize', dbsize);

    this.tokenizedData = dataset;
    this.terms = terms;

    this.supportRange = [
      Math.max(dbsize * 0.001, 2),
      dbsize / 3
    ];
    const [minSupport, maxSupport] = this.supportRange;

    this.rootSeq = {
      words: [],
      newWord: null,
      graph: null,
      size: dbsize,
      DBs: entries
    };

    let graphs = [];
    const visibleGroups = expandSeqTree(
      this.rootSeq,
      graphs,
      DEFAULT_NODE_COUNT,
      minSupport,
      maxSupport,
      this.terms,
      dataset.itemset
    );

    this.graphs = graphs
      .filter(g =>  g.nodes.length > 2)
      .slice(0, 10);

    this.updateNodesEdges(this.graphs, visibleGroups);
  }

  updateGraphs(newRootSeq) {
    this.graphs.forEach(g => g.clear());
    const rootSeq = newRootSeq || this.rootSeq;
    const [minSupport, maxSupport] = this.supportRange;

    const visibleGroups = expandSeqTree(
      visRootSeq,
      this.graphs,
      DEFAULT_NODE_COUNT,
      minSupport,
      maxSupport,
      this.terms,
      this.tokenizedData.itemset
    );

    this.updateNodesEdges(this.graphs, visibleGroups);

    return this;
  }

  updateNodesEdges(graphs, leafSeqs) {
    let freqMin = Number.MAX_SAFE_INTEGER;
    let freqMax = 0;

    leafSeqs
      .filter(seq => graphs.indexOf(seq.graph) >= 0)
      .forEach( function(seq) {
        const words = seq.words;
        const linkadj = seq.graph.linkadj;
        // printSeq(seq);
        for(let i = 0; i < words.length - 1; i++) {
          const word = words[i];
          const id = word.id;
          const freq = word.freq;
          const nextId = words[i+1].id;

          if (!(id in linkadj)) linkadj[id] = {};

          if(nextId in linkadj[id])
            linkadj[id][nextId] += seq.size;
          else
            linkadj[id][nextId] = seq.size;

          freqMin = Math.min(freq, freqMin);
          freqMax = Math.max(freq, freqMax);
        }

        words
          .filter(word => !word.leafSeq || word.leafSeq < seq.size)
          .forEach(word => { word.leafSeq = seq; });
      });

    graphs.forEach (graph => {
      graph.freqMin = freqMin;
      graph.freqMax = freqMax;
    });

    this.freqMin = freqMin;
    this.freqMax = freqMax;

    return this;
  }
}