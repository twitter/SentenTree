import { sum } from 'lodash-es';

const defaultNodeCnt = 150;

export function initGraphs(tokens, terms) {
  if(!tokens) return {
    root: null,
    graphs:[]
  };

  console.log('tokens', tokens);

  const entries = tokens.entries;
  const dbsize = sum(entries.map(e => e.cnt));
  entries.forEach(function(t) {
    t.seqIndices = [];
    t.tokens.forEach(function(i) {return +i;});
  });
  console.log('dbsize = ' + dbsize);

  const minSupport = Math.max(dbsize * 0.001, 2);
  const maxSupport = dbsize / 3;

  const rootSeq = {
    words: [],
    newWord: null,
    graph: null,
    size: dbsize,
    DBs: entries
  };
  var graphs = [];

  var visibleGroups = expandSeqTree(rootSeq, graphs, defaultNodeCnt, minSupport, maxSupport, terms, tokens.itemset);

  graphs = graphs.filter(function(graph) {
    return graph.nodes.length > 2;
  }).slice(0, 10);

  const graphsFreq = updateNodesEdges(graphs, visibleGroups);

  return {
    root:rootSeq,
    graphs: graphs,
    minSupport,
    maxSupport,
    graphsFreqMax: graphsFreq.graphsFreqMax,
    graphsFreqMin: graphsFreq.graphsFreqMin,
  };
}

export function updateGraphs( tokens, terms, rootSeq, minSupport, maxSupport, graphs, visRootSeq ) {
  graphs.forEach( function(graph){
    graph.nodes = [];
    graph.linkadj = {};
  });

  if( !visRootSeq )
    visRootSeq = rootSeq;

  var itemset = tokens.itemset;

  var visibleGroups = expandSeqTree(visRootSeq, graphs, defaultNodeCnt, minSupport, maxSupport, terms, itemset);

  graphsFreq = updateNodesEdges(graphs, visibleGroups);

  return {
    root:rootSeq,
    graphs:graphs,
    graphsFreqMax: graphsFreq.graphsFreqMax,
    graphsFreqMin: graphsFreq.graphsFreqMin,
  };
}

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
          graph = {nodes:[], linkadj:[], minSupport:minSupport, maxSupport:maxSupport, totalNodeCnt:0};
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

export function growGraphs(tokens, terms) {
  if(!tokens) return [];

  var itemset = tokens.itemset;
  var entries = tokens.entries;
  var dbsize = 0;

  for(var i = 0; i < entries.length; i++ )
    dbsize += entries[i].cnt;
  var minSupport = dbsize * 0.002;
  if( minSupport < 2 ) minSupport = 2;
  console.log("dbsize = " + dbsize + " minSupport = " + minSupport);

  var maxNumNodes = 200, nodeCnt = 0;

  //TODO: function - remove stopwords from entries

  var graphs = [];
  var groups = [];
  var finalSeqs = [];

  //init groups
  entries.forEach(function(t) {
    t.seqIndices = [];
    t.tokens.forEach(function(i) {return +i;});
  });
  var g0 = {seq:[], graph:null, size:dbsize, DBs:entries};
  groups.push(g0);

  //grow groups
  while(groups.length>0 && nodeCnt < maxNumNodes) {
    var g = groups.pop();
    var graph = g.graph;

    var pos = -1;
    var word = null;
    var cnt = 0;
    for(var s = 0; s <= g.seq.length; s++ ) {
      var fdist = {};
      g.DBs.forEach(function(t) {
        var l, r;
        if( s == 0 )
          l = 0;
        else
          l = t.seqIndices[s-1] + 1;
        if( s == g.seq.length )
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
        if( fdist[w] > maxc && (!(w in terms) || g.seq.length >= terms[w] ) ) {
          maxw = +w;
          maxc = fdist[w];
        }
      if( maxc > cnt ) {
        pos = s;
        word = maxw;
        cnt = maxc;
      }
    }

    if(cnt < minSupport) {
      finalSeqs.push({seq:g.seq, cnt:g.size, topTweet:g.DBs[0].tweetId});
      continue;
    }

    // add new node
    if(!graph) {
      graph = {nodes:[], linkadj:[], minSupport:minSupport, DBsize:cnt};
      graphs.push(graph);
    }
    var nodes = graph.nodes;
    var linkadj = graph.linkadj;
    var newWord = {entity:itemset[word], freq:cnt, id:nodes.length};
console.log(newWord.entity);
    nodes.push(newWord);
    nodeCnt++;
    var seq = g.seq;
    var newSeq = g.seq.slice();
    newSeq.splice(pos, 0, newWord);
    var g0 = {seq:seq, graph:g.graph, size:0, DBs:[]};
    var g1 = {seq:newSeq, graph:graph, size:0, DBs:[]};
    // divide tweets in DBs into two groups
    for(var ti = 0; ti < g.DBs.length; ti ++ ) {
      var t = g.DBs[ti];
      var l, r;
      if( pos == 0 )
        l = 0;
      else
        l = t.seqIndices[pos-1] + 1;
      if( pos == seq.length )
        r = t.tokens.length;
      else
        r = t.seqIndices[pos];
      var i = t.tokens.slice(l, r).indexOf(word);
      if( i < 0 ) {
        g0.DBs.push(t);
        g0.size += t.cnt;
      }
      else {
        i += l;
        t.seqIndices.splice(pos, 0, i);
        g1.DBs.push(t);
        g1.size += t.cnt;
      }
    }
    newWord.freq = g1.size;
    newWord.seq = newSeq;
    newWord.topTweet = g1.DBs[0].tweetId;
    // add new links
    if( pos <= 0 ){
      if( seq && seq.length > 0 ) {
        linkadj[newWord.id] = {};
        linkadj[newWord.id][seq[0].id] = g1.size;
      }
    }
    else if( pos >= seq.length ) {
      if( !(seq[seq.length-1].id in linkadj))
        linkadj[seq[seq.length-1].id] = {};
      linkadj[seq[seq.length-1].id][newWord.id] = g1.size;
    }
    else {
      linkadj[seq[pos-1].id][seq[pos].id] -= g1.size;
      linkadj[seq[pos-1].id][newWord.id] = g1.size;
      linkadj[newWord.id] = {};
      linkadj[newWord.id][seq[pos].id] = g1.size;
      if(linkadj[seq[pos-1].id][seq[pos].id] < minSupport)
        delete linkadj[seq[pos-1].id][seq[pos].id];
    }
    // push g0 and g1
    groups.push(g1);
    if(g0.size >= minSupport )
      groups.push(g0);
    groups.sort(function(a, b) {return a.size - b.size;});
  }
  console.log('nodeCnt = ' + nodeCnt);

  // sort seqs and assign top seqs & tweets to each node
  /*
  finalSeqs.sort(function(s1, s2){return s2.cnt - s1.cnt;});
  console.log('finalSeq num: ' + finalSeqs.length);
  for(var i = 0; i < finalSeqs.length; i++ ) {
    var s = finalSeqs[i];
    for(var j = 0; j < s.seq.length; j++ ) {
      var node = s.seq[j];
      if( !( 'seq' in node )) {
        node.seq = s.seq;
        node.seqCnt = s.cnt;
        node.topTweet = s.topTweet;
      }
    }
  }
  */

  return graphs;
}
