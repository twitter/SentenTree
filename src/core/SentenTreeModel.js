import WordFilter from './WordFilter.js';
import { tokenize } from './tokenizer.js';

const DEFAULT_FILTER = new WordFilter();
const DEFAULT_NODE_COUNT = 150;

function expandSeqTree(rootSeq, graphs, expandCnt, minSupport, maxSupport, terms, itemset) {
  if( rootSeq.words ) {
    for( var i = 0; i < rootSeq.words.length; i++ ) {
      rootSeq.graph.nodes.push(rootSeq.words[i]);
      expandCnt--;
    }
  }

  var seqs = [];
  var leafSeqs = [];
  seqs.push(rootSeq);
  while(seqs.length > 0 && expandCnt > 0) {
    /* find the candidate sequence with largest support DB */
    seqs.sort(function(a, b) {return a.size - b.size;}); // TODO: rewrite
    var s = seqs.pop();

    var graph = s.graph;

    var s0 = s.r, s1 = s.l;

    if( !s0 && !s1 ) {
      /* find the next frequent sequence */
      var result = growSeq(s, terms, minSupport, maxSupport, itemset);
      s0 = result.s0;
      s1 = result.s1;
      var word = result.word;
      var pos = result.pos;
      var cnt = result.cnt;

      if( cnt < minSupport ) {
        leafSeqs.push(s);
      }
      else{
        /* create new sequences and add new word */
        if(!graph) {
          graph = new Graph(minSupport, maxSupport);
          graphs.push(graph);
        }
        var newWord = {entity:itemset[word], freq:cnt, id:graph.totalNodeCnt++};
        newWord.topTweet = s1.DBs[0].tweetId;
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
      //console.log(s1.newWord.entity);
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

  leafSeqs = leafSeqs.concat(seqs);
  return leafSeqs;
}

function growSeq(seq, terms, minSupport, maxSupport, itemset) {
  /* find the next frequent sequence by inserting a new word to current sequence */
  var pos = -1;
  var word = null;
  var cnt = 0;
  for(var s = 0; s <= seq.words.length; s++ ) {
    var fdist = {};
    seq.DBs.forEach(function(t) {
      var l, r;
      if( s == 0 )
        l = 0;
      else
        l = t.seqIndices[s-1] + 1;
      if( s == seq.words.length )
        r = t.tokens.length;
      else
        r = t.seqIndices[s];
      var duplicate = [];
      for(var i = l; i < r; i++ ) {
        var w = t.tokens[i];
        if( w in duplicate )
          continue;
        else
          duplicate.push(w);
        if( w in fdist)
          fdist[w] += t.cnt;
        else
          fdist[w] = t.cnt;
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
    if( maxc > cnt ) {
      pos = s;
      word = maxw;
      cnt = maxc;
    }
  }

  var s0 = null, s1 = null;

  /* split the current group in two */
  if( cnt >= minSupport ) {
      s0 = {size:0, DBs:[]};
      s1 = {size:0, DBs:[]};
      var words = seq.words;
      for(var ti = 0; ti < seq.DBs.length; ti ++ ) {
        var t = seq.DBs[ti];
        var l, r;
        if( pos == 0 )
          l = 0;
        else
          l = t.seqIndices[pos-1] + 1;
        if( pos == words.length )
          r = t.tokens.length;
        else
          r = t.seqIndices[pos];
        var i = t.tokens.slice(l, r).indexOf(word);
        if( i < 0 ) {
          s0.DBs.push(t);
          s0.size += t.cnt;
        }
        else {
          i += l;
          t.seqIndices.splice(pos, 0, i);
          s1.DBs.push(t);
          s1.size += t.cnt;
        }
      }
  }

  return {word:word, pos:pos, cnt:cnt, s0:s0, s1:s1};
}

function updateNodesEdges( graphs, leafSeqs ) {
  graphs.forEach( function(graph) {
    for( var i = 0; i < graph.nodes.length; i++ ) {
      graph.nodes[i].nid = i;
    }
  });
  var freqMax = 0, freqMin = 0;

  leafSeqs.forEach( function(seq) {
    if( graphs.indexOf(seq.graph) >= 0 ) {
      var words = seq.words;
//        printSeq(seq);
      for( var i = 0; i < words.length - 1; i++ ) {
        var linkadj = seq.graph.linkadj;
        if( !(words[i].nid in linkadj ) )
          linkadj[words[i].nid] = {};
        if( words[i+1].nid in linkadj[words[i].nid] )
          linkadj[words[i].nid][words[i+1].nid] += seq.size;
        else
          linkadj[words[i].nid][words[i+1].nid] = seq.size;

        if (freqMax == 0 && freqMin == 0) {
          freqMax = freqMin = words[i].freq;
        } else if (words[i].freq > freqMax) {
          freqMax = words[i].freq;
        } else if (words[i].freq < freqMin) {
          freqMin = words[i].freq;
        }
      }
      for( var i = 0; i < words.length; i++ ) {
        if( !words[i].leafSeq || words[i].leafSeq.size < seq.size )
          words[i].leafSeq = seq;
      }
    }
  });
  console.log(freqMax);
  graphs.forEach (function(graph){
    graph.graphsFreqMax = freqMax;
    graph.graphsFreqMin = freqMin;
  });

  return {graphsFreqMax: freqMax, graphsFreqMin: freqMin};
}

function printSeq (words) {
  var str = "";
  for( var i = 0; i < words.length; i++ )
    str += words[i].entity + " ";
  console.log(str);
}

export default class SentenTreeModel {
  constructor(
    entries,
    wordFilter = DEFAULT_FILTER,
    termWeights = {}
  ) {
    const dataset = tokenize(entries).filter(wordFilter);
    const terms = dataset.encodeTermWeights(termWeights);

    // Revised from initGraphs
    const entries = dataset.entries;
    const dbsize = dataset.computeSize();
    entries.forEach(function(t) {
      t.seqIndices = [];
      t.tokens.forEach(function(i) {return +i;});
    });
    console.log('dbsize = ' + dbsize);

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
      .filter(g =>  graph.nodes.length > 2)
      .slice(0, 10);

    const graphsFreq = updateNodesEdges(this.graphs, visibleGroups);
    this.graphsFreqMin = graphsFreq.graphsFreqMin;
    this.graphsFreqMax = graphsFreq.graphsFreqMax;
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

    const graphsFreq = updateNodesEdges(this.graphs, visibleGroups);
    this.graphsFreqMin = graphsFreq.graphsFreqMin;
    this.graphsFreqMax = graphsFreq.graphsFreqMax;
  }
}