/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateDOM: () => (/* binding */ updateDOM)
/* harmony export */ });
const playerOneGameboardContainer = document.getElementById("player-one-gameboard");
const playerTwoGameboardContainer = document.getElementById("player-two-gameboard");
function generateGameBoardDOM(gameBoard) {
  const returnElement = document.createElement("div");
  returnElement.classList.add("game-board");
  const {
    size
  } = gameBoard;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const newCell = document.createElement("span");
      if (gameBoard.grid[i][j]) {
        newCell.innerText = "Ship";
      } else {
        newCell.innerText = "";
      }
      newCell.classList.add("cell");
      returnElement.appendChild(newCell);
    }
  }
  return returnElement;
}
function clearChildren(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}
function updateDOM(playerOne, playerTwo) {
  clearChildren(playerOneGameboardContainer);
  clearChildren(playerTwoGameboardContainer);
  playerOneGameboardContainer.appendChild(generateGameBoardDOM(playerOne.gameBoard));
  playerTwoGameboardContainer.appendChild(generateGameBoardDOM(playerTwo.gameBoard));
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.game-board{
    display: grid;
    grid-template-columns: repeat(10, 25px);
}

body{
    display: flex;
    gap: 100px;
}

.cell{
    background-color: aqua;
    margin: 2px;
    height: 25px;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,uCAAuC;AAC3C;;AAEA;IACI,aAAa;IACb,UAAU;AACd;;AAEA;IACI,sBAAsB;IACtB,WAAW;IACX,YAAY;AAChB","sourcesContent":[".game-board{\n    display: grid;\n    grid-template-columns: repeat(10, 25px);\n}\n\nbody{\n    display: flex;\n    gap: 100px;\n}\n\n.cell{\n    background-color: aqua;\n    margin: 2px;\n    height: 25px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameBoard: () => (/* binding */ GameBoard),
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");


const BOARD_SIZE = 10;
class Ship {
  constructor(length, isVertical) {
    this.length = length;
    this.hitArr = Array.apply(null, Array(length));
    this.isVertical = isVertical;
  }
  hit(location) {
    if (location >= 0 && location < this.hitArr.length) {
      if (!this.hitArr[location]) {
        this.hitArr[location] = true;
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  isSunk() {
    let sunk = true;
    this.hitArr.forEach(hit => {
      if (hit == null) {
        sunk = false;
      }
    });
    return sunk;
  }
}
class GameBoard {
  constructor(size) {
    this.grid = new Array(size).fill(null).map(() => new Array(size).fill(null));
    this.size = size;
  }
  placeShip(x, y, length) {
    let isVertical = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (isVertical) {
      if (length > 0 && length + y <= this.size) {
        let existingShip = false;
        for (let i = y; i < y + length; i++) {
          if (this.grid[x][i]) {
            existingShip = true;
          }
        }
        if (!existingShip) {
          let newShip = new Ship(length, isVertical);
          for (let i = y; i < y + length; i++) {
            this.grid[x][i] = newShip;
          }
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      //horizontal
      if (length > 0 && length + x <= this.size) {
        let existingShip = false;
        for (let i = x; i < x + length; i++) {
          if (this.grid[i][y]) {
            existingShip = true;
          }
        }
        if (!existingShip) {
          let newShip = new Ship(length, isVertical);
          for (let i = x; i < x + length; i++) {
            this.grid[i][y] = newShip;
          }
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  receiveAttack(x, y) {
    if (this.grid[x][y]) {
      //there is a ship at this location, send hit signal and check if it's already hit.
      let shipAttacked = this.grid[x][y];
      let shipOrigin = this.findShipCoordinate(shipAttacked);
      if (shipAttacked.isVertical) {
        return shipAttacked.hit(y - shipOrigin[1]);
      } else {
        //Horizontal
        return shipAttacked.hit(x - shipOrigin[0]);
      }
    } else {
      //no ship, check if we've already missed here.
      if (this.grid[x][y] == null) {
        this.grid[x][y] = false;
        return true; //miss recorded
      } else {
        return false; //already missed here, can't attack here.
      }
    }
  }

  findShipCoordinate(ship) {
    let isVertical = ship.isVertical;
    if (ship) {
      if (isVertical) {
        for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
            if (this.grid[i][j] === ship) {
              return [i, j];
            }
          }
        }
      } else {
        //Horizontal
        for (let j = 0; j < this.size; j++) {
          for (let i = 0; i < this.size; i++) {
            if (this.grid[i][j] === ship) {
              return [i, j];
            }
          }
        }
      }
    }
    return null;
  }
  allShipsSunk() {
    let allShipsSunk = true;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j]) {
          if (!this.grid[i][j].isSunk()) {
            allShipsSunk = false;
          }
        }
      }
    }
    return allShipsSunk;
  }
}
class Player {
  constructor() {
    let opponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Player";
    this.opponent = opponent;
    this.name = name;
    this.gameBoard = new GameBoard(BOARD_SIZE);
  }
}
let playerOne = new Player(null, "Player One");
let playerTwo = new Player(playerOne, "Player Two");
playerTwo.opponent = playerOne;
let winner = false;
let currentPlayer = playerOne;
//while (!winner) {
//console.log("It is player one's turn");
//}

(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateDOM)(playerOne, playerTwo);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSUMsYUFBYSxHQUFHbkMsU0FBUztBQUM3QjtBQUNBO0FBQ0E7O0FBRUFELGtEQUFTLENBQUNDLFNBQVMsRUFBRUMsU0FBUyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBsYXllck9uZUdhbWVib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInBsYXllci1vbmUtZ2FtZWJvYXJkXCIsXG4pO1xuXG5jb25zdCBwbGF5ZXJUd29HYW1lYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJwbGF5ZXItdHdvLWdhbWVib2FyZFwiLFxuKTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVHYW1lQm9hcmRET00oZ2FtZUJvYXJkKSB7XG4gIGNvbnN0IHJldHVybkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICByZXR1cm5FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnYW1lLWJvYXJkXCIpO1xuICBjb25zdCB7IHNpemUgfSA9IGdhbWVCb2FyZDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgY29uc3QgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgaWYgKGdhbWVCb2FyZC5ncmlkW2ldW2pdKSB7XG4gICAgICAgIG5ld0NlbGwuaW5uZXJUZXh0ID0gXCJTaGlwXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdDZWxsLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICB9XG4gICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcmV0dXJuRWxlbWVudC5hcHBlbmRDaGlsZChuZXdDZWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldHVybkVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2hpbGRyZW4oZWxlbWVudCkge1xuICB3aGlsZSAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQubGFzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVET00ocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY2xlYXJDaGlsZHJlbihwbGF5ZXJPbmVHYW1lYm9hcmRDb250YWluZXIpO1xuICBjbGVhckNoaWxkcmVuKHBsYXllclR3b0dhbWVib2FyZENvbnRhaW5lcik7XG5cbiAgcGxheWVyT25lR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgIGdlbmVyYXRlR2FtZUJvYXJkRE9NKHBsYXllck9uZS5nYW1lQm9hcmQpLFxuICApO1xuICBwbGF5ZXJUd29HYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgZ2VuZXJhdGVHYW1lQm9hcmRET00ocGxheWVyVHdvLmdhbWVCb2FyZCksXG4gICk7XG59XG5cbmV4cG9ydCB7IHVwZGF0ZURPTSB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5nYW1lLWJvYXJke1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI1cHgpO1xufVxuXG5ib2R5e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxMDBweDtcbn1cblxuLmNlbGx7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcbiAgICBtYXJnaW46IDJweDtcbiAgICBoZWlnaHQ6IDI1cHg7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksYUFBYTtJQUNiLHVDQUF1QztBQUMzQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsV0FBVztJQUNYLFlBQVk7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmdhbWUtYm9hcmR7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyNXB4KTtcXG59XFxuXFxuYm9keXtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAxMDBweDtcXG59XFxuXFxuLmNlbGx7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XFxuICAgIG1hcmdpbjogMnB4O1xcbiAgICBoZWlnaHQ6IDI1cHg7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgdXBkYXRlRE9NIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmNvbnN0IEJPQVJEX1NJWkUgPSAxMDtcblxuY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaXNWZXJ0aWNhbCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0QXJyID0gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkobGVuZ3RoKSk7XG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgfVxuXG4gIGhpdChsb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiA+PSAwICYmIGxvY2F0aW9uIDwgdGhpcy5oaXRBcnIubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMuaGl0QXJyW2xvY2F0aW9uXSkge1xuICAgICAgICB0aGlzLmhpdEFycltsb2NhdGlvbl0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlzU3VuaygpIHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgdGhpcy5oaXRBcnIuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgICBpZiAoaGl0ID09IG51bGwpIHtcbiAgICAgICAgc3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdW5rO1xuICB9XG59XG5cbmNsYXNzIEdhbWVCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoc2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShzaXplKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgcGxhY2VTaGlwKHgsIHksIGxlbmd0aCwgaXNWZXJ0aWNhbCA9IHRydWUpIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKGxlbmd0aCA+IDAgJiYgbGVuZ3RoICsgeSA8PSB0aGlzLnNpemUpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nU2hpcCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRbeF1baV0pIHtcbiAgICAgICAgICAgIGV4aXN0aW5nU2hpcCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFleGlzdGluZ1NoaXApIHtcbiAgICAgICAgICBsZXQgbmV3U2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgaXNWZXJ0aWNhbCk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFt4XVtpXSA9IG5ld1NoaXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL2hvcml6b250YWxcbiAgICAgIGlmIChsZW5ndGggPiAwICYmIGxlbmd0aCArIHggPD0gdGhpcy5zaXplKSB7XG4gICAgICAgIGxldCBleGlzdGluZ1NoaXAgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5ncmlkW2ldW3ldKSB7XG4gICAgICAgICAgICBleGlzdGluZ1NoaXAgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXhpc3RpbmdTaGlwKSB7XG4gICAgICAgICAgbGV0IG5ld1NoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGlzVmVydGljYWwpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRbaV1beV0gPSBuZXdTaGlwO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ncmlkW3hdW3ldKSB7XG4gICAgICAvL3RoZXJlIGlzIGEgc2hpcCBhdCB0aGlzIGxvY2F0aW9uLCBzZW5kIGhpdCBzaWduYWwgYW5kIGNoZWNrIGlmIGl0J3MgYWxyZWFkeSBoaXQuXG4gICAgICBsZXQgc2hpcEF0dGFja2VkID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgbGV0IHNoaXBPcmlnaW4gPSB0aGlzLmZpbmRTaGlwQ29vcmRpbmF0ZShzaGlwQXR0YWNrZWQpO1xuICAgICAgaWYgKHNoaXBBdHRhY2tlZC5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIHJldHVybiBzaGlwQXR0YWNrZWQuaGl0KHkgLSBzaGlwT3JpZ2luWzFdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vSG9yaXpvbnRhbFxuICAgICAgICByZXR1cm4gc2hpcEF0dGFja2VkLmhpdCh4IC0gc2hpcE9yaWdpblswXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vbm8gc2hpcCwgY2hlY2sgaWYgd2UndmUgYWxyZWFkeSBtaXNzZWQgaGVyZS5cbiAgICAgIGlmICh0aGlzLmdyaWRbeF1beV0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmdyaWRbeF1beV0gPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vbWlzcyByZWNvcmRlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAvL2FscmVhZHkgbWlzc2VkIGhlcmUsIGNhbid0IGF0dGFjayBoZXJlLlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRTaGlwQ29vcmRpbmF0ZShzaGlwKSB7XG4gICAgbGV0IGlzVmVydGljYWwgPSBzaGlwLmlzVmVydGljYWw7XG5cbiAgICBpZiAoc2hpcCkge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyBqKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdyaWRbaV1bal0gPT09IHNoaXApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFtpLCBqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vSG9yaXpvbnRhbFxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaisrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZFtpXVtqXSA9PT0gc2hpcCkge1xuICAgICAgICAgICAgICByZXR1cm4gW2ksIGpdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGxldCBhbGxTaGlwc1N1bmsgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZFtpXVtqXSkge1xuICAgICAgICAgIGlmICghdGhpcy5ncmlkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhbGxTaGlwc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFsbFNoaXBzU3VuaztcbiAgfVxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihvcHBvbmVudCA9IG51bGwsIG5hbWUgPSBcIlBsYXllclwiKSB7XG4gICAgdGhpcy5vcHBvbmVudCA9IG9wcG9uZW50O1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nYW1lQm9hcmQgPSBuZXcgR2FtZUJvYXJkKEJPQVJEX1NJWkUpO1xuICB9XG59XG5cbmxldCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKG51bGwsIFwiUGxheWVyIE9uZVwiKTtcbmxldCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKHBsYXllck9uZSwgXCJQbGF5ZXIgVHdvXCIpO1xucGxheWVyVHdvLm9wcG9uZW50ID0gcGxheWVyT25lO1xuXG5sZXQgd2lubmVyID0gZmFsc2U7XG5sZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbi8vd2hpbGUgKCF3aW5uZXIpIHtcbi8vY29uc29sZS5sb2coXCJJdCBpcyBwbGF5ZXIgb25lJ3MgdHVyblwiKTtcbi8vfVxuXG51cGRhdGVET00ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG5leHBvcnQgeyBTaGlwLCBHYW1lQm9hcmQgfTtcbiJdLCJuYW1lcyI6WyJwbGF5ZXJPbmVHYW1lYm9hcmRDb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGxheWVyVHdvR2FtZWJvYXJkQ29udGFpbmVyIiwiZ2VuZXJhdGVHYW1lQm9hcmRET00iLCJnYW1lQm9hcmQiLCJyZXR1cm5FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNpemUiLCJpIiwiaiIsIm5ld0NlbGwiLCJncmlkIiwiaW5uZXJUZXh0IiwiYXBwZW5kQ2hpbGQiLCJjbGVhckNoaWxkcmVuIiwiZWxlbWVudCIsImhhc0NoaWxkTm9kZXMiLCJyZW1vdmVDaGlsZCIsImxhc3RDaGlsZCIsInVwZGF0ZURPTSIsInBsYXllck9uZSIsInBsYXllclR3byIsIkJPQVJEX1NJWkUiLCJTaGlwIiwiY29uc3RydWN0b3IiLCJsZW5ndGgiLCJpc1ZlcnRpY2FsIiwiaGl0QXJyIiwiQXJyYXkiLCJhcHBseSIsImhpdCIsImxvY2F0aW9uIiwiaXNTdW5rIiwic3VuayIsImZvckVhY2giLCJHYW1lQm9hcmQiLCJmaWxsIiwibWFwIiwicGxhY2VTaGlwIiwieCIsInkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJleGlzdGluZ1NoaXAiLCJuZXdTaGlwIiwicmVjZWl2ZUF0dGFjayIsInNoaXBBdHRhY2tlZCIsInNoaXBPcmlnaW4iLCJmaW5kU2hpcENvb3JkaW5hdGUiLCJzaGlwIiwiYWxsU2hpcHNTdW5rIiwiUGxheWVyIiwib3Bwb25lbnQiLCJuYW1lIiwid2lubmVyIiwiY3VycmVudFBsYXllciJdLCJzb3VyY2VSb290IjoiIn0=