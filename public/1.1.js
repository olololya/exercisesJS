webpackJsonp([1],Array(87).concat([
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getIterator2 = __webpack_require__(88);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _slicedToArray2 = __webpack_require__(141);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	__webpack_require__(145);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports.init = function (diff) {
	
	  setFlagsOnSpan(diff.bombs);
	
	  var table = createTable(diff.row, diff.cell);
	
	  table.onclick = openCell;
	  table.oncontextmenu = setFlag;
	};
	
	function setFlagsOnSpan(str) {
	  var span = document.getElementById('flags');
	  span.innerHTML = str;
	}
	
	function getFlagsFromSpan() {
	  var span = document.getElementById('flags');
	  return parseInt(span.innerHTML);
	}
	
	function setClicksOnP(str) {
	  var p = document.getElementById('clicks');
	  p.innerHTML = str;
	}
	
	function getClicksFromP() {
	  var p = document.getElementById('clicks');
	  return parseInt(p.innerHTML);
	}
	
	function getNumRowsCells() {
	  var table = document.getElementById('table1');
	  var trs = table.getElementsByTagName('tr');
	  var tds = trs[0].getElementsByTagName('td');
	
	  return [trs.length, tds.length];
	}
	
	function createTable(nrows, ncells) {
	
	  var table = document.getElementById('table1');
	  if (table) {
	    document.body.removeChild(table);
	    document.body.removeChild(document.getElementById('clicks'));
	  }
	
	  table = document.createElement('table');
	  table.setAttribute('id', 'table1');
	  table.setAttribute('border', '1');
	  table.setAttribute('align', 'center');
	  table.setAttribute('cellspacing', '0');
	  table.setAttribute('border-collapse', 'collapse');
	  table.setAttribute('cols', ncells);
	
	  for (var i = 0; i < nrows; i++) {
	    var row = table.insertRow(i);
	    for (var j = 0; j < ncells; j++) {
	      var cell = row.insertCell(j);
	      cell.setAttribute('id', i + ' ' + j);
	      cell.setAttribute('class', 'close');
	    }
	  }
	
	  document.body.appendChild(table);
	
	  var p = document.createElement('p');
	  p.setAttribute('id', 'clicks');
	  p.innerHTML = 0;
	
	  document.body.appendChild(p);
	
	  return table;
	}
	
	function getCells() {
	  var table = document.getElementById('table1');
	  var cells = table ? table.getElementsByTagName('td') : null;
	  if (!cells) throw new Error('Table is not found');
	  return cells;
	}
	
	function generateBombs(id) {
	  var nbombs = getFlagsFromSpan();
	
	  var cells = getCells();
	
	  var _id$split = id.split(' '),
	      _id$split2 = (0, _slicedToArray3.default)(_id$split, 2),
	      i = _id$split2[0],
	      j = _id$split2[1];
	
	  while (nbombs > 0) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = (0, _getIterator3.default)(cells), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var cell = _step.value;
	
	        if (nbombs === 0) break;
	
	        var _cell$id$split = cell.id.split(' '),
	            _cell$id$split2 = (0, _slicedToArray3.default)(_cell$id$split, 2),
	            n = _cell$id$split2[0],
	            m = _cell$id$split2[1];
	
	        if (i === n && j === m) continue;
	        if (!cell.classList.contains('bomb') && generateChance()) {
	          cell.classList.add('bomb');
	          nbombs--;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  }
	
	  function generateChance() {
	    var chance = Math.random() * 100;
	    if (chance <= 5) return true;else return false;
	  }
	}
	
	function generateNumbers() {
	  var _getNumRowsCells = getNumRowsCells(),
	      _getNumRowsCells2 = (0, _slicedToArray3.default)(_getNumRowsCells, 2),
	      nrows = _getNumRowsCells2[0],
	      ncells = _getNumRowsCells2[1];
	
	  var cells = getCells();
	
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = (0, _getIterator3.default)(cells), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var cell = _step2.value;
	
	      if (cell.classList.contains('bomb')) {
	        var _cell$id$split3 = cell.id.split(' '),
	            _cell$id$split4 = (0, _slicedToArray3.default)(_cell$id$split3, 2),
	            i = _cell$id$split4[0],
	            j = _cell$id$split4[1];
	
	        i = parseInt(i);
	        j = parseInt(j);
	        for (var n = i - 1; n <= i + 1; n++) {
	          if (n >= 0 && n < nrows) {
	            for (var m = j - 1; m <= j + 1; m++) {
	              if (m >= 0 && m < ncells) {
	                if (n == i && m == j) continue;else {
	                  var cell_num = document.getElementById(n + ' ' + m);
	                  if (!cell_num.classList.contains('bomb')) {
	                    var text = cell_num.innerHTML;
	                    if (text) text++;else text = 1;
	                    cell_num.innerHTML = text;
	                  }
	                }
	              }
	            }
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	}
	
	function openCell() {
	  var td = event.target;
	  if (td.tagName == 'TD') {
	    var num_clicks = getClicksFromP();
	    if (num_clicks === 0) {
	      generateBombs(td.id);
	      generateNumbers();
	    }
	    if (td.classList.contains('open')) return;
	    if (td.classList.contains('flag')) {
	      td.classList.remove('flag');
	    }
	    if (!td.classList.contains('bomb')) {
	      td.classList.remove('close');
	      td.classList.add('open');
	      num_clicks++;
	      setClicksOnP(num_clicks);
	      if (getFlagsFromSpan() === 0) isWin();
	      if (!td.innerHTML) fillOpen(td.id);
	    } else {
	      setFlagsOnSpan('YOU LOSE');
	      endGame();
	    }
	  }
	}
	
	function setFlag() {
	  var td = event.target;
	  event.preventDefault();
	  if (td.tagName == 'TD') {
	    var num_clicks = getClicksFromP();
	    if (num_clicks === 0) return;
	    var num_flags = getFlagsFromSpan();
	    if (td.classList.contains('open')) return;
	    if (td.classList.contains('flag')) {
	      td.classList.remove('flag');
	      num_flags++;
	    } else {
	      if (num_flags > 0) {
	        td.classList.add('flag');
	        num_flags--;
	      }
	    }
	    setFlagsOnSpan(num_flags);
	    if (num_flags === 0) isWin();
	  }
	}
	
	function fillOpen(id) {
	  var _getNumRowsCells3 = getNumRowsCells(),
	      _getNumRowsCells4 = (0, _slicedToArray3.default)(_getNumRowsCells3, 2),
	      nrows = _getNumRowsCells4[0],
	      ncells = _getNumRowsCells4[1];
	
	  var _id$split3 = id.split(' '),
	      _id$split4 = (0, _slicedToArray3.default)(_id$split3, 2),
	      i = _id$split4[0],
	      j = _id$split4[1];
	
	  i = parseInt(i);
	  j = parseInt(j);
	
	  for (var n = i - 1; n <= i + 1; n++) {
	    if (n >= 0 && n < nrows) {
	      for (var m = j - 1; m <= j + 1; m++) {
	        if (m >= 0 && m < ncells) {
	          if (n === i && m === j) continue;else {
	            var cell_num = document.getElementById(n + ' ' + m);
	            if (!cell_num.classList.contains('bomb') && !cell_num.classList.contains('flag') && !cell_num.classList.contains('open')) {
	              cell_num.classList.remove('close');
	              cell_num.classList.add('open');
	              if (!cell_num.innerHTML) fillOpen(n + ' ' + m);
	            }
	          }
	        }
	      }
	    }
	  }
	  if (getFlagsFromSpan() === 0) isWin();
	}
	
	function isWin() {
	  var cells = getCells();
	  var flag = true;
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;
	
	  try {
	    for (var _iterator3 = (0, _getIterator3.default)(cells), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var cell = _step3.value;
	
	      if (cell.classList.contains('close') && !cell.classList.contains('flag')) return;
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }
	
	  setFlagsOnSpan('YOU WIN');
	
	  var table = document.getElementById('table1');
	  table.onclick = function () {};
	  table.oncontextmenu = function () {};
	}
	
	function endGame() {
	  var cells = getCells();
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;
	
	  try {
	    for (var _iterator4 = (0, _getIterator3.default)(cells), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var cell = _step4.value;
	
	      cell.classList.remove('close');
	      if (cell.classList.contains('flag') && cell.classList.contains('bomb')) {
	        cell.classList.remove('flag');
	        cell.classList.remove('bomb');
	        cell.classList.add('flag-bomb');
	      }
	      if (!cell.classList.contains('bomb')) {
	        cell.classList.add('open');
	      }
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	__webpack_require__(136);
	module.exports = __webpack_require__(138);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var global        = __webpack_require__(102)
	  , hide          = __webpack_require__(106)
	  , Iterators     = __webpack_require__(94)
	  , TO_STRING_TAG = __webpack_require__(133)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(92)
	  , step             = __webpack_require__(93)
	  , Iterators        = __webpack_require__(94)
	  , toIObject        = __webpack_require__(95);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(99)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(96)
	  , defined = __webpack_require__(98);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(97);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(100)
	  , $export        = __webpack_require__(101)
	  , redefine       = __webpack_require__(116)
	  , hide           = __webpack_require__(106)
	  , has            = __webpack_require__(117)
	  , Iterators      = __webpack_require__(94)
	  , $iterCreate    = __webpack_require__(118)
	  , setToStringTag = __webpack_require__(132)
	  , getPrototypeOf = __webpack_require__(134)
	  , ITERATOR       = __webpack_require__(133)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(102)
	  , core      = __webpack_require__(103)
	  , ctx       = __webpack_require__(104)
	  , hide      = __webpack_require__(106)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 102 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 103 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(105);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(107)
	  , createDesc = __webpack_require__(115);
	module.exports = __webpack_require__(111) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(108)
	  , IE8_DOM_DEFINE = __webpack_require__(110)
	  , toPrimitive    = __webpack_require__(114)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(111) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(109);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(111) && !__webpack_require__(112)(function(){
	  return Object.defineProperty(__webpack_require__(113)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(112)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(109)
	  , document = __webpack_require__(102).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(109);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 115 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(106);

/***/ },
/* 117 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(119)
	  , descriptor     = __webpack_require__(115)
	  , setToStringTag = __webpack_require__(132)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(106)(IteratorPrototype, __webpack_require__(133)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(108)
	  , dPs         = __webpack_require__(120)
	  , enumBugKeys = __webpack_require__(130)
	  , IE_PROTO    = __webpack_require__(127)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(113)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(131).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(107)
	  , anObject = __webpack_require__(108)
	  , getKeys  = __webpack_require__(121);
	
	module.exports = __webpack_require__(111) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(122)
	  , enumBugKeys = __webpack_require__(130);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(117)
	  , toIObject    = __webpack_require__(95)
	  , arrayIndexOf = __webpack_require__(123)(false)
	  , IE_PROTO     = __webpack_require__(127)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(95)
	  , toLength  = __webpack_require__(124)
	  , toIndex   = __webpack_require__(126);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(125)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 125 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(125)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(128)('keys')
	  , uid    = __webpack_require__(129);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(102)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 130 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(102).document && document.documentElement;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(107).f
	  , has = __webpack_require__(117)
	  , TAG = __webpack_require__(133)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(128)('wks')
	  , uid        = __webpack_require__(129)
	  , Symbol     = __webpack_require__(102).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(117)
	  , toObject    = __webpack_require__(135)
	  , IE_PROTO    = __webpack_require__(127)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(98);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(137)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(99)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(125)
	  , defined   = __webpack_require__(98);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(108)
	  , get      = __webpack_require__(139);
	module.exports = __webpack_require__(103).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(140)
	  , ITERATOR  = __webpack_require__(133)('iterator')
	  , Iterators = __webpack_require__(94);
	module.exports = __webpack_require__(103).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(97)
	  , TAG = __webpack_require__(133)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(142);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(88);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	__webpack_require__(136);
	module.exports = __webpack_require__(144);

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(140)
	  , ITERATOR  = __webpack_require__(133)('iterator')
	  , Iterators = __webpack_require__(94);
	module.exports = __webpack_require__(103).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(146);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(81)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(146, function() {
				var newContent = __webpack_require__(146);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(80)();
	// imports
	
	
	// module
	exports.push([module.id, "#clicks {\r\n  text-align: center;\r\n  font: bold 18px Arial;\r\n  color: gray;\r\n}\r\n\r\ntable {\r\n  margin: 25px auto;\r\n  margin-bottom: 10px;\r\n}\r\n\r\ntd {\r\n  height: 28px;\r\n  width: 28px;\r\n  transition: all .2s linear;\r\n  border: 1px solid black;\r\n  cursor: default;\r\n  user-select: none;\r\n}\r\n\r\ntd.bomb {\r\n  background-color: #ff726b;\r\n}\r\n\r\ntd.close {\r\n  background-color: lightgray;\r\n  color: lightgray;\r\n}\r\n\r\ntd.flag {\r\n  background-color: #849dff;\r\n  color: #849dff;\r\n}\r\n\r\ntd.open {\r\n  background-color: white;\r\n  color: black;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n}\r\n\r\ntd.flag-bomb {\r\n  background-color: #a741ff;\r\n}", ""]);
	
	// exports


/***/ }
]));
//# sourceMappingURL=1.1.js.map