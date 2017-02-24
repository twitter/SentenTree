(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("d3"), require("heap"), require("d3kit"), require("webcola/WebCola/cola.js"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "d3", "heap", "d3kit", "webcola/WebCola/cola.js"], factory);
	else if(typeof exports === 'object')
		exports["SentenTree"] = factory(require("lodash"), require("d3"), require("heap"), require("d3kit"), require("webcola/WebCola/cola.js"));
	else
		root["SentenTree"] = factory(root["_"], root["d3"], root["heap"], root["d3Kit"], root["cola"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NLTK_STOP_WORDS = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'nor', 'only', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']; // removed 'own', 'not', 'no' from stopwords

var CUSTOM_STOP_WORDS = ['de', 'la', 'y', 'un', 'que', 'en', 'el', 'shit', 'fuck', 'fucking']; // spanish
var TWEET_STOP_WORDS = ['rt', 'via', 'amp', 'http', 'https', 'm', 're', 'co'];
var DEFAULT_STOP_WORDS = (0, _lodash.uniq)(NLTK_STOP_WORDS.concat(CUSTOM_STOP_WORDS).concat(TWEET_STOP_WORDS));

var WordFilter = function () {
  function WordFilter() {
    var _this = this;

    var includeWords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var excludeWords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, WordFilter);

    if (includeWords && includeWords.length > 0) {
      this.stopWords = (0, _lodash.uniq)(DEFAULT_STOP_WORDS.concat(includeWords));
    } else {
      this.stopWords = DEFAULT_STOP_WORDS;
    }
    if (excludeWords && excludeWords.length > 0) {
      (function () {
        var exclusionLookup = (0, _lodash.keyBy)(excludeWords, function (w) {
          return w;
        });
        _this.stopWords = _this.stopWords.filter(function (w) {
          return !exclusionLookup[w];
        });
      })();
    }
    this.regex = new RegExp('^(' + this.stopWords.join('|') + ')$');
  }

  _createClass(WordFilter, [{
    key: 'test',
    value: function test(word) {
      return this.regex.test(word);
    }
  }]);

  return WordFilter;
}();

exports.default = WordFilter;


var defaultFilter = null;
WordFilter.getDefault = function () {
  if (!defaultFilter) {
    defaultFilter = new WordFilter();
  }
  return defaultFilter;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;

var _TokenizedDataset = __webpack_require__(12);

var _TokenizedDataset2 = _interopRequireDefault(_TokenizedDataset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATTERN = /http:\/\/t\.co\/\w+|http:\/\/vine\.co\/\w+|http:\/\/t\.co\w+|http:\/\/vine\.co\w+|http:\/\/t\.\w+|http:\/\/vine\.\w+|http:\/\/\w+|\@\w+|\#\w+|\d+(,\d+)+|\w+(-\w+)*|\$?\d+(\.\d+)?\%?|([A-Z]\.)+/g;

// tweets follow this format: tweetId, tweetText, # of retweets
function tokenize(inputEntries) {
  var vocabularies = {};
  var itemset = [];
  var entries = inputEntries.filter(function (entry) {
    return PATTERN.exec(entry[1]);
  }).map(function (entry) {
    var tokens = [];
    PATTERN.lastIndex = 0;
    var tokenResult = void 0;
    while ((tokenResult = PATTERN.exec(entry.text)) != null) {
      var t = tokenResult[0].trim();
      // HACK
      if (t === 'scores' || t === 'scored') {
        t = 'score';
      }
      if (!(t in vocabularies)) {
        vocabularies[t] = itemset.length;
        itemset.push(t);
      }
      tokens.push(vocabularies[t]);
    }

    return {
      id: entry.id,
      tokens: tokens,
      count: entry.count || 1,
      rawText: entry.text
    };
  });

  return new _TokenizedDataset2.default(vocabularies, itemset, entries);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Link = function () {
  function Link(sourceNode, targetNode, freq) {
    _classCallCheck(this, Link);

    this.source = sourceNode;
    this.target = targetNode;
    this.freq = freq;
    this.attachPoints = {
      x1: 0,
      y1: 0,
      x2: 1,
      y2: 1
    };
  }

  _createClass(Link, [{
    key: 'getKey',
    value: function getKey() {
      return [this.source.id, this.target.id].join(',');
    }
  }, {
    key: 'isTheOnlyBridge',
    value: function isTheOnlyBridge() {
      return this.source.rightLinks.length === 1 && this.target.leftLinks.length === 1;
    }
  }, {
    key: 'toConstraint',
    value: function toConstraint() {
      var gap = this.isTheOnlyBridge() ? 5 : 15;
      return {
        axis: 'x',
        left: this.source.id,
        right: this.target.id,
        gap: (this.source.width + this.target.width) / 2 + gap
      };
    }
  }, {
    key: 'toOnlyBridgeConstraint',
    value: function toOnlyBridgeConstraint() {
      return {
        type: 'alignment',
        axis: 'y',
        offsets: [{ node: this.source.id, offset: 0 }, { node: this.target.id, offset: 0 }]
      };
    }
  }]);

  return Link;
}();

exports.default = Link;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(rawNode) {
    _classCallCheck(this, Node);

    this.data = rawNode;
    this.leftLinks = [];
    this.rightLinks = [];

    this.id = -1;
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 18;
  }

  _createClass(Node, [{
    key: 'isLeaf',
    value: function isLeaf() {
      return this.leftLinks.length === 0 || this.rightLinks.length === 0;
    }
  }, {
    key: 'isLeftLeaf',
    value: function isLeftLeaf() {
      return this.leftLinks.length === 0;
    }
  }, {
    key: 'isRightLeaf',
    value: function isRightLeaf() {
      return this.rightLinks.length === 0;
    }
  }, {
    key: 'leftEdge',
    value: function leftEdge() {
      return this.x - this.width / 2;
    }
  }, {
    key: 'rightEdge',
    value: function rightEdge() {
      return this.x + this.width / 2;
    }
  }, {
    key: 'getLeftNodes',
    value: function getLeftNodes() {
      return this.leftLinks.map(function (l) {
        return l.source;
      });
    }
  }, {
    key: 'getRightNodes',
    value: function getRightNodes() {
      return this.rightLinks.map(function (l) {
        return l.target;
      });
    }
  }, {
    key: 'createAlignmentConstraints',
    value: function createAlignmentConstraints(axis, nodes) {
      return nodes.length > 1 ? {
        type: 'alignment',
        axis: axis,
        offsets: nodes.map(function (n) {
          return { node: n.id, offset: 0 };
        })
      } : null;
    }
  }, {
    key: 'computeLeftConstraints',
    value: function computeLeftConstraints() {
      var nodes = this.getLeftNodes().filter(function (n) {
        return n.rightLinks.length === 1;
      });

      return this.createAlignmentConstraints('x', nodes);
    }
  }, {
    key: 'computeRightConstraints',
    value: function computeRightConstraints() {
      var nodes = this.getRightNodes().filter(function (n) {
        return n.leftLinks.length === 1;
      });

      return this.createAlignmentConstraints('x', nodes);
    }
  }, {
    key: 'computeOrderConstraints',
    value: function computeOrderConstraints() {
      var rules = [];

      if (this.getRightNodes().length > 1) {
        var nodes = this.getRightNodes();
        for (var i = 1; i < nodes.length; i++) {
          rules.push({
            axis: 'y',
            left: nodes[i - 1].id,
            right: nodes[i].id,
            gap: 5
          });
        }
      }
      if (this.getLeftNodes().length > 1) {
        var _nodes = this.getLeftNodes();
        for (var _i = 1; _i < _nodes.length; _i++) {
          rules.push({
            axis: 'y',
            left: _nodes[_i - 1].id,
            right: _nodes[_i].id,
            gap: 5
          });
        }
      }

      return rules;
    }
  }, {
    key: 'updateAttachPoints',
    value: function updateAttachPoints() {
      var _this = this;

      if (this.leftLinks.length === 1) {
        this.leftLinks[0].attachPoints.y2 = this.y;
      } else if (this.leftLinks.length > 1) {
        (function () {
          var totalLeft = (0, _lodash.sum)(_this.leftLinks.map(function (l) {
            return l.strokeWidth;
          }));
          var startPos = _this.y - (totalLeft + (_this.leftLinks.length - 1) * 2) / 2;
          _this.leftLinks.concat().sort(function (a, b) {
            return a.source.y - b.source.y;
          }).forEach(function (link) {
            link.attachPoints.y2 = startPos + link.strokeWidth / 2;
            startPos += link.strokeWidth + 2;
          });
        })();
      }

      if (this.rightLinks.length === 1) {
        this.rightLinks[0].attachPoints.y1 = this.y;
      } else if (this.rightLinks.length > 1) {
        (function () {
          var totalRight = (0, _lodash.sum)(_this.rightLinks.map(function (l) {
            return l.strokeWidth;
          }));
          var startPos = _this.y - (totalRight + (_this.rightLinks.length - 1) * 2) / 2;
          _this.rightLinks.concat().sort(function (a, b) {
            return a.target.y - b.target.y;
          }).forEach(function (link) {
            link.attachPoints.y1 = startPos + link.strokeWidth / 2;
            startPos += link.strokeWidth + 2;
          });
        })();
      }
    }
  }, {
    key: 'canMerge',
    value: function canMerge(node) {
      return this.data.entity === node.data.entity;
    }
  }], [{
    key: 'merge',
    value: function merge(nodes) {
      return new Node({
        id: (0, _lodash.min)(nodes.map(function (n) {
          return n.data.id;
        })),
        entity: nodes[0].data.entity,
        freq: (0, _lodash.sum)(nodes.map(function (n) {
          return n.data.freq;
        })),
        mergedData: nodes.map(function (n) {
          return n.data;
        }),
        topEntries: nodes.reduce(function (acc, curr) {
          return acc.concat(curr.data.topEntries);
        }, []).slice(0, 5)
      });
    }
  }]);

  return Node;
}();

exports.default = Node;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _heap = __webpack_require__(6);

var _heap2 = _interopRequireDefault(_heap);

var _RawGraph = __webpack_require__(10);

var _RawGraph2 = _interopRequireDefault(_RawGraph);

var _WordFilter = __webpack_require__(1);

var _WordFilter2 = _interopRequireDefault(_WordFilter);

var _tokenizer = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_NODE_COUNT = 150;

function growSeq(seq, terms, minSupport, maxSupport, itemset) {
  /* find the next frequent sequence by inserting a new word to current sequence */
  var pos = -1;
  var word = null;
  var count = 0;
  var len = seq.words.length;

  var _loop = function _loop(s) {
    var fdist = {};
    seq.DBs.forEach(function (t) {
      var l = s === 0 ? 0 : t.seqIndices[s - 1] + 1;
      var r = s === len ? t.tokens.length : t.seqIndices[s];
      var duplicate = {};
      for (var _i = l; _i < r; _i++) {
        var w = t.tokens[_i];

        if (duplicate[w]) continue;
        duplicate[w] = true;

        if (w in fdist) {
          fdist[w] += t.count;
        } else {
          fdist[w] = t.count;
        }
      }
    });

    var maxw = null;
    var maxc = 0;

    var isNotRoot = len > 0;
    var words = isNotRoot ? Object.keys(fdist) : Object.keys(fdist).filter(function (w) {
      return !itemset[w].startsWith('#');
    });

    words.forEach(function (w) {
      var value = fdist[w];
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
  };

  for (var s = 0; s <= len; s++) {
    _loop(s);
  }

  var s0 = null;
  var s1 = null;

  /* split the current group in two */
  if (count >= minSupport) {
    s0 = { size: 0, DBs: [] };
    s1 = { size: 0, DBs: [] };
    var words = seq.words;
    for (var ti = 0; ti < seq.DBs.length; ti++) {
      var t = seq.DBs[ti];
      var l = pos === 0 ? 0 : t.seqIndices[pos - 1] + 1;
      var r = pos === words.length ? t.tokens.length : t.seqIndices[pos];
      var i = t.tokens.slice(l, r).indexOf(word);
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

  return { word: word, pos: pos, count: count, s0: s0, s1: s1 };
}

function expandSeqTree(rootSeq, graphs, expandCnt, minSupport, maxSupport, terms, itemset) {
  if (rootSeq.words && rootSeq.words.length > 0) {
    rootSeq.graph.nodes = rootSeq.graph.nodes.concat(rootSeq.words);
    expandCnt -= rootSeq.words.length;
  }

  /* Create a max heap */
  var seqs = new _heap2.default(function (a, b) {
    return b.size - a.size;
  });
  seqs.push(rootSeq);
  var leafSeqs = [];

  while (!seqs.empty() && expandCnt > 0) {
    /* find the candidate sequence with largest support DB */
    var s = seqs.pop();
    var graph = s.graph;
    var s0 = s.r;
    var s1 = s.l;

    if (!s0 && !s1) {
      /* find the next frequent sequence */
      var result = growSeq(s, terms, minSupport, maxSupport, itemset);
      s0 = result.s0;
      s1 = result.s1;
      var word = result.word,
          pos = result.pos,
          count = result.count;


      if (count < minSupport) {
        leafSeqs.push(s);
      } else {
        /* create new sequences and add new word */
        if (!graph) {
          graph = new _RawGraph2.default(minSupport, maxSupport);
          graphs.push(graph);
        }
        var newWord = {
          id: graph.totalNodeCnt++,
          entity: itemset[word],
          freq: count,
          topEntries: s1.DBs.slice(0, 5),
          seq: s1
        };
        var newWords = s.words.slice();
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
  leafSeqs.filter(function (seq) {
    return graphs.indexOf(seq.graph) >= 0;
  }).forEach(function (seq) {
    var words = seq.words;
    var linkadj = seq.graph.linkadj;
    // printSeq(seq);
    for (var i = 0; i < words.length - 1; i++) {
      var word = words[i];
      var id = word.id;
      var nextId = words[i + 1].id;

      if (!(id in linkadj)) linkadj[id] = {};

      if (nextId in linkadj[id]) {
        linkadj[id][nextId] += seq.size;
      } else {
        linkadj[id][nextId] = seq.size;
      }
    }

    words.filter(function (word) {
      return !word.leafSeq || word.leafSeq < seq.size;
    }).forEach(function (word) {
      word.leafSeq = seq;
    });
  });
}

function printSeq(words) {
  var str = words.map(function (w) {
    return w.entity;
  }).join(' ');
  console.log(str);
}

var SentenTreeModel = function () {
  function SentenTreeModel(inputEntries) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$wordFilter = _ref.wordFilter,
        wordFilter = _ref$wordFilter === undefined ? _WordFilter2.default.getDefault() : _ref$wordFilter,
        _ref$termWeights = _ref.termWeights,
        termWeights = _ref$termWeights === undefined ? {} : _ref$termWeights;

    _classCallCheck(this, SentenTreeModel);

    var dataset = (0, _tokenizer.tokenize)(inputEntries).filter(wordFilter);
    var terms = dataset.encodeTermWeights(termWeights);

    // Revised from initGraphs
    var entries = dataset.entries;
    var dbsize = dataset.computeSize();
    entries.forEach(function (t) {
      t.seqIndices = [];
      t.tokens.forEach(function (i) {
        return +i;
      });
    });

    this.tokenizedData = dataset;
    this.terms = terms;

    this.supportRange = [Math.max(dbsize * 0.001, 2), dbsize / 3];

    var _supportRange = _slicedToArray(this.supportRange, 2),
        minSupport = _supportRange[0],
        maxSupport = _supportRange[1];

    this.rootSeq = {
      words: [],
      newWord: null,
      graph: null,
      size: dbsize,
      DBs: entries
    };

    var graphs = [];
    var visibleGroups = expandSeqTree(this.rootSeq, graphs, DEFAULT_NODE_COUNT, minSupport, maxSupport, this.terms, dataset.itemset);

    this.graphs = graphs.filter(function (g) {
      return g.nodes.length > 2;
    }).slice(0, 10);

    updateNodesEdges(this.graphs, visibleGroups);
  }

  _createClass(SentenTreeModel, [{
    key: 'updateGraphs',
    value: function updateGraphs(newRootSeq) {
      this.graphs.forEach(function (g) {
        return g.clear();
      });
      var rootSeq = newRootSeq || this.rootSeq;

      var _supportRange2 = _slicedToArray(this.supportRange, 2),
          minSupport = _supportRange2[0],
          maxSupport = _supportRange2[1];

      var visibleGroups = expandSeqTree(rootSeq, this.graphs, DEFAULT_NODE_COUNT, minSupport, maxSupport, this.terms, this.tokenizedData.itemset);

      updateNodesEdges(this.graphs, visibleGroups);
      return this;
    }
  }, {
    key: 'size',
    value: function size() {
      return this.rootSeq.size;
    }
  }, {
    key: 'getRenderedGraphs',
    value: function getRenderedGraphs(limit) {
      var graphs = arguments.length === 1 ? this.graphs.slice(0, limit) : this.graphs;
      var renderedGraphs = graphs.map(function (g) {
        return g.toRenderedGraph();
      });
      var globalFreqRange = [(0, _lodash.min)(renderedGraphs.map(function (g) {
        return g.freqRange[0];
      })), (0, _lodash.max)(renderedGraphs.map(function (g) {
        return g.freqRange[1];
      }))];
      var idPool = 0;
      renderedGraphs.forEach(function (g) {
        g.globalFreqRange = globalFreqRange;
        g.nodes.forEach(function (n) {
          n.gid = idPool;
          idPool++;
        });
      });
      return renderedGraphs;
    }
  }]);

  return SentenTreeModel;
}();

exports.default = SentenTreeModel;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _d = __webpack_require__(5);

var d3 = _interopRequireWildcard(_d);

var _d3kit = __webpack_require__(15);

var _Layout = __webpack_require__(13);

var _Layout2 = _interopRequireDefault(_Layout);

var _shapeUtil = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SentenTreeVis = function (_SvgChart) {
  _inherits(SentenTreeVis, _SvgChart);

  _createClass(SentenTreeVis, null, [{
    key: 'getDefaultOptions',
    value: function getDefaultOptions() {
      return _d3kit.helper.deepExtend(_get(SentenTreeVis.__proto__ || Object.getPrototypeOf(SentenTreeVis), 'getDefaultOptions', this).call(this), {
        initialWidth: 800,
        initialHeight: 200,
        margin: { left: 0, top: 0, bottom: 0, right: 0 },
        fontSize: [10, 32],
        gapBetweenGraph: 10
      });
    }
  }, {
    key: 'getCustomEventNames',
    value: function getCustomEventNames() {
      return ['layoutStart', 'layoutTick', 'layoutEnd', 'nodeMouseenter', 'nodeMouseleave', 'nodeMousemove', 'nodeClick', 'linkMouseenter', 'linkMouseleave', 'linkMousemove', 'linkClick'];
    }
  }]);

  function SentenTreeVis(element, options) {
    _classCallCheck(this, SentenTreeVis);

    var _this = _possibleConstructorReturn(this, (SentenTreeVis.__proto__ || Object.getPrototypeOf(SentenTreeVis)).call(this, element, options));

    _this.layers.create(['link', 'node']);

    _this.fontSizeScale = d3.scaleSqrt().clamp(true);
    _this.strokeSizeScale = d3.scaleSqrt().domain([1, 100]).range([1, 6]).clamp(true);

    _this.layouts = [];

    _this.updatePosition = _this.updatePosition.bind(_this);
    _this.visualize = _this.visualize.bind(_this);
    _this.on('data', _this.visualize);
    _this.on('options', _this.visualize);
    // this.on('resize', this.visualize);
    return _this;
  }

  _createClass(SentenTreeVis, [{
    key: 'fontSize',
    value: function fontSize(node) {
      return Math.round(this.fontSizeScale(node.data.freq)) + 'px';
    }
  }, {
    key: 'renderNodes',
    value: function renderNodes(graphs) {
      var _this2 = this;

      var sUpdate = this.layers.get('node').selectAll('g.graph').data(graphs);

      sUpdate.exit().remove();

      var sEnter = sUpdate.enter().append('g').classed('graph', true);

      this.sNodeGraphs = sUpdate.merge(sEnter).attr('transform', 'translate(' + this.getInnerWidth() / 2 + ',' + this.getInnerHeight() / 2 + ')');

      var sUpdateNode = sEnter.selectAll('g').data(function (d) {
        return d.nodes;
      }, function (n) {
        return n.id;
      });

      sUpdateNode.exit().remove();

      sUpdateNode.enter().append('g').classed('node', true).append('text').attr('dy', '.28em').text(function (d) {
        return d.data.entity;
      }).style('cursor', 'pointer').on('click.event', this.dispatchAs('nodeClick')).on('mouseenter.event', this.dispatchAs('nodeMouseenter')).on('mousemove.event', this.dispatchAs('nodeMousemove')).on('mouseleave.event', this.dispatchAs('nodeMouseleave'));

      this.sNodes = this.layers.get('node').selectAll('g.node');

      this.sNodes.select('text').style('font-size', function (d) {
        return _this2.fontSize(d);
      }).style('text-anchor', 'middle');
    }
  }, {
    key: 'renderLinks',
    value: function renderLinks(graphs) {
      var _this3 = this;

      var sUpdate = this.layers.get('link').selectAll('g.graph').data(graphs);

      sUpdate.exit().remove();

      var sEnter = sUpdate.enter().append('g').classed('graph', true);

      this.sLinkGraphs = sUpdate.merge(sEnter).attr('transform', 'translate(' + this.getInnerWidth() / 2 + ',' + this.getInnerHeight() / 2 + ')');

      var sUpdateLink = sEnter.selectAll('path.link').data(function (d) {
        return d.links;
      }, function (l) {
        return l.getKey();
      });

      sUpdateLink.exit().remove();

      sUpdateLink.enter().append('path').classed('link', true).on('click.event', this.dispatchAs('linkClick')).on('mouseenter.event', this.dispatchAs('linkMouseenter')).on('mousemove.event', this.dispatchAs('linkMousemove')).on('mouseleave.event', this.dispatchAs('linkMouseleave')).style('vector-effect', 'non-scaling-stroke').style('opacity', 0.5).style('stroke', '#222').style('fill', 'none');

      graphs.forEach(function (graph) {
        graph.links.forEach(function (link) {
          link.strokeWidth = Math.round(_this3.strokeSizeScale(link.freq / graph.minSupport));
        });
      });

      this.sLinks = this.layers.get('link').selectAll('path.link').style('stroke-width', function (d) {
        return d.strokeWidth + 'px';
      }).style('stroke', function (l) {
        return l.isTheOnlyBridge() ? '#777' : '#FF9800';
      });
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var yPos = 0;
      var maxw = 0;

      var _options = this.options(),
          margin = _options.margin,
          gapBetweenGraph = _options.gapBetweenGraph;

      var top = margin.top,
          left = margin.left,
          bottom = margin.bottom,
          right = margin.right;

      // Get bbox of <g> for each graph to compute total dimension
      // and stack each graph on top of each other

      this.sNodeGraphs.each(function fn(graph) {
        var bbox = this.getBBox();
        var w = bbox.width;
        var h = bbox.height;
        maxw = Math.max(w, maxw);
        graph.x = -bbox.x;
        graph.y = -bbox.y + yPos;
        yPos += h + gapBetweenGraph;
      });

      this.sNodeGraphs.attr('transform', function (graph) {
        return 'translate(' + graph.x + ',' + graph.y + ')';
      });

      this.sLinkGraphs.attr('transform', function (graph) {
        return 'translate(' + graph.x + ',' + graph.y + ')';
      });

      // Update component size to fit all content
      this.dimension([maxw + left + right, Math.max(0, yPos - gapBetweenGraph) + top + bottom]);

      this.placeNodes();
      this.placeLinks();
    }
  }, {
    key: 'placeNodes',
    value: function placeNodes() {
      this.sNodes.attr('transform', function (d) {
        return 'translate(' + d.x + ', ' + d.y + ')';
      });
    }
  }, {
    key: 'placeLinks',
    value: function placeLinks() {
      // draw directed edges with proper padding from node centers
      var graphs = this.data();

      graphs.forEach(function (graph) {
        graph.nodes.forEach(function (node) {
          node.updateAttachPoints();
        });
      });

      this.sLinks.attr('d', function (link) {
        var points = [link.source.rightEdge(), link.attachPoints.y1, link.target.leftEdge(), link.attachPoints.y2];
        // const xGap = link.target.leftEdge() - link.source.rightEdge();
        // if (xGap > 30) {
        //   return line(...points);
        // }
        return _shapeUtil.diagonal.apply(undefined, points);
      });
    }
  }, {
    key: 'visualize',
    value: function visualize() {
      if (!this.hasData()) return;

      var graphs = this.data();

      if (graphs.length > 0) {
        var _options2 = this.options(),
            fontSize = _options2.fontSize;

        this.fontSizeScale.domain(graphs[0].globalFreqRange).range(fontSize);
      }

      this.renderNodes(graphs);
      this.renderLinks(graphs);

      // Update node position for layout computation
      this.sNodes.each(function fn(node) {
        var bbox = this.getBBox();
        node.width = bbox.width + 4;
        node.height = bbox.height + 4;
      });

      // Update layout pool
      var len = Math.max(graphs.length, this.layouts.length);
      for (var i = 0; i < len; i++) {
        if (i >= this.layouts.length) {
          this.layouts.push(new _Layout2.default().on('tick', this.updatePosition));
        }
        if (i >= graphs.length) {
          this.layouts[i].stop().destroy();
          continue;
        }
        this.layouts[i].stop().setGraph(graphs[i]).start();
      }
      this.layouts = this.layouts.slice(0, graphs.length);

      this.updatePosition();

      // const colaAdaptor = this.colaAdaptor;

      // this.sNodes.call(colaAdaptor.drag);
      // this.sLinks.call(colaAdaptor.drag);

      // this.colaAdaptor.on('tick', event => {
      //   this.placeNodes();
      //   this.placeLinks();
      // });
    }
  }]);

  return SentenTreeVis;
}(_d3kit.SvgChart);

exports.default = SentenTreeVis;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _heap = __webpack_require__(6);

var _heap2 = _interopRequireDefault(_heap);

var _Link = __webpack_require__(3);

var _Link2 = _interopRequireDefault(_Link);

var _Node = __webpack_require__(4);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphBundler = function () {
  function GraphBundler(nodes, links) {
    _classCallCheck(this, GraphBundler);

    this.nodes = nodes;
    this.links = links;
    this.linkLookup = (0, _lodash.keyBy)(this.links, function (l) {
      return l.getKey();
    });
  }

  _createClass(GraphBundler, [{
    key: 'addLinks',
    value: function addLinks(links) {
      var _this = this;

      this.links = this.links.concat(links);
      links.forEach(function (link) {
        _this.linkLookup[link.getKey()] = link;
      });
    }
  }, {
    key: 'bundle',
    value: function bundle() {
      var _this2 = this;

      var heap = new _heap2.default(function (a, b) {
        return a.data.id - b.data.id;
      });

      // Add candidate parents to heap
      this.nodes.filter(function (n) {
        return _this2.hasPotential(n);
      }).forEach(function (n) {
        heap.push(n);
      });

      while (heap.size() > 0) {
        var parent = heap.pop();
        if (parent.merged) {
          continue;
        }

        var groups = [];
        if (parent.leftLinks.length > 1) {
          var lNodes = parent.leftLinks.map(function (l) {
            return l.source;
          });
          groups = groups.concat(this.groupMergeableNodes(lNodes));
        }

        if (parent.rightLinks.length > 1) {
          var rNodes = parent.rightLinks.map(function (l) {
            return l.target;
          });
          groups = groups.concat(this.groupMergeableNodes(rNodes));
        }

        if (groups.length > 0) {
          var newNodes = groups.map(function (group) {
            return _this2.mergeNodes(group);
          });
          newNodes.filter(function (n) {
            return _this2.hasPotential(n);
          }).forEach(function (n) {
            heap.push(n);
          });
        }
      }

      return {
        nodes: this.nodes.filter(function (n) {
          return !n.merged;
        }),
        links: this.links.filter(function (l) {
          return !l.source.merged && !l.target.merged;
        })
      };
    }
  }, {
    key: 'groupMergeableNodes',
    value: function groupMergeableNodes(nodes) {
      var linkLookup = this.linkLookup;
      return (0, _lodash.chain)(nodes).groupBy(function (n) {
        return n.data.entity;
      }).values().filter(function (g) {
        return g.length > 1;
      }).flatMap(function (g) {
        var subgroups = [[g[0]]];

        var _loop = function _loop(i) {
          var node = g[i];
          for (var j = 0; j < subgroups.length; j++) {
            var subgroup = subgroups[j];
            if (subgroup.every(function (n) {
              return !linkLookup[[n.id, node.id].join(',')] && !linkLookup[[n.id, node.id].join(',')];
            })) {
              subgroup.push(node);
              continue;
            }
            subgroups.push([node]);
          }
        };

        for (var i = 1; i < g.length; i++) {
          _loop(i);
        }
        return subgroups.filter(function (subgroup) {
          return subgroup.length > 1;
        });
      }).value();
    }
  }, {
    key: 'hasPotential',
    value: function hasPotential(node) {
      return node.rightLinks.length > 1 || node.leftLinks.length > 1;
    }
  }, {
    key: 'mergeNodes',
    value: function mergeNodes(nodes) {
      var newNode = _Node2.default.merge(nodes);
      newNode.id = this.nodes.length;
      this.nodes.push(newNode);
      nodes.forEach(function (n) {
        n.merged = true;
      });

      newNode.rightLinks = (0, _lodash.chain)(nodes).flatMap(function (n) {
        return n.rightLinks;
      }).groupBy(function (l) {
        return l.target.id;
      }).mapValues(function (links) {
        var target = links[0].target;
        target.leftLinks = target.leftLinks.filter(function (l) {
          return !l.source.merged;
        });
        var link = new _Link2.default(newNode, links[0].target, (0, _lodash.sum)(links.map(function (l) {
          return l.freq;
        })));
        target.leftLinks.push(link);
        return link;
      }).values().value();

      this.addLinks(newNode.rightLinks);

      newNode.leftLinks = (0, _lodash.chain)(nodes).flatMap(function (n) {
        return n.leftLinks;
      }).groupBy(function (l) {
        return l.source.id;
      }).mapValues(function (links) {
        var source = links[0].source;
        source.rightLinks = source.rightLinks.filter(function (l) {
          return !l.target.merged;
        });
        var link = new _Link2.default(links[0].source, newNode, (0, _lodash.sum)(links.map(function (l) {
          return l.freq;
        })));
        source.rightLinks.push(link);
        return link;
      }).values().value();

      this.addLinks(newNode.leftLinks);

      return newNode;
    }
  }]);

  return GraphBundler;
}();

exports.default = GraphBundler;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RenderedGraph = __webpack_require__(11);

var _RenderedGraph2 = _interopRequireDefault(_RenderedGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RawGraph = function () {
  function RawGraph(minSupport, maxSupport) {
    _classCallCheck(this, RawGraph);

    this.nodes = [];
    this.linkadj = [];
    this.minSupport = minSupport;
    this.maxSupport = maxSupport;
    this.totalNodeCnt = 0;
  }

  _createClass(RawGraph, [{
    key: 'clear',
    value: function clear() {
      this.nodes = [];
      this.linkadj = [];
      return this;
    }
  }, {
    key: 'toRenderedGraph',
    value: function toRenderedGraph() {
      return new _RenderedGraph2.default(this);
    }
  }]);

  return RawGraph;
}();

exports.default = RawGraph;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

var _GraphBundler = __webpack_require__(9);

var _GraphBundler2 = _interopRequireDefault(_GraphBundler);

var _Link = __webpack_require__(3);

var _Link2 = _interopRequireDefault(_Link);

var _Node = __webpack_require__(4);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderedGraph = function () {
  function RenderedGraph(rawGraph) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$bundle = _ref.bundle,
        bundle = _ref$bundle === undefined ? true : _ref$bundle,
        _ref$highFrequencyOnT = _ref.highFrequencyOnTop,
        highFrequencyOnTop = _ref$highFrequencyOnT === undefined ? true : _ref$highFrequencyOnT;

    _classCallCheck(this, RenderedGraph);

    this.options = { bundle: bundle, highFrequencyOnTop: highFrequencyOnTop };

    this.minSupport = rawGraph.minSupport;
    this.maxSupport = rawGraph.maxSupport;

    var nodes = rawGraph.nodes.map(function (n) {
      return new _Node2.default(n);
    });
    var links = [];

    Object.keys(rawGraph.linkadj).forEach(function (l) {
      var leftNode = nodes[l];
      var rights = rawGraph.linkadj[l];
      Object.keys(rights).forEach(function (r) {
        var rightNode = nodes[r];
        var link = new _Link2.default(leftNode, rightNode, rights[r]);
        links.push(link);
        leftNode.rightLinks.push(link);
        rightNode.leftLinks.push(link);
      });
    });

    this.assignNodeIds(nodes);

    if (bundle) {
      var bundled = new _GraphBundler2.default(nodes, links).bundle();
      this.nodes = bundled.nodes;
      this.links = bundled.links;
      this.assignNodeIds(this.nodes);
    } else {
      this.nodes = nodes;
      this.links = links;
    }

    if (highFrequencyOnTop) {
      this.nodes.forEach(function (n) {
        n.rightLinks.sort(function (a, b) {
          return b.freq - a.freq;
        });
        n.leftLinks.sort(function (a, b) {
          return b.freq - a.freq;
        });
      });
    }

    var frequencies = this.nodes.map(function (n) {
      return n.data.freq;
    });
    this.freqRange = [(0, _lodash.min)(frequencies), (0, _lodash.max)(frequencies)];
    this.globalFreqRange = this.freqRange;

    var onlyBridgeConstraints = this.links.filter(function (link) {
      return link.isTheOnlyBridge();
    }).map(function (link) {
      return link.toOnlyBridgeConstraint();
    });

    this.baseConstraints = onlyBridgeConstraints.concat(this.getAlignmentConstraints());
  }

  _createClass(RenderedGraph, [{
    key: 'updateNodeSize',
    value: function updateNodeSize(sizeFn) {
      this.nodes.forEach(function (node) {
        var _sizeFn = sizeFn(node),
            width = _sizeFn.width,
            height = _sizeFn.height;

        node.width = width;
        node.height = height;
      });
      return this;
    }
  }, {
    key: 'assignNodeIds',
    value: function assignNodeIds(nodes) {
      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      nodes.forEach(function (n, i) {
        n.id = i + startIndex;
      });
      return this;
    }
  }, {
    key: 'getAlignmentConstraints',
    value: function getAlignmentConstraints() {
      var alignmentConstraints = [];

      if (this.nodes.length > 0) {
        var visitedNodes = this.nodes.map(function () {
          return false;
        });
        var queue = [this.nodes[0]];
        while (queue.length > 0) {
          var node = queue.shift();
          var nodeIndex = node.id;
          if (visitedNodes[nodeIndex]) continue;
          visitedNodes[nodeIndex] = true;
          var constraints = node.computeRightConstraints();
          if (constraints) {
            alignmentConstraints.push(constraints);
          }
          var rNodes = node.getRightNodes();
          if (rNodes.length > 0) {
            queue = queue.concat(rNodes);
          }
        }

        for (var i = 0; i < this.nodes.length; i++) {
          visitedNodes[i] = false;
        }
        queue = [this.nodes[0]];

        while (queue.length > 0) {
          var _node = queue.shift();
          var _nodeIndex = _node.id;
          if (visitedNodes[_nodeIndex]) continue;
          visitedNodes[_nodeIndex] = true;
          var _constraints = _node.computeLeftConstraints();
          if (_constraints) {
            alignmentConstraints.push(_constraints);
          }
          var lNodes = _node.getLeftNodes();
          if (lNodes.length > 0) {
            queue = queue.concat(lNodes);
          }
        }
      }

      return alignmentConstraints;
    }
  }, {
    key: 'getLinkConstraints',
    value: function getLinkConstraints() {
      return this.links.map(function (l) {
        return l.toConstraint();
      });
    }
  }, {
    key: 'getConstraints',
    value: function getConstraints() {
      var constraints = this.baseConstraints.concat(this.links.map(function (l) {
        return l.toConstraint();
      }));

      return this.options.highFrequencyOnTop ? constraints.concat((0, _lodash.flatMap)(this.nodes, function (n) {
        return n.computeOrderConstraints();
      })) : constraints;
    }
  }, {
    key: 'toGroupConstraint',
    value: function toGroupConstraint() {
      return {
        leaves: this.nodes.map(function (n) {
          return n.id;
        })
      };
    }
  }]);

  return RenderedGraph;
}();

exports.default = RenderedGraph;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenizedDataset = function () {
  function TokenizedDataset() {
    var vocabularies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var itemset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var entries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, TokenizedDataset);

    this.vocabularies = vocabularies;
    this.itemset = itemset;
    this.entries = entries;
  }

  _createClass(TokenizedDataset, [{
    key: 'filter',
    value: function filter(wordFilter) {
      var stopwordLookup = this.itemset.map(function (w) {
        return wordFilter.test(w);
      });
      var newEntries = this.entries.map(function (entry) {
        var tokens = entry.tokens.filter(function (w) {
          return !stopwordLookup[w];
        });
        return tokens.length > 0 ? _extends({}, entry, { tokens: tokens }) : null;
      }).filter(function (x) {
        return x;
      });

      return new TokenizedDataset(this.vocabularies, this.itemset, newEntries);
    }
  }, {
    key: 'encodeTermWeights',
    value: function encodeTermWeights() {
      var _this = this;

      var termWeights = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return Object.keys(termWeights).map(function (key) {
        return key in _this.vocabularies;
      }).reduce(function (acc, key) {
        acc[_this.vocabularies[key]] = termWeights[key];
        return acc;
      }, {});
    }
  }, {
    key: 'computeSize',
    value: function computeSize() {
      return (0, _lodash.sum)(this.entries.map(function (e) {
        return e.count;
      }));
    }
  }]);

  return TokenizedDataset;
}();

exports.default = TokenizedDataset;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(5);

var d3 = _interopRequireWildcard(_d);

var _cola = __webpack_require__(16);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
  function Layout() {
    var _this = this;

    _classCallCheck(this, Layout);

    this.isRunning = false;
    this.simulation = (0, _cola.d3adaptor)(d3).flowLayout('x', 5).avoidOverlaps(true)
    // .symmetricDiffLinkLengths(5)
    .jaccardLinkLengths(10).linkDistance(5);

    this.dispatcher = d3.dispatch('start', 'tick', 'end');

    this.simulation.on('start.default', function () {
      _this.isRunning = true;
      _this.dispatcher.call('start', _this);
    });

    this.simulation.on('tick.default', function () {
      _this.dispatcher.call('tick', _this);
    });

    this.simulation.on('end.default', function () {
      if (_this.isRunning) {
        _this.isRunning = false;
        _this.dispatcher.call('end', _this);
      }
    });
  }

  _createClass(Layout, [{
    key: 'on',
    value: function on() {
      var _dispatcher;

      (_dispatcher = this.dispatcher).on.apply(_dispatcher, arguments);
      return this;
    }
  }, {
    key: 'setGraph',
    value: function setGraph(graph) {
      this.simulation.nodes(graph.nodes).links(graph.links).constraints(graph.getConstraints());

      return this;
    }
  }, {
    key: 'start',
    value: function start() {
      this.simulation.start(10, 10, 10);
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.simulation.stop();
      return this;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.dispatcher.on('start', null);
      this.dispatcher.on('tick', null);
      this.dispatcher.on('end', null);
      this.simulation.on('start', null);
      this.simulation.on('tick', null);
      this.simulation.on('end', null);
      return this;
    }
  }]);

  return Layout;
}();

exports.default = Layout;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diagonal = diagonal;
exports.line = line;
function diagonal(x1, y1, x2, y2) {
  return 'M' + x1 + ',' + y1 + 'C' + (x1 + x2) / 2 + ',' + y1 + ' ' + (x1 + x2) / 2 + ',' + y2 + ' ' + x2 + ',' + y2;
}

function line(x1, y1, x2, y2) {
  return 'M ' + x1 + ',' + y1 + ' L ' + x2 + ',' + y2;
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SentenTreeVis = exports.WordFilter = exports.SentenTreeModel = exports.Tokenizer = undefined;

var _SentenTreeModel = __webpack_require__(7);

Object.defineProperty(exports, 'SentenTreeModel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SentenTreeModel).default;
  }
});

var _WordFilter = __webpack_require__(1);

Object.defineProperty(exports, 'WordFilter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WordFilter).default;
  }
});

var _SentenTreeVis = __webpack_require__(8);

Object.defineProperty(exports, 'SentenTreeVis', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SentenTreeVis).default;
  }
});

var _tokenizer = __webpack_require__(2);

var Tokenizer = _interopRequireWildcard(_tokenizer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tokenizer = Tokenizer;

/***/ })
/******/ ]);
});