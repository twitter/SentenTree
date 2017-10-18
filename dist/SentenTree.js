(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("d3"), require("heap"), require("d3kit"), require("webcola/WebCola/cola.js"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "d3", "heap", "d3kit", "webcola/WebCola/cola.js"], factory);
	else if(typeof exports === 'object')
		exports["SentenTree"] = factory(require("lodash"), require("d3"), require("heap"), require("d3kit"), require("webcola/WebCola/cola.js"));
	else
		root["SentenTree"] = factory(root["_"], root["d3"], root["Heap"], root["d3Kit"], root["cola"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_43__, __WEBPACK_EXTERNAL_MODULE_44__, __WEBPACK_EXTERNAL_MODULE_135__, __WEBPACK_EXTERNAL_MODULE_136__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 137);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectAll__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enter__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exit__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__merge__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__order__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sort__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__call__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nodes__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__size__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__empty__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__each__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__attr__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__style__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__property__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__classed__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__text__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__html__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__raise__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lower__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__append__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__insert__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__remove__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__datum__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__on__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__dispatch__ = __webpack_require__(89);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return root; });
/* harmony export (immutable) */ __webpack_exports__["b"] = Selection;






























var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: __WEBPACK_IMPORTED_MODULE_0__select__["a" /* default */],
  selectAll: __WEBPACK_IMPORTED_MODULE_1__selectAll__["a" /* default */],
  filter: __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* default */],
  data: __WEBPACK_IMPORTED_MODULE_3__data__["a" /* default */],
  enter: __WEBPACK_IMPORTED_MODULE_4__enter__["a" /* default */],
  exit: __WEBPACK_IMPORTED_MODULE_5__exit__["a" /* default */],
  merge: __WEBPACK_IMPORTED_MODULE_6__merge__["a" /* default */],
  order: __WEBPACK_IMPORTED_MODULE_7__order__["a" /* default */],
  sort: __WEBPACK_IMPORTED_MODULE_8__sort__["a" /* default */],
  call: __WEBPACK_IMPORTED_MODULE_9__call__["a" /* default */],
  nodes: __WEBPACK_IMPORTED_MODULE_10__nodes__["a" /* default */],
  node: __WEBPACK_IMPORTED_MODULE_11__node__["a" /* default */],
  size: __WEBPACK_IMPORTED_MODULE_12__size__["a" /* default */],
  empty: __WEBPACK_IMPORTED_MODULE_13__empty__["a" /* default */],
  each: __WEBPACK_IMPORTED_MODULE_14__each__["a" /* default */],
  attr: __WEBPACK_IMPORTED_MODULE_15__attr__["a" /* default */],
  style: __WEBPACK_IMPORTED_MODULE_16__style__["a" /* default */],
  property: __WEBPACK_IMPORTED_MODULE_17__property__["a" /* default */],
  classed: __WEBPACK_IMPORTED_MODULE_18__classed__["a" /* default */],
  text: __WEBPACK_IMPORTED_MODULE_19__text__["a" /* default */],
  html: __WEBPACK_IMPORTED_MODULE_20__html__["a" /* default */],
  raise: __WEBPACK_IMPORTED_MODULE_21__raise__["a" /* default */],
  lower: __WEBPACK_IMPORTED_MODULE_22__lower__["a" /* default */],
  append: __WEBPACK_IMPORTED_MODULE_23__append__["a" /* default */],
  insert: __WEBPACK_IMPORTED_MODULE_24__insert__["a" /* default */],
  remove: __WEBPACK_IMPORTED_MODULE_25__remove__["a" /* default */],
  datum: __WEBPACK_IMPORTED_MODULE_26__datum__["a" /* default */],
  on: __WEBPACK_IMPORTED_MODULE_27__on__["b" /* default */],
  dispatch: __WEBPACK_IMPORTED_MODULE_28__dispatch__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = selection;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_dispatch__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_timer__ = __webpack_require__(40);
/* unused harmony export CREATED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SCHEDULED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STARTING; });
/* unused harmony export STARTED */
/* unused harmony export RUNNING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ENDED; });
/* harmony export (immutable) */ __webpack_exports__["g"] = init;
/* harmony export (immutable) */ __webpack_exports__["e"] = set;
/* harmony export (immutable) */ __webpack_exports__["f"] = get;



var emptyOn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_dispatch__["a" /* dispatch */])("start", "end", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ __webpack_exports__["h"] = function(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
};

function init(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id]) || schedule.state > CREATED) throw new Error("too late");
  return schedule;
}

function set(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id]) || schedule.state > STARTING) throw new Error("too late");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("too late");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_timer__["a" /* timer */])(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_timer__["b" /* timeout */])(start);

      // Interrupt the active transition, if any.
      // Dispatch the interrupt event.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions. No interrupt event is dispatched
      // because the cancelled transitions never started. Note that this also
      // removes this transition from the pending list!
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_timer__["b" /* timeout */])(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(null, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_creator__ = __webpack_require__(14);
/* unused harmony reexport creator */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_local__ = __webpack_require__(79);
/* unused harmony reexport local */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_matcher__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__src_matcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mouse__ = __webpack_require__(80);
/* unused harmony reexport mouse */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_namespace__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__src_namespace__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_namespaces__ = __webpack_require__(16);
/* unused harmony reexport namespaces */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_select__ = __webpack_require__(81);
/* unused harmony reexport select */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_selectAll__ = __webpack_require__(82);
/* unused harmony reexport selectAll */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_selection_index__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_8__src_selection_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_selector__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_9__src_selector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_selectorAll__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__src_selectorAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_touch__ = __webpack_require__(110);
/* unused harmony reexport touch */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_touches__ = __webpack_require__(111);
/* unused harmony reexport touches */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_window__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_13__src_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_selection_on__ = __webpack_require__(18);
/* unused harmony reexport event */
/* unused harmony reexport customEvent */

















/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__attr__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__attrTween__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__delay__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__duration__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ease__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__filter__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__merge__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__on__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__remove__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__select__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__selectAll__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__selection__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__style__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__styleTween__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__text__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__transition__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__tween__ = __webpack_require__(8);
/* harmony export (immutable) */ __webpack_exports__["b"] = Transition;
/* harmony export (immutable) */ __webpack_exports__["a"] = transition;
/* harmony export (immutable) */ __webpack_exports__["c"] = newId;



















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["a" /* selection */])().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = __WEBPACK_IMPORTED_MODULE_0_d3_selection__["a" /* selection */].prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: __WEBPACK_IMPORTED_MODULE_10__select__["a" /* default */],
  selectAll: __WEBPACK_IMPORTED_MODULE_11__selectAll__["a" /* default */],
  filter: __WEBPACK_IMPORTED_MODULE_6__filter__["a" /* default */],
  merge: __WEBPACK_IMPORTED_MODULE_7__merge__["a" /* default */],
  selection: __WEBPACK_IMPORTED_MODULE_12__selection__["a" /* default */],
  transition: __WEBPACK_IMPORTED_MODULE_16__transition__["a" /* default */],
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: __WEBPACK_IMPORTED_MODULE_8__on__["a" /* default */],
  attr: __WEBPACK_IMPORTED_MODULE_1__attr__["a" /* default */],
  attrTween: __WEBPACK_IMPORTED_MODULE_2__attrTween__["a" /* default */],
  style: __WEBPACK_IMPORTED_MODULE_13__style__["a" /* default */],
  styleTween: __WEBPACK_IMPORTED_MODULE_14__styleTween__["a" /* default */],
  text: __WEBPACK_IMPORTED_MODULE_15__text__["a" /* default */],
  remove: __WEBPACK_IMPORTED_MODULE_9__remove__["a" /* default */],
  tween: __WEBPACK_IMPORTED_MODULE_17__tween__["a" /* default */],
  delay: __WEBPACK_IMPORTED_MODULE_3__delay__["a" /* default */],
  duration: __WEBPACK_IMPORTED_MODULE_4__duration__["a" /* default */],
  ease: __WEBPACK_IMPORTED_MODULE_5__ease__["a" /* default */]
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_color__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_color__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__src_color__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__src_color__["g"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_lab__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__src_lab__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__src_lab__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cubehelix__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubehelix__["a"]; });





/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(31);
/* harmony export (immutable) */ __webpack_exports__["b"] = hue;
/* harmony export (immutable) */ __webpack_exports__["c"] = gamma;
/* harmony export (immutable) */ __webpack_exports__["a"] = nogamma;


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(isNaN(a) ? b : a);
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schedule__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = tweenValue;


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */])(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */])(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["f" /* get */])(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
};

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */])(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["f" /* get */])(node, id).value[name];
  };
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__define__ = __webpack_require__(10);
/* harmony export (immutable) */ __webpack_exports__["d"] = Color;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return brighter; });
/* harmony export (immutable) */ __webpack_exports__["a"] = color;
/* harmony export (immutable) */ __webpack_exports__["c"] = rgbConvert;
/* harmony export (immutable) */ __webpack_exports__["h"] = rgb;
/* harmony export (immutable) */ __webpack_exports__["b"] = Rgb;
/* unused harmony export hslConvert */
/* harmony export (immutable) */ __webpack_exports__["g"] = hsl;


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Rgb, rgb, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Hsl, hsl, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = extend;
/* harmony default export */ __webpack_exports__["a"] = function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
};

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_value__ = __webpack_require__(13);
/* unused harmony reexport interpolate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_array__ = __webpack_require__(29);
/* unused harmony reexport interpolateArray */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_basis__ = __webpack_require__(12);
/* unused harmony reexport interpolateBasis */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_basisClosed__ = __webpack_require__(30);
/* unused harmony reexport interpolateBasisClosed */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_date__ = __webpack_require__(32);
/* unused harmony reexport interpolateDate */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_number__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__src_number__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_object__ = __webpack_require__(33);
/* unused harmony reexport interpolateObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_round__ = __webpack_require__(73);
/* unused harmony reexport interpolateRound */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_string__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_8__src_string__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_transform_index__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__src_transform_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__src_transform_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_zoom__ = __webpack_require__(77);
/* unused harmony reexport interpolateZoom */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_rgb__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_11__src_rgb__["a"]; });
/* unused harmony reexport interpolateRgbBasis */
/* unused harmony reexport interpolateRgbBasisClosed */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_hsl__ = __webpack_require__(70);
/* unused harmony reexport interpolateHsl */
/* unused harmony reexport interpolateHslLong */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_lab__ = __webpack_require__(71);
/* unused harmony reexport interpolateLab */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_hcl__ = __webpack_require__(69);
/* unused harmony reexport interpolateHcl */
/* unused harmony reexport interpolateHclLong */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_cubehelix__ = __webpack_require__(68);
/* unused harmony reexport interpolateCubehelix */
/* unused harmony reexport interpolateCubehelixLong */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_quantize__ = __webpack_require__(72);
/* unused harmony reexport quantize */



















/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = basis;
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ __webpack_exports__["a"] = function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rgb__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__array__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__date__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__number__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__object__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__string__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constant__ = __webpack_require__(31);









/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__constant__["a" /* default */])(b)
      : (t === "number" ? __WEBPACK_IMPORTED_MODULE_4__number__["a" /* default */]
      : t === "string" ? ((c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* color */])(b)) ? (b = c, __WEBPACK_IMPORTED_MODULE_1__rgb__["a" /* default */]) : __WEBPACK_IMPORTED_MODULE_6__string__["a" /* default */])
      : b instanceof __WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* color */] ? __WEBPACK_IMPORTED_MODULE_1__rgb__["a" /* default */]
      : b instanceof Date ? __WEBPACK_IMPORTED_MODULE_3__date__["a" /* default */]
      : Array.isArray(b) ? __WEBPACK_IMPORTED_MODULE_2__array__["a" /* default */]
      : isNaN(b) ? __WEBPACK_IMPORTED_MODULE_5__object__["a" /* default */]
      : __WEBPACK_IMPORTED_MODULE_4__number__["a" /* default */])(a, b);
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__namespaces__ = __webpack_require__(16);



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === __WEBPACK_IMPORTED_MODULE_1__namespaces__["a" /* xhtml */] && document.documentElement.namespaceURI === __WEBPACK_IMPORTED_MODULE_1__namespaces__["a" /* xhtml */]
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespaces__ = __webpack_require__(16);


/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return __WEBPACK_IMPORTED_MODULE_0__namespaces__["b" /* default */].hasOwnProperty(prefix) ? {space: __WEBPACK_IMPORTED_MODULE_0__namespaces__["b" /* default */][prefix], local: name} : name;
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return xhtml; });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ __webpack_exports__["b"] = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return event; });
/* unused harmony export customEvent */
var filterEvents = {};

var event = null;

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ __webpack_exports__["b"] = function(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
};

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function none() {}

/* harmony default export */ __webpack_exports__["a"] = function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_on__ = __webpack_require__(18);


/* harmony default export */ __webpack_exports__["a"] = function() {
  var current = __WEBPACK_IMPORTED_MODULE_0__selection_on__["a" /* event */], source;
  while (source = current.sourceEvent) current = source;
  return current;
};


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
};


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = now;
/* harmony export (immutable) */ __webpack_exports__["b"] = Timer;
/* harmony export (immutable) */ __webpack_exports__["a"] = timer;
/* unused harmony export timerFlush */
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof requestAnimationFrame === "function" ? requestAnimationFrame : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, delay);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clockNow, interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(5);

var _heap = __webpack_require__(44);

var _heap2 = _interopRequireDefault(_heap);

var _RawGraph = __webpack_require__(48);

var _RawGraph2 = _interopRequireDefault(_RawGraph);

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
  function SentenTreeModel(tokenizedData) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SentenTreeModel);

    // extract options
    var _options$termWeights = options.termWeights,
        termWeights = _options$termWeights === undefined ? {} : _options$termWeights,
        _options$minSupportCo = options.minSupportCount,
        minSupportCount = _options$minSupportCo === undefined ? 2 : _options$minSupportCo,
        _options$minSupportRa = options.minSupportRatio,
        minSupportRatio = _options$minSupportRa === undefined ? 0.001 : _options$minSupportRa,
        _options$maxSupportRa = options.maxSupportRatio,
        maxSupportRatio = _options$maxSupportRa === undefined ? 0.75 : _options$maxSupportRa;


    this.options = options;

    var itemset = tokenizedData.itemset,
        entries = tokenizedData.entries;

    this.tokenizedData = tokenizedData;
    this.terms = tokenizedData.encodeTermWeights(termWeights);
    var size = tokenizedData.computeSize();

    this.supportRange = [Math.max(size * minSupportRatio, minSupportCount), size * maxSupportRatio];

    var _supportRange = _slicedToArray(this.supportRange, 2),
        minSupport = _supportRange[0],
        maxSupport = _supportRange[1];

    this.rootSeq = {
      words: [],
      newWord: null,
      graph: null,
      size: size,
      DBs: entries
    };

    var graphs = [];
    var visibleGroups = expandSeqTree(this.rootSeq, graphs, DEFAULT_NODE_COUNT, minSupport, maxSupport, this.terms, itemset);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NLTK_STOP_WORDS = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'nor', 'only', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']; // removed 'own', 'not', 'no' from stopwords

var CUSTOM_STOP_WORDS = ['de', 'la', 'y', 'un', 'que', 'en', 'el', 'shit', 'fuck', 'fucking']; // spanish
var TWEET_STOP_WORDS = ['rt', 'via', 'amp', 'http', 'https', 'm', 're', 'co'];
var DEFAULT_STOP_WORDS = (0, _lodash.uniq)(NLTK_STOP_WORDS.concat(CUSTOM_STOP_WORDS).concat(TWEET_STOP_WORDS));

var WordFilter = function () {
  function WordFilter() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$includeWords = _ref.includeWords,
        includeWords = _ref$includeWords === undefined ? [] : _ref$includeWords,
        _ref$excludeWords = _ref.excludeWords,
        excludeWords = _ref$excludeWords === undefined ? [] : _ref$excludeWords,
        _ref$includeDefault = _ref.includeDefault,
        includeDefault = _ref$includeDefault === undefined ? true : _ref$includeDefault;

    _classCallCheck(this, WordFilter);

    this.stopWords = includeDefault ? DEFAULT_STOP_WORDS : [];
    if (includeWords && includeWords.length > 0) {
      this.stopWords = (0, _lodash.uniq)(this.stopWords.concat(includeWords));
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;
exports.tokenizeBySpace = tokenizeBySpace;
var PATTERN = /http:\/\/t\.co\/\w+|http:\/\/vine\.co\/\w+|http:\/\/t\.co\w+|http:\/\/vine\.co\w+|http:\/\/t\.\w+|http:\/\/vine\.\w+|http:\/\/\w+|\@\w+|\#\w+|\d+(,\d+)+|\w+(-\w+)*|\$?\d+(\.\d+)?\%?|([A-Za-z]\.)+/g;

function tokenize(text) {
  var tokens = [];
  PATTERN.lastIndex = 0;
  var tokenResult = PATTERN.exec(text);
  while (tokenResult != null) {
    tokens.push(tokenResult[0].trim());
    tokenResult = PATTERN.exec(text);
  }
  return tokens;
}

function tokenizeBySpace(text) {
  return text.split(' ').filter(function (x) {
    return x.length > 0;
  });
}

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(5);

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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rad2deg; });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__value__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(nb),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__value__["a" /* default */])(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
};


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__basis__["b" /* basis */])((t - i / n) * n, v0, v1, v2, v3);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(x) {
  return function() {
    return x;
  };
};


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__value__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__value__["a" /* default */])(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basis__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basisClosed__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__color__ = __webpack_require__(6);
/* unused harmony export rgbBasis */
/* unused harmony export rgbBasisClosed */





/* harmony default export */ __webpack_exports__["a"] = (function rgbGamma(y) {
  var color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__color__["c" /* gamma */])(y);

  function rgb(start, end) {
    var r = color((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["f" /* rgb */])(start)).r, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["f" /* rgb */])(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__color__["a" /* default */])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["f" /* rgb */])(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(__WEBPACK_IMPORTED_MODULE_1__basis__["a" /* default */]);
var rgbBasisClosed = rgbSpline(__WEBPACK_IMPORTED_MODULE_2__basisClosed__["a" /* default */]);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(7);


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = matcher;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["b"] = EnterNode;



/* harmony default export */ __webpack_exports__["a"] = function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._enter || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
};

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(update) {
  return new Array(update.length);
};


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function empty() {
  return [];
}

/* harmony default export */ __webpack_exports__["a"] = function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
};


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_timer__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__src_timer__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_timer__["a"]; });
/* unused harmony reexport timerFlush */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_timeout__ = __webpack_require__(113);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__src_timeout__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_interval__ = __webpack_require__(112);
/* unused harmony reexport interval */







/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transition_schedule__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = function(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > __WEBPACK_IMPORTED_MODULE_0__transition_schedule__["a" /* STARTING */] && schedule.state < __WEBPACK_IMPORTED_MODULE_0__transition_schedule__["b" /* ENDING */];
    schedule.state = __WEBPACK_IMPORTED_MODULE_0__transition_schedule__["c" /* ENDED */];
    schedule.timer.stop();
    if (active) schedule.on.call("interrupt", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
};


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__ = __webpack_require__(11);



/* harmony default export */ __webpack_exports__["a"] = function(a, b) {
  var c;
  return (typeof b === "number" ? __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["b" /* interpolateNumber */]
      : b instanceof __WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* color */] ? __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["c" /* interpolateRgb */]
      : (c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* color */])(b)) ? (b = c, __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["c" /* interpolateRgb */])
      : __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["d" /* interpolateString */])(a, b);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_43__;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SentenTreeModel = __webpack_require__(23);

var _SentenTreeModel2 = _interopRequireDefault(_SentenTreeModel);

var _TokenizedDataset = __webpack_require__(50);

var _TokenizedDataset2 = _interopRequireDefault(_TokenizedDataset);

var _WordFilter = __webpack_require__(24);

var _WordFilter2 = _interopRequireDefault(_WordFilter);

var _tokenize = __webpack_require__(25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var identity = function identity(x) {
  return x;
};

var SentenTreeBuilder = function () {
  function SentenTreeBuilder() {
    _classCallCheck(this, SentenTreeBuilder);

    this._tokenize = _tokenize.tokenize;
    this._transformToken = identity;
    var filter = _WordFilter2.default.getDefault();
    this._filterToken = function (token) {
      return !filter.test(token);
    };
  }

  _createClass(SentenTreeBuilder, [{
    key: 'tokenize',
    value: function tokenize() {
      if (arguments.length === 0) return this._tokenize;
      this._tokenize = arguments.length <= 0 ? undefined : arguments[0];
      return this;
    }
  }, {
    key: 'transformToken',
    value: function transformToken() {
      if (arguments.length === 0) return this._transformToken;
      this._transformToken = arguments.length <= 0 ? undefined : arguments[0];
      return this;
    }
  }, {
    key: 'filterToken',
    value: function filterToken() {
      if (arguments.length === 0) return this._filterToken;
      this._filterToken = arguments.length <= 0 ? undefined : arguments[0];
      return this;
    }
  }, {
    key: 'buildTokenizedDataset',
    value: function buildTokenizedDataset(entries) {
      var _this = this;

      var tokenizedEntries = entries.map(function (entry) {
        return {
          id: entry.id,
          count: entry.count || 1,
          tokens: _this._tokenize(entry.text).map(_this._transformToken).filter(_this._filterToken),
          rawText: entry.text
        };
      }).filter(function (entry) {
        return entry.tokens.length > 0;
      });

      return new _TokenizedDataset2.default(tokenizedEntries);
    }
  }, {
    key: 'buildModel',
    value: function buildModel(entries, options) {
      return new _SentenTreeModel2.default(this.buildTokenizedDataset(entries), options);
    }
  }]);

  return SentenTreeBuilder;
}();

exports.default = SentenTreeBuilder;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

__webpack_require__(114);

var _d = __webpack_require__(43);

var d3 = _interopRequireWildcard(_d);

var _d3kit = __webpack_require__(135);

var _lodash = __webpack_require__(5);

var _Layout = __webpack_require__(51);

var _Layout2 = _interopRequireDefault(_Layout);

var _shapeUtil = __webpack_require__(52);

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

      sUpdateNode.enter().append('g').classed('node', true).on('click.event', this.dispatchAs('nodeClick')).on('mouseenter.event', this.dispatchAs('nodeMouseenter')).on('mousemove.event', this.dispatchAs('nodeMousemove')).on('mouseleave.event', this.dispatchAs('nodeMouseleave')).append('text').attr('dy', '.28em').text(function (d) {
        return d.data.entity;
      }).style('cursor', 'pointer');

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

      this.linkLookup = (0, _lodash.keyBy)((0, _lodash.flatMap)(graphs, function (g) {
        return g.links;
      }), function (l) {
        return [l.source.gid, l.target.gid].join(',');
      });

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
  }, {
    key: 'highlightNeighbors',
    value: function highlightNeighbors(node) {
      var _this4 = this;

      this.sNodes.transition().style('opacity', function (d) {
        return d.gid === node.gid || _this4.linkLookup[[d.gid, node.gid].join(',')] || _this4.linkLookup[[node.gid, d.gid].join(',')] ? 1 : 0.3;
      });

      this.sLinks.transition().style('opacity', function (d) {
        return d.source.gid === node.gid || d.target.gid === node.gid ? 1 : 0.3;
      });
    }
  }, {
    key: 'clearHighlightNeighbors',
    value: function clearHighlightNeighbors() {
      this.sNodes.style('opacity', 1);
      this.sLinks.style('opacity', 1);
    }
  }]);

  return SentenTreeVis;
}(_d3kit.SvgChart);

exports.default = SentenTreeVis;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(5);

var _heap = __webpack_require__(44);

var _heap2 = _interopRequireDefault(_heap);

var _Link = __webpack_require__(26);

var _Link2 = _interopRequireDefault(_Link);

var _Node = __webpack_require__(27);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RenderedGraph = __webpack_require__(49);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(5);

var _GraphBundler = __webpack_require__(47);

var _GraphBundler2 = _interopRequireDefault(_GraphBundler);

var _Link = __webpack_require__(26);

var _Link2 = _interopRequireDefault(_Link);

var _Node = __webpack_require__(27);

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
    this.linkLookup = (0, _lodash.keyBy)(this.links, function (l) {
      return l.getKey();
    });

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenizedDataset = function () {
  function TokenizedDataset() {
    var _this = this;

    var entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, TokenizedDataset);

    this.vocabularies = {};
    this.itemset = [];
    this.entries = entries.map(function (_ref) {
      var id = _ref.id,
          count = _ref.count,
          tokens = _ref.tokens,
          rawText = _ref.rawText;
      return {
        id: id,
        count: count,
        tokens: tokens.map(function (t) {
          return _this.encode(t);
        }),
        rawText: rawText,
        seqIndices: []
      };
    });
  }

  _createClass(TokenizedDataset, [{
    key: 'hasToken',
    value: function hasToken(token) {
      return this.vocabularies.hasOwnProperty(token);
    }
  }, {
    key: 'hasCode',
    value: function hasCode(code) {
      return code >= 0 && code < this.itemset.length;
    }
  }, {
    key: 'getCode',
    value: function getCode(token) {
      return this.vocabularies[token];
    }
  }, {
    key: 'encode',
    value: function encode(token) {
      if (this.vocabularies.hasOwnProperty(token)) {
        return this.vocabularies[token];
      }
      var code = this.itemset.length;
      this.itemset.push(token);
      this.vocabularies[token] = code;
      return code;
    }
  }, {
    key: 'decode',
    value: function decode(code) {
      return this.itemset[code];
    }
  }, {
    key: 'encodeTermWeights',
    value: function encodeTermWeights() {
      var _this2 = this;

      var termWeights = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return Object.keys(termWeights).filter(function (key) {
        return _this2.hasToken(key);
      }).reduce(function (acc, key) {
        acc[_this2.getCode(key)] = termWeights[key];
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(43);

var d3 = _interopRequireWildcard(_d);

var _cola = __webpack_require__(136);

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
/* 52 */
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__define__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(28);
/* harmony export (immutable) */ __webpack_exports__["a"] = cubehelix;
/* unused harmony export Cubehelix */




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof __WEBPACK_IMPORTED_MODULE_1__color__["b" /* Rgb */])) o = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["c" /* rgbConvert */])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * __WEBPACK_IMPORTED_MODULE_2__math__["a" /* rad2deg */] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Cubehelix, cubehelix, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(__WEBPACK_IMPORTED_MODULE_1__color__["d" /* Color */], {
  brighter: function(k) {
    k = k == null ? __WEBPACK_IMPORTED_MODULE_1__color__["e" /* brighter */] : Math.pow(__WEBPACK_IMPORTED_MODULE_1__color__["e" /* brighter */], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? __WEBPACK_IMPORTED_MODULE_1__color__["f" /* darker */] : Math.pow(__WEBPACK_IMPORTED_MODULE_1__color__["f" /* darker */], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * __WEBPACK_IMPORTED_MODULE_2__math__["b" /* deg2rad */],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new __WEBPACK_IMPORTED_MODULE_1__color__["b" /* Rgb */](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__define__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(28);
/* harmony export (immutable) */ __webpack_exports__["b"] = lab;
/* unused harmony export Lab */
/* harmony export (immutable) */ __webpack_exports__["a"] = hcl;
/* unused harmony export Hcl */




var Kn = 18,
    Xn = 0.950470, // D65 standard referent
    Yn = 1,
    Zn = 1.088830,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    var h = o.h * __WEBPACK_IMPORTED_MODULE_2__math__["b" /* deg2rad */];
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof __WEBPACK_IMPORTED_MODULE_1__color__["b" /* Rgb */])) o = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["c" /* rgbConvert */])(o);
  var b = rgb2xyz(o.r),
      a = rgb2xyz(o.g),
      l = rgb2xyz(o.b),
      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Lab, lab, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(__WEBPACK_IMPORTED_MODULE_1__color__["d" /* Color */], {
  brighter: function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new __WEBPACK_IMPORTED_MODULE_1__color__["b" /* Rgb */](
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  var h = Math.atan2(o.b, o.a) * __WEBPACK_IMPORTED_MODULE_2__math__["a" /* rad2deg */];
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Hcl, hcl, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(__WEBPACK_IMPORTED_MODULE_1__color__["d" /* Color */], {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_dispatch__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_dispatch__["a"]; });



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var noop = {value: function() {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ __webpack_exports__["a"] = dispatch;


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_linear__ = __webpack_require__(64);
/* unused harmony reexport easeLinear */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_quad__ = __webpack_require__(66);
/* unused harmony reexport easeQuad */
/* unused harmony reexport easeQuadIn */
/* unused harmony reexport easeQuadOut */
/* unused harmony reexport easeQuadInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cubic__ = __webpack_require__(61);
/* unused harmony reexport easeCubic */
/* unused harmony reexport easeCubicIn */
/* unused harmony reexport easeCubicOut */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_poly__ = __webpack_require__(65);
/* unused harmony reexport easePoly */
/* unused harmony reexport easePolyIn */
/* unused harmony reexport easePolyOut */
/* unused harmony reexport easePolyInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_sin__ = __webpack_require__(67);
/* unused harmony reexport easeSin */
/* unused harmony reexport easeSinIn */
/* unused harmony reexport easeSinOut */
/* unused harmony reexport easeSinInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_exp__ = __webpack_require__(63);
/* unused harmony reexport easeExp */
/* unused harmony reexport easeExpIn */
/* unused harmony reexport easeExpOut */
/* unused harmony reexport easeExpInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_circle__ = __webpack_require__(60);
/* unused harmony reexport easeCircle */
/* unused harmony reexport easeCircleIn */
/* unused harmony reexport easeCircleOut */
/* unused harmony reexport easeCircleInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_bounce__ = __webpack_require__(59);
/* unused harmony reexport easeBounce */
/* unused harmony reexport easeBounceIn */
/* unused harmony reexport easeBounceOut */
/* unused harmony reexport easeBounceInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_back__ = __webpack_require__(58);
/* unused harmony reexport easeBack */
/* unused harmony reexport easeBackIn */
/* unused harmony reexport easeBackOut */
/* unused harmony reexport easeBackInOut */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_elastic__ = __webpack_require__(62);
/* unused harmony reexport easeElastic */
/* unused harmony reexport easeElasticIn */
/* unused harmony reexport easeElasticOut */
/* unused harmony reexport easeElasticInOut */





















/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export backIn */
/* unused harmony export backOut */
/* unused harmony export backInOut */
var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export bounceIn */
/* unused harmony export bounceOut */
/* unused harmony export bounceInOut */
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export circleIn */
/* unused harmony export circleOut */
/* unused harmony export circleInOut */
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export cubicIn */
/* unused harmony export cubicOut */
/* harmony export (immutable) */ __webpack_exports__["a"] = cubicInOut;
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export elasticIn */
/* unused harmony export elasticOut */
/* unused harmony export elasticInOut */
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export expIn */
/* unused harmony export expOut */
/* unused harmony export expInOut */
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export linear */
function linear(t) {
  return +t;
}


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export polyIn */
/* unused harmony export polyOut */
/* unused harmony export polyInOut */
var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export quadIn */
/* unused harmony export quadOut */
/* unused harmony export quadInOut */
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sinIn */
/* unused harmony export sinOut */
/* unused harmony export sinInOut */
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(6);
/* unused harmony export cubehelixLong */



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["b" /* cubehelix */])(start)).h, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["b" /* cubehelix */])(end)).h),
          s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.s, end.s),
          l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.l, end.l),
          opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* unused harmony default export */ var _unused_webpack_default_export = cubehelix(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* hue */]);
var cubehelixLong = cubehelix(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */]);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(6);
/* unused harmony export hclLong */



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["c" /* hcl */])(start)).h, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["c" /* hcl */])(end)).h),
        c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.c, end.c),
        l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.l, end.l),
        opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = hcl(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* hue */]);
var hclLong = hcl(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */]);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(6);
/* unused harmony export hslLong */



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["e" /* hsl */])(start)).h, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["e" /* hsl */])(end)).h),
        s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.s, end.s),
        l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.l, end.l),
        opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* unused harmony default export */ var _unused_webpack_default_export = hsl(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* hue */]);
var hslLong = hsl(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */]);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(6);
/* unused harmony export default */



function lab(start, end) {
  var l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["d" /* lab */])(start)).l, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["d" /* lab */])(end)).l),
      a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.a, end.a),
      b = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.b, end.b),
      opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
};


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
};


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return identity; });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ __webpack_exports__["b"] = function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
};


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parse__ = __webpack_require__(76);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return interpolateTransformCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return interpolateTransformSvg; });



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(xa, xb)}, {i: i - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(xa, xb)}, {i: i - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(__WEBPACK_IMPORTED_MODULE_1__parse__["a" /* parseCss */], "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(__WEBPACK_IMPORTED_MODULE_1__parse__["b" /* parseSvg */], ", ", ")", ")");


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__decompose__ = __webpack_require__(74);
/* harmony export (immutable) */ __webpack_exports__["a"] = parseCss;
/* harmony export (immutable) */ __webpack_exports__["b"] = parseSvg;


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return __WEBPACK_IMPORTED_MODULE_0__decompose__["a" /* identity */];
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__decompose__["b" /* default */])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return __WEBPACK_IMPORTED_MODULE_0__decompose__["a" /* identity */];
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return __WEBPACK_IMPORTED_MODULE_0__decompose__["a" /* identity */];
  value = value.matrix;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__decompose__["b" /* default */])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* unused harmony default export */ var _unused_webpack_default_export = function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    }
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    }
  }

  i.duration = S * 1000;

  return i;
};


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(x) {
  return function() {
    return x;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(17);



/* unused harmony default export */ var _unused_webpack_default_export = function(node) {
  var event = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])();
  if (event.changedTouches) event = event.changedTouches[0];
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, event);
};


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(0);


/* unused harmony default export */ var _unused_webpack_default_export = function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[document.querySelector(selector)]], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[selector]], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
};


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(0);


/* unused harmony default export */ var _unused_webpack_default_export = function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([document.querySelectorAll(selector)], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([selector == null ? [] : selector], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
};


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(14);


/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
};


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(15);


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
};


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
};


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
};


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enter__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(78);




var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
};


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
};


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(21);


function dispatchEvent(node, type, params) {
  var window = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node),
      event = window.CustomEvent;

  if (event) {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
};


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
};


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  return !this.node();
};


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._exit || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
};


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matcher__ = __webpack_require__(36);



/* harmony default export */ __webpack_exports__["a"] = function(match) {
  if (typeof match !== "function") match = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__matcher__["a" /* default */])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
};


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
};


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(19);



function constantNull() {
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = function(name, before) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
};


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.each(lower);
};


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = function(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](merges, this._parents);
};


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
};


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
};


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
};


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
};


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.each(raise);
};


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.each(remove);
};


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(19);



/* harmony default export */ __webpack_exports__["a"] = function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
};


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectorAll__ = __webpack_require__(39);



/* harmony default export */ __webpack_exports__["a"] = function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selectorAll__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, parents);
};


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
};


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](sortgroups, this._parents).order();
};

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(21);


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value, priority) {
  var node;
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node = this.node())
          .getComputedStyle(node, null)
          .getPropertyValue(name);
};


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
};


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(17);



/* unused harmony default export */ var _unused_webpack_default_export = function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touch);
    }
  }

  return null;
};


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(17);



/* unused harmony default export */ var _unused_webpack_default_export = function(node, touches) {
  if (touches == null) touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touches[i]);
  }

  return points;
};


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer__ = __webpack_require__(22);


/* unused harmony default export */ var _unused_webpack_default_export = function(callback, delay, time) {
  var t = new __WEBPACK_IMPORTED_MODULE_0__timer__["b" /* Timer */], total = delay;
  if (delay == null) return t.restart(callback, delay, time), t;
  delay = +delay, time = time == null ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__timer__["c" /* now */])() : +time;
  t.restart(function tick(elapsed) {
    elapsed += total;
    t.restart(tick, total += delay, time);
    callback(elapsed);
  }, delay, time);
  return t;
};


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__timer__ = __webpack_require__(22);


/* harmony default export */ __webpack_exports__["a"] = function(callback, delay, time) {
  var t = new __WEBPACK_IMPORTED_MODULE_0__timer__["b" /* Timer */];
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
};


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_selection_index__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_transition_index__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "transition", function() { return __WEBPACK_IMPORTED_MODULE_1__src_transition_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_active__ = __webpack_require__(115);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "active", function() { return __WEBPACK_IMPORTED_MODULE_2__src_active__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_interrupt__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interrupt", function() { return __WEBPACK_IMPORTED_MODULE_3__src_interrupt__["a"]; });






/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transition_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transition_schedule__ = __webpack_require__(1);



var root = [null];

/* harmony default export */ __webpack_exports__["a"] = function(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > __WEBPACK_IMPORTED_MODULE_1__transition_schedule__["d" /* SCHEDULED */] && schedule.name === name) {
        return new __WEBPACK_IMPORTED_MODULE_0__transition_index__["b" /* Transition */]([[node]], root, name, +i);
      }
    }
  }

  return null;
};


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__interrupt__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transition__ = __webpack_require__(118);




__WEBPACK_IMPORTED_MODULE_0_d3_selection__["a" /* selection */].prototype.interrupt = __WEBPACK_IMPORTED_MODULE_1__interrupt__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0_d3_selection__["a" /* selection */].prototype.transition = __WEBPACK_IMPORTED_MODULE_2__transition__["a" /* default */];


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interrupt__ = __webpack_require__(41);


/* harmony default export */ __webpack_exports__["a"] = function(name) {
  return this.each(function() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interrupt__["a" /* default */])(this, name);
  });
};


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transition_index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transition_schedule__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_ease__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_timer__ = __webpack_require__(40);





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: __WEBPACK_IMPORTED_MODULE_2_d3_ease__["a" /* easeCubicInOut */]
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      return defaultTiming.time = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_timer__["c" /* now */])(), defaultTiming;
    }
  }
  return timing;
}

/* harmony default export */ __webpack_exports__["a"] = function(name) {
  var id,
      timing;

  if (name instanceof __WEBPACK_IMPORTED_MODULE_0__transition_index__["b" /* Transition */]) {
    id = name._id, name = name._name;
  } else {
    id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__transition_index__["c" /* newId */])(), (timing = defaultTiming).time = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3_timer__["c" /* now */])(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__transition_schedule__["h" /* default */])(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__transition_index__["b" /* Transition */](groups, this._parents, name, id);
};


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_interpolate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tween__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interpolate__ = __webpack_require__(42);





function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttribute(name);
    value0 = this.getAttribute(name);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var value0, value1 = value(this);
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    value0 = this.getAttributeNS(fullname.space, fullname.local);
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["c" /* namespace */])(name), i = fullname === "transform" ? __WEBPACK_IMPORTED_MODULE_0_d3_interpolate__["e" /* interpolateTransformSvg */] : __WEBPACK_IMPORTED_MODULE_3__interpolate__["a" /* default */];
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tween__["b" /* tweenValue */])(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
};


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);


function attrTweenNS(fullname, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttributeNS(fullname.space, fullname.local, i(t));
    };
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.setAttribute(name, i(t));
    };
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["c" /* namespace */])(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
};


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schedule__ = __webpack_require__(1);


function delayFunction(id, value) {
  return function() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["g" /* init */])(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["g" /* init */])(this, id).delay = value;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["f" /* get */])(this.node(), id).delay;
};


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schedule__ = __webpack_require__(1);


function durationFunction(id, value) {
  return function() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */])(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */])(this, id).duration = value;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["f" /* get */])(this.node(), id).duration;
};


/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schedule__ = __webpack_require__(1);


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */])(this, id).ease = value;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["f" /* get */])(this.node(), id).ease;
};


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = function(match) {
  if (typeof match !== "function") match = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["d" /* matcher */])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Transition */](subgroups, this._parents, this._name, this._id);
};


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(3);


/* harmony default export */ __webpack_exports__["a"] = function(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Transition */](merges, this._parents, this._name, this._id);
};


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schedule__ = __webpack_require__(1);


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? __WEBPACK_IMPORTED_MODULE_0__schedule__["g" /* init */] : __WEBPACK_IMPORTED_MODULE_0__schedule__["e" /* set */];
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schedule__["f" /* get */])(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
};


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function() {
  return this.on("end.remove", removeFunction(this._id));
};


/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schedule__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = function(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["f" /* selector */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__schedule__["h" /* default */])(subgroup[i], name, id, i, subgroup, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__schedule__["f" /* get */])(node, id));
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Transition */](subgroups, this._parents, name, id);
};


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schedule__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = function(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_selection__["e" /* selectorAll */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__schedule__["f" /* get */])(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__schedule__["h" /* default */])(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Transition */](subgroups, parents, name, id);
};


/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_selection__ = __webpack_require__(2);


var Selection = __WEBPACK_IMPORTED_MODULE_0_d3_selection__["a" /* selection */].prototype.constructor;

/* harmony default export */ __webpack_exports__["a"] = function() {
  return new Selection(this._groups, this._parents);
};


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_interpolate__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_selection__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tween__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interpolate__ = __webpack_require__(42);





function styleRemove(name, interpolate) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["b" /* window */])(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

function styleRemoveEnd(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var value00,
      interpolate0;
  return function() {
    var value0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["b" /* window */])(this).getComputedStyle(this, null).getPropertyValue(name);
    return value0 === value1 ? null
        : value0 === value00 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var value00,
      value10,
      interpolate0;
  return function() {
    var style = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_selection__["b" /* window */])(this).getComputedStyle(this, null),
        value0 = style.getPropertyValue(name),
        value1 = value(this);
    if (value1 == null) value1 = (this.style.removeProperty(name), style.getPropertyValue(name));
    return value0 === value1 ? null
        : value0 === value00 && value1 === value10 ? interpolate0
        : interpolate0 = interpolate(value00 = value0, value10 = value1);
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value, priority) {
  var i = (name += "") === "transform" ? __WEBPACK_IMPORTED_MODULE_0_d3_interpolate__["a" /* interpolateTransformCss */] : __WEBPACK_IMPORTED_MODULE_3__interpolate__["a" /* default */];
  return value == null ? this
          .styleTween(name, styleRemove(name, i))
          .on("end.style." + name, styleRemoveEnd(name))
      : this.styleTween(name, typeof value === "function"
          ? styleFunction(name, i, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tween__["b" /* tweenValue */])(this, "style." + name, value))
          : styleConstant(name, i, value), priority);
};


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function styleTween(name, value, priority) {
  function tween() {
    var node = this, i = value.apply(node, arguments);
    return i && function(t) {
      node.style.setProperty(name, i(t), priority);
    };
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ __webpack_exports__["a"] = function(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
};


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tween__ = __webpack_require__(8);


function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ __webpack_exports__["a"] = function(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tween__["b" /* tweenValue */])(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
};


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__schedule__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = function() {
  var name = this._name,
      id0 = this._id,
      id1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__index__["c" /* newId */])();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__schedule__["f" /* get */])(node, id0);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__schedule__["h" /* default */])(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Transition */](groups, this._parents, name, id1);
};


/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_135__;

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_136__;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SentenTreeVis = exports.SentenTreeModel = exports.SentenTreeBuilder = exports.WordFilter = exports.tokenizer = undefined;

var _WordFilter = __webpack_require__(24);

Object.defineProperty(exports, 'WordFilter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WordFilter).default;
  }
});

var _SentenTreeBuilder = __webpack_require__(45);

Object.defineProperty(exports, 'SentenTreeBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SentenTreeBuilder).default;
  }
});

var _SentenTreeModel = __webpack_require__(23);

Object.defineProperty(exports, 'SentenTreeModel', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SentenTreeModel).default;
  }
});

var _SentenTreeVis = __webpack_require__(46);

Object.defineProperty(exports, 'SentenTreeVis', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SentenTreeVis).default;
  }
});

var _tokenize = __webpack_require__(25);

var _tokenizer = _interopRequireWildcard(_tokenize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenizer = exports.tokenizer = _tokenizer;

/***/ })
/******/ ]);
});