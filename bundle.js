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
/* harmony export */   generateDOM: () => (/* binding */ generateDOM),
/* harmony export */   updateDOM: () => (/* binding */ updateDOM)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");

const playerOneGameboardContainer = document.getElementById("player-one-gameboard");
const playerTwoGameboardContainer = document.getElementById("player-two-gameboard");
function updateGameBoardDOM(gameBoard, id) {
  let phantomBoat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let phantomBoatLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  let phantomBoatVertical = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  let hideShips = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  const {
    size
  } = gameBoard;
  const phantomBoatCells = [];
  if (phantomBoat) {
    if (phantomBoatVertical) {
      for (let i = 0; i < phantomBoatLength; i++) {
        phantomBoatCells.push([phantomBoat[0], phantomBoat[1] + i]);
      }
    } else {
      for (let i = 0; i < phantomBoatLength; i++) {
        phantomBoatCells.push([phantomBoat[0] + i, phantomBoat[1]]);
      }
    }
  }
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = gameBoard.grid[x][y];
      const domCell = document.getElementById(`${id + x}:${y}`);
      domCell.className = "cell";
      if (phantomBoat) {
        phantomBoatCells.forEach(phantomCell => {
          if (phantomCell[0] === x && phantomCell[1] === y) {
            domCell.classList.add("ship");
          }
        });
      }
      if (cell) {
        if (gameBoard.cellIsHitShip(x, y)) {
          domCell.classList.add("hit-ship");
        } else if (hideShips) {
          domCell.classList.add("empty");
        } else {
          domCell.classList.add("ship");
        }
      } else if (cell === false) {
        domCell.classList.add("miss");
      } else {
        domCell.classList.add("empty");
      }
    }
  }
}
function generateGameBoardDOM(gameBoard, id) {
  let hideShips = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const returnElement = document.createElement("div");
  returnElement.classList.add("game-board");
  const {
    size
  } = gameBoard;
  for (let y = size - 1; y >= 0; y--) {
    for (let x = 0; x < size; x++) {
      const cell = gameBoard.grid[x][y];
      const newCell = document.createElement("span");
      newCell.id = `${id}${x}:${y}`;
      newCell.addEventListener("mouseover", ___WEBPACK_IMPORTED_MODULE_0__.cellHovered);
      newCell.addEventListener("click", ___WEBPACK_IMPORTED_MODULE_0__.cellClicked);
      newCell.classList.add("cell");
      if (cell) {
        if (hideShips) {
          newCell.classList.add("ship");
        } else {
          newCell.classList.add("empty");
        }
      } else if (cell === false) {
        newCell.classList.add("miss");
      } else {
        newCell.classList.add("empty");
      }
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
function generateDOM(playerOne, playerTwo) {
  clearChildren(playerOneGameboardContainer);
  clearChildren(playerTwoGameboardContainer);
  playerOneGameboardContainer.appendChild(generateGameBoardDOM(playerOne.gameBoard, "playerOne"));
  playerTwoGameboardContainer.appendChild(generateGameBoardDOM(playerTwo.gameBoard, "playerTwo"));
}
function updateDOM(playerOne, playerTwo) {
  let phantomBoat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let phantomBoatLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  let phantomBoatVertical = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  updateGameBoardDOM(playerOne.gameBoard, "playerOne", phantomBoat, phantomBoatLength, phantomBoatVertical);
  updateGameBoardDOM(playerTwo.gameBoard, "playerTwo", null, null, null, true);
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameBoard: () => (/* binding */ GameBoard),
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   cellClicked: () => (/* binding */ cellClicked),
/* harmony export */   cellHovered: () => (/* binding */ cellHovered)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* eslint-disable max-classes-per-file */


const BOARD_SIZE = 10;
class Ship {
  constructor(length, isVertical) {
    this.length = length;
    this.hitArr = Array.apply(null, Array(length));
    this.isVertical = isVertical;
  }
  hit(location) {
    if (location >= 0 && location < this.hitArr.length) {
      if (!this.isHit(location)) {
        this.hitArr[location] = true;
        return true;
      }
      return false;
    }
    return false;
  }
  isHit(location) {
    return this.hitArr[location];
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
          const newShip = new Ship(length, isVertical);
          for (let i = y; i < y + length; i++) {
            this.grid[x][i] = newShip;
          }
          return true;
        }
        return false;
      }
      return false;
    }
    // horizontal
    if (length > 0 && length + x <= this.size) {
      let existingShip = false;
      for (let i = x; i < x + length; i++) {
        if (this.grid[i][y]) {
          existingShip = true;
        }
      }
      if (!existingShip) {
        const newShip = new Ship(length, isVertical);
        for (let i = x; i < x + length; i++) {
          this.grid[i][y] = newShip;
        }
        return true;
      }
      return false;
    }
    return false;
  }
  receiveAttack(x, y) {
    if (this.grid[x][y]) {
      // there is a ship at this location, send hit signal and check if it's already hit.
      const shipAttacked = this.grid[x][y];
      const shipOrigin = this.findShipCoordinate(shipAttacked);
      if (shipAttacked.isVertical) {
        return shipAttacked.hit(y - shipOrigin[1]);
      }
      // Horizontal
      return shipAttacked.hit(x - shipOrigin[0]);
    }
    // no ship, check if we've already missed here.
    if (this.grid[x][y] == null) {
      this.grid[x][y] = false;
      return true; // miss recorded
    }

    return false; // already missed here, can't attack here.
  }

  cellIsHitShip(x, y) {
    if (this.grid[x][y]) {
      const ship = this.grid[x][y];
      const shipOrigin = this.findShipCoordinate(ship);
      if (ship.isVertical) {
        return ship.isHit(y - shipOrigin[1]);
      }
      return ship.isHit(x - shipOrigin[0]);
    }
    return false;
  }
  findShipCoordinate(ship) {
    const {
      isVertical
    } = ship;
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
        // Horizontal
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
const playerOne = new Player(null, "Player One");
const playerTwo = new Player(playerOne, "Player Two");
playerTwo.opponent = playerOne;
const gameText = document.getElementById("game-text");
let winner = false;
let currentPlayer = playerOne;
const {
  body
} = document;
window.addEventListener("contextmenu", e => e.preventDefault());
body.addEventListener("contextmenu", rightClick);
let boats = [5, 4, 3, 3, 2];

// AI place.
while (boats.length >= 1) {
  const randX = Math.floor(Math.random() * BOARD_SIZE);
  const randY = Math.floor(Math.random() * BOARD_SIZE);
  const isVertical = Math.random() < 0.5;
  if (playerTwo.gameBoard.placeShip(randX, randY, boats[boats.length - 1], isVertical)) {
    boats.pop();
  }
}
boats = [5, 4, 3, 3, 2];
let placingBoats = true;
let currentIsVertical = true;
gameText.innerText = "Place your boats, right click to rotate.";
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.generateDOM)(playerOne, playerTwo);
function randomCoord() {
  return Math.floor(Math.random() * BOARD_SIZE);
}
function aiPlayerTurn() {
  let x = randomCoord();
  let y = randomCoord();
  while (!playerOne.gameBoard.receiveAttack(x, y)) {
    x = randomCoord();
    y = randomCoord();
  }
  if (playerOne.gameBoard.allShipsSunk()) {
    winner = playerTwo;
    gameText.innerText = "Player two wins!";
  }
  currentPlayer = playerOne;
}
function cellHovered(event) {
  const cell = event.target;
  const {
    id
  } = cell;
  const x = Number(id.slice(9, 10));
  const y = Number(id.slice(11, 12));
  if (placingBoats) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateDOM)(playerOne, playerTwo, [x, y], boats[boats.length - 1], currentIsVertical);
  }
}
function cellClicked(event) {
  if (!winner) {
    const cell = event.target;
    const {
      id
    } = cell;
    const x = Number(id.slice(9, 10));
    const y = Number(id.slice(11, 12));
    if (placingBoats) {
      if (id.slice(0, 9) === "playerOne") {
        if (playerOne.gameBoard.placeShip(x, y, boats[boats.length - 1], currentIsVertical)) {
          boats.pop();
          if (boats.length === 0) {
            placingBoats = false;
            gameText.innerText = "Player one, fire!";
          }
          (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateDOM)(playerOne, playerTwo);
        }
      }
    } else if (currentPlayer === playerOne) {
      if (id.slice(0, 9) === "playerTwo") {
        if (playerTwo.gameBoard.receiveAttack(x, y)) {
          if (playerTwo.gameBoard.allShipsSunk()) {
            winner = playerOne;
            gameText.innerText = "Player one wins!";
          } else {
            currentPlayer = playerTwo;
            aiPlayerTurn();
          }
          (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateDOM)(playerOne, playerTwo, [x, y], boats[boats.length - 1], currentIsVertical);
        }
      }
    }
  }
}
function rightClick(event) {
  const cell = event.target;
  const {
    id
  } = cell;
  const x = Number(id.slice(9, 10));
  const y = Number(id.slice(11, 12));
  if (placingBoats) {
    currentIsVertical = !currentIsVertical;
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateDOM)(playerOne, playerTwo, [x, y], boats[boats.length - 1], currentIsVertical);
  }
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
    flex-wrap: wrap;
}
.play-area{
    display: flex;
    width: 600px;
    justify-content: space-between;
}

.cell{
    background-color: aqua;
    margin: 2px;
    height: 25px;
}

.cell:hover{
    background-color: white;
}

.cell.ship {
    background-color: grey;
}

.cell.miss {
    background-color: orange;
}

#orange{
    color: orange;
}

.cell.hit-ship{
    background-color: red;
}

#red{
    color: red;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,uCAAuC;AAC3C;;AAEA;IACI,aAAa;IACb,eAAe;AACnB;AACA;IACI,aAAa;IACb,YAAY;IACZ,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,UAAU;AACd","sourcesContent":[".game-board{\n    display: grid;\n    grid-template-columns: repeat(10, 25px);\n}\n\nbody{\n    display: flex;\n    flex-wrap: wrap;\n}\n.play-area{\n    display: flex;\n    width: 600px;\n    justify-content: space-between;\n}\n\n.cell{\n    background-color: aqua;\n    margin: 2px;\n    height: 25px;\n}\n\n.cell:hover{\n    background-color: white;\n}\n\n.cell.ship {\n    background-color: grey;\n}\n\n.cell.miss {\n    background-color: orange;\n}\n\n#orange{\n    color: orange;\n}\n\n.cell.hit-ship{\n    background-color: red;\n}\n\n#red{\n    color: red;\n}"],"sourceRoot":""}]);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2VsbEhvdmVyZWQsIGNlbGxDbGlja2VkIH0gZnJvbSBcIi5cIjtcblxuY29uc3QgcGxheWVyT25lR2FtZWJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwicGxheWVyLW9uZS1nYW1lYm9hcmRcIixcbik7XG5cbmNvbnN0IHBsYXllclR3b0dhbWVib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInBsYXllci10d28tZ2FtZWJvYXJkXCIsXG4pO1xuXG5mdW5jdGlvbiB1cGRhdGVHYW1lQm9hcmRET00oXG4gIGdhbWVCb2FyZCxcbiAgaWQsXG4gIHBoYW50b21Cb2F0ID0gbnVsbCxcbiAgcGhhbnRvbUJvYXRMZW5ndGggPSBudWxsLFxuICBwaGFudG9tQm9hdFZlcnRpY2FsID0gbnVsbCxcbiAgaGlkZVNoaXBzID0gbnVsbCxcbikge1xuICBjb25zdCB7IHNpemUgfSA9IGdhbWVCb2FyZDtcbiAgY29uc3QgcGhhbnRvbUJvYXRDZWxscyA9IFtdO1xuXG4gIGlmIChwaGFudG9tQm9hdCkge1xuICAgIGlmIChwaGFudG9tQm9hdFZlcnRpY2FsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBoYW50b21Cb2F0TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGhhbnRvbUJvYXRDZWxscy5wdXNoKFtwaGFudG9tQm9hdFswXSwgcGhhbnRvbUJvYXRbMV0gKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGhhbnRvbUJvYXRMZW5ndGg7IGkrKykge1xuICAgICAgICBwaGFudG9tQm9hdENlbGxzLnB1c2goW3BoYW50b21Cb2F0WzBdICsgaSwgcGhhbnRvbUJvYXRbMV1dKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZTsgeSsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZ2FtZUJvYXJkLmdyaWRbeF1beV07XG4gICAgICBjb25zdCBkb21DZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aWQgKyB4fToke3l9YCk7XG4gICAgICBkb21DZWxsLmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgaWYgKHBoYW50b21Cb2F0KSB7XG4gICAgICAgIHBoYW50b21Cb2F0Q2VsbHMuZm9yRWFjaCgocGhhbnRvbUNlbGwpID0+IHtcbiAgICAgICAgICBpZiAocGhhbnRvbUNlbGxbMF0gPT09IHggJiYgcGhhbnRvbUNlbGxbMV0gPT09IHkpIHtcbiAgICAgICAgICAgIGRvbUNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgIGlmIChnYW1lQm9hcmQuY2VsbElzSGl0U2hpcCh4LCB5KSkge1xuICAgICAgICAgIGRvbUNlbGwuY2xhc3NMaXN0LmFkZChcImhpdC1zaGlwXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGhpZGVTaGlwcykge1xuICAgICAgICAgIGRvbUNlbGwuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbUNlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgZG9tQ2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvbUNlbGwuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUdhbWVCb2FyZERPTShnYW1lQm9hcmQsIGlkLCBoaWRlU2hpcHMgPSBudWxsKSB7XG4gIGNvbnN0IHJldHVybkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICByZXR1cm5FbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJnYW1lLWJvYXJkXCIpO1xuICBjb25zdCB7IHNpemUgfSA9IGdhbWVCb2FyZDtcblxuICBmb3IgKGxldCB5ID0gc2l6ZSAtIDE7IHkgPj0gMDsgeS0tKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzaXplOyB4KyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBnYW1lQm9hcmQuZ3JpZFt4XVt5XTtcbiAgICAgIGNvbnN0IG5ld0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIG5ld0NlbGwuaWQgPSBgJHtpZH0ke3h9OiR7eX1gO1xuICAgICAgbmV3Q2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGNlbGxIb3ZlcmVkKTtcbiAgICAgIG5ld0NlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNlbGxDbGlja2VkKTtcbiAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG5cbiAgICAgIGlmIChjZWxsKSB7XG4gICAgICAgIGlmIChoaWRlU2hpcHMpIHtcbiAgICAgICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGNlbGwgPT09IGZhbHNlKSB7XG4gICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoXCJlbXB0eVwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybkVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3Q2VsbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXR1cm5FbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjbGVhckNoaWxkcmVuKGVsZW1lbnQpIHtcbiAgd2hpbGUgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50Lmxhc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVET00ocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY2xlYXJDaGlsZHJlbihwbGF5ZXJPbmVHYW1lYm9hcmRDb250YWluZXIpO1xuICBjbGVhckNoaWxkcmVuKHBsYXllclR3b0dhbWVib2FyZENvbnRhaW5lcik7XG5cbiAgcGxheWVyT25lR2FtZWJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgIGdlbmVyYXRlR2FtZUJvYXJkRE9NKHBsYXllck9uZS5nYW1lQm9hcmQsIFwicGxheWVyT25lXCIpLFxuICApO1xuICBwbGF5ZXJUd29HYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgZ2VuZXJhdGVHYW1lQm9hcmRET00ocGxheWVyVHdvLmdhbWVCb2FyZCwgXCJwbGF5ZXJUd29cIiksXG4gICk7XG59XG5mdW5jdGlvbiB1cGRhdGVET00oXG4gIHBsYXllck9uZSxcbiAgcGxheWVyVHdvLFxuICBwaGFudG9tQm9hdCA9IG51bGwsXG4gIHBoYW50b21Cb2F0TGVuZ3RoID0gbnVsbCxcbiAgcGhhbnRvbUJvYXRWZXJ0aWNhbCA9IG51bGwsXG4pIHtcbiAgdXBkYXRlR2FtZUJvYXJkRE9NKFxuICAgIHBsYXllck9uZS5nYW1lQm9hcmQsXG4gICAgXCJwbGF5ZXJPbmVcIixcbiAgICBwaGFudG9tQm9hdCxcbiAgICBwaGFudG9tQm9hdExlbmd0aCxcbiAgICBwaGFudG9tQm9hdFZlcnRpY2FsLFxuICApO1xuXG4gIHVwZGF0ZUdhbWVCb2FyZERPTShwbGF5ZXJUd28uZ2FtZUJvYXJkLCBcInBsYXllclR3b1wiLCBudWxsLCBudWxsLCBudWxsLCB0cnVlKTtcbn1cblxuZXhwb3J0IHsgdXBkYXRlRE9NLCBnZW5lcmF0ZURPTSB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgeyB1cGRhdGVET00sIGdlbmVyYXRlRE9NIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmNvbnN0IEJPQVJEX1NJWkUgPSAxMDtcblxuY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgaXNWZXJ0aWNhbCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0QXJyID0gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkobGVuZ3RoKSk7XG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gaXNWZXJ0aWNhbDtcbiAgfVxuXG4gIGhpdChsb2NhdGlvbikge1xuICAgIGlmIChsb2NhdGlvbiA+PSAwICYmIGxvY2F0aW9uIDwgdGhpcy5oaXRBcnIubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNIaXQobG9jYXRpb24pKSB7XG4gICAgICAgIHRoaXMuaGl0QXJyW2xvY2F0aW9uXSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0hpdChsb2NhdGlvbikge1xuICAgIHJldHVybiB0aGlzLmhpdEFycltsb2NhdGlvbl07XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgbGV0IHN1bmsgPSB0cnVlO1xuICAgIHRoaXMuaGl0QXJyLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgaWYgKGhpdCA9PSBudWxsKSB7XG4gICAgICAgIHN1bmsgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3VuaztcbiAgfVxufVxuXG5jbGFzcyBHYW1lQm9hcmQge1xuICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KHNpemUpXG4gICAgICAuZmlsbChudWxsKVxuICAgICAgLm1hcCgoKSA9PiBuZXcgQXJyYXkoc2l6ZSkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgfVxuXG4gIHBsYWNlU2hpcCh4LCB5LCBsZW5ndGgsIGlzVmVydGljYWwgPSB0cnVlKSB7XG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGlmIChsZW5ndGggPiAwICYmIGxlbmd0aCArIHkgPD0gdGhpcy5zaXplKSB7XG4gICAgICAgIGxldCBleGlzdGluZ1NoaXAgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5ncmlkW3hdW2ldKSB7XG4gICAgICAgICAgICBleGlzdGluZ1NoaXAgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZXhpc3RpbmdTaGlwKSB7XG4gICAgICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKGxlbmd0aCwgaXNWZXJ0aWNhbCk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHk7IGkgPCB5ICsgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFt4XVtpXSA9IG5ld1NoaXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gaG9yaXpvbnRhbFxuICAgIGlmIChsZW5ndGggPiAwICYmIGxlbmd0aCArIHggPD0gdGhpcy5zaXplKSB7XG4gICAgICBsZXQgZXhpc3RpbmdTaGlwID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ncmlkW2ldW3ldKSB7XG4gICAgICAgICAgZXhpc3RpbmdTaGlwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWV4aXN0aW5nU2hpcCkge1xuICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAobGVuZ3RoLCBpc1ZlcnRpY2FsKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmdyaWRbaV1beV0gPSBuZXdTaGlwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ncmlkW3hdW3ldKSB7XG4gICAgICAvLyB0aGVyZSBpcyBhIHNoaXAgYXQgdGhpcyBsb2NhdGlvbiwgc2VuZCBoaXQgc2lnbmFsIGFuZCBjaGVjayBpZiBpdCdzIGFscmVhZHkgaGl0LlxuICAgICAgY29uc3Qgc2hpcEF0dGFja2VkID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgY29uc3Qgc2hpcE9yaWdpbiA9IHRoaXMuZmluZFNoaXBDb29yZGluYXRlKHNoaXBBdHRhY2tlZCk7XG4gICAgICBpZiAoc2hpcEF0dGFja2VkLmlzVmVydGljYWwpIHtcbiAgICAgICAgcmV0dXJuIHNoaXBBdHRhY2tlZC5oaXQoeSAtIHNoaXBPcmlnaW5bMV0pO1xuICAgICAgfVxuICAgICAgLy8gSG9yaXpvbnRhbFxuICAgICAgcmV0dXJuIHNoaXBBdHRhY2tlZC5oaXQoeCAtIHNoaXBPcmlnaW5bMF0pO1xuICAgIH1cbiAgICAvLyBubyBzaGlwLCBjaGVjayBpZiB3ZSd2ZSBhbHJlYWR5IG1pc3NlZCBoZXJlLlxuICAgIGlmICh0aGlzLmdyaWRbeF1beV0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gbWlzcyByZWNvcmRlZFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7IC8vIGFscmVhZHkgbWlzc2VkIGhlcmUsIGNhbid0IGF0dGFjayBoZXJlLlxuICB9XG5cbiAgY2VsbElzSGl0U2hpcCh4LCB5KSB7XG4gICAgaWYgKHRoaXMuZ3JpZFt4XVt5XSkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZ3JpZFt4XVt5XTtcbiAgICAgIGNvbnN0IHNoaXBPcmlnaW4gPSB0aGlzLmZpbmRTaGlwQ29vcmRpbmF0ZShzaGlwKTtcbiAgICAgIGlmIChzaGlwLmlzVmVydGljYWwpIHtcbiAgICAgICAgcmV0dXJuIHNoaXAuaXNIaXQoeSAtIHNoaXBPcmlnaW5bMV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNoaXAuaXNIaXQoeCAtIHNoaXBPcmlnaW5bMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmaW5kU2hpcENvb3JkaW5hdGUoc2hpcCkge1xuICAgIGNvbnN0IHsgaXNWZXJ0aWNhbCB9ID0gc2hpcDtcblxuICAgIGlmIChzaGlwKSB7XG4gICAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemU7IGorKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZFtpXVtqXSA9PT0gc2hpcCkge1xuICAgICAgICAgICAgICByZXR1cm4gW2ksIGpdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSG9yaXpvbnRhbFxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaisrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3JpZFtpXVtqXSA9PT0gc2hpcCkge1xuICAgICAgICAgICAgICByZXR1cm4gW2ksIGpdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGxldCBhbGxTaGlwc1N1bmsgPSB0cnVlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JpZFtpXVtqXSkge1xuICAgICAgICAgIGlmICghdGhpcy5ncmlkW2ldW2pdLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhbGxTaGlwc1N1bmsgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFsbFNoaXBzU3VuaztcbiAgfVxufVxuXG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihvcHBvbmVudCA9IG51bGwsIG5hbWUgPSBcIlBsYXllclwiKSB7XG4gICAgdGhpcy5vcHBvbmVudCA9IG9wcG9uZW50O1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nYW1lQm9hcmQgPSBuZXcgR2FtZUJvYXJkKEJPQVJEX1NJWkUpO1xuICB9XG59XG5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIobnVsbCwgXCJQbGF5ZXIgT25lXCIpO1xuY29uc3QgcGxheWVyVHdvID0gbmV3IFBsYXllcihwbGF5ZXJPbmUsIFwiUGxheWVyIFR3b1wiKTtcbnBsYXllclR3by5vcHBvbmVudCA9IHBsYXllck9uZTtcbmNvbnN0IGdhbWVUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLXRleHRcIik7XG5sZXQgd2lubmVyID0gZmFsc2U7XG5sZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbmNvbnN0IHsgYm9keSB9ID0gZG9jdW1lbnQ7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChlKSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgcmlnaHRDbGljayk7XG5cbmxldCBib2F0cyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuLy8gQUkgcGxhY2UuXG53aGlsZSAoYm9hdHMubGVuZ3RoID49IDEpIHtcbiAgY29uc3QgcmFuZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKTtcbiAgY29uc3QgcmFuZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKTtcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gIGlmIChcbiAgICBwbGF5ZXJUd28uZ2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICAgIHJhbmRYLFxuICAgICAgcmFuZFksXG4gICAgICBib2F0c1tib2F0cy5sZW5ndGggLSAxXSxcbiAgICAgIGlzVmVydGljYWwsXG4gICAgKVxuICApIHtcbiAgICBib2F0cy5wb3AoKTtcbiAgfVxufVxuXG5ib2F0cyA9IFs1LCA0LCAzLCAzLCAyXTtcbmxldCBwbGFjaW5nQm9hdHMgPSB0cnVlO1xubGV0IGN1cnJlbnRJc1ZlcnRpY2FsID0gdHJ1ZTtcblxuZ2FtZVRleHQuaW5uZXJUZXh0ID0gXCJQbGFjZSB5b3VyIGJvYXRzLCByaWdodCBjbGljayB0byByb3RhdGUuXCI7XG5cbmdlbmVyYXRlRE9NKHBsYXllck9uZSwgcGxheWVyVHdvKTtcblxuZnVuY3Rpb24gcmFuZG9tQ29vcmQoKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBCT0FSRF9TSVpFKTtcbn1cblxuZnVuY3Rpb24gYWlQbGF5ZXJUdXJuKCkge1xuICBsZXQgeCA9IHJhbmRvbUNvb3JkKCk7XG4gIGxldCB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgd2hpbGUgKCFwbGF5ZXJPbmUuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSkpIHtcbiAgICB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgICB5ID0gcmFuZG9tQ29vcmQoKTtcbiAgfVxuXG4gIGlmIChwbGF5ZXJPbmUuZ2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgd2lubmVyID0gcGxheWVyVHdvO1xuICAgIGdhbWVUZXh0LmlubmVyVGV4dCA9IFwiUGxheWVyIHR3byB3aW5zIVwiO1xuICB9XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG59XG5cbmZ1bmN0aW9uIGNlbGxIb3ZlcmVkKGV2ZW50KSB7XG4gIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IHsgaWQgfSA9IGNlbGw7XG4gIGNvbnN0IHggPSBOdW1iZXIoaWQuc2xpY2UoOSwgMTApKTtcbiAgY29uc3QgeSA9IE51bWJlcihpZC5zbGljZSgxMSwgMTIpKTtcbiAgaWYgKHBsYWNpbmdCb2F0cykge1xuICAgIHVwZGF0ZURPTShcbiAgICAgIHBsYXllck9uZSxcbiAgICAgIHBsYXllclR3byxcbiAgICAgIFt4LCB5XSxcbiAgICAgIGJvYXRzW2JvYXRzLmxlbmd0aCAtIDFdLFxuICAgICAgY3VycmVudElzVmVydGljYWwsXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjZWxsQ2xpY2tlZChldmVudCkge1xuICBpZiAoIXdpbm5lcikge1xuICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgeyBpZCB9ID0gY2VsbDtcbiAgICBjb25zdCB4ID0gTnVtYmVyKGlkLnNsaWNlKDksIDEwKSk7XG4gICAgY29uc3QgeSA9IE51bWJlcihpZC5zbGljZSgxMSwgMTIpKTtcbiAgICBpZiAocGxhY2luZ0JvYXRzKSB7XG4gICAgICBpZiAoaWQuc2xpY2UoMCwgOSkgPT09IFwicGxheWVyT25lXCIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBsYXllck9uZS5nYW1lQm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBib2F0c1tib2F0cy5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgIGN1cnJlbnRJc1ZlcnRpY2FsLFxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgYm9hdHMucG9wKCk7XG4gICAgICAgICAgaWYgKGJvYXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcGxhY2luZ0JvYXRzID0gZmFsc2U7XG4gICAgICAgICAgICBnYW1lVGV4dC5pbm5lclRleHQgPSBcIlBsYXllciBvbmUsIGZpcmUhXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZURPTShwbGF5ZXJPbmUsIHBsYXllclR3byk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IHBsYXllck9uZSkge1xuICAgICAgaWYgKGlkLnNsaWNlKDAsIDkpID09PSBcInBsYXllclR3b1wiKSB7XG4gICAgICAgIGlmIChwbGF5ZXJUd28uZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgICBpZiAocGxheWVyVHdvLmdhbWVCb2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgICAgd2lubmVyID0gcGxheWVyT25lO1xuICAgICAgICAgICAgZ2FtZVRleHQuaW5uZXJUZXh0ID0gXCJQbGF5ZXIgb25lIHdpbnMhXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUd287XG4gICAgICAgICAgICBhaVBsYXllclR1cm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRE9NKFxuICAgICAgICAgICAgcGxheWVyT25lLFxuICAgICAgICAgICAgcGxheWVyVHdvLFxuICAgICAgICAgICAgW3gsIHldLFxuICAgICAgICAgICAgYm9hdHNbYm9hdHMubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgICBjdXJyZW50SXNWZXJ0aWNhbCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJpZ2h0Q2xpY2soZXZlbnQpIHtcbiAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgeyBpZCB9ID0gY2VsbDtcbiAgY29uc3QgeCA9IE51bWJlcihpZC5zbGljZSg5LCAxMCkpO1xuICBjb25zdCB5ID0gTnVtYmVyKGlkLnNsaWNlKDExLCAxMikpO1xuICBpZiAocGxhY2luZ0JvYXRzKSB7XG4gICAgY3VycmVudElzVmVydGljYWwgPSAhY3VycmVudElzVmVydGljYWw7XG4gICAgdXBkYXRlRE9NKFxuICAgICAgcGxheWVyT25lLFxuICAgICAgcGxheWVyVHdvLFxuICAgICAgW3gsIHldLFxuICAgICAgYm9hdHNbYm9hdHMubGVuZ3RoIC0gMV0sXG4gICAgICBjdXJyZW50SXNWZXJ0aWNhbCxcbiAgICApO1xuICB9XG59XG5leHBvcnQgeyBTaGlwLCBHYW1lQm9hcmQsIGNlbGxIb3ZlcmVkLCBjZWxsQ2xpY2tlZCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC5nYW1lLWJvYXJke1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI1cHgpO1xufVxuXG5ib2R5e1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xufVxuLnBsYXktYXJlYXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiA2MDBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG59XG5cbi5jZWxse1xuICAgIGJhY2tncm91bmQtY29sb3I6IGFxdWE7XG4gICAgbWFyZ2luOiAycHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xufVxuXG4uY2VsbDpob3ZlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbn1cblxuLmNlbGwuc2hpcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcbn1cblxuLmNlbGwubWlzcyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuXG4jb3Jhbmdle1xuICAgIGNvbG9yOiBvcmFuZ2U7XG59XG5cbi5jZWxsLmhpdC1zaGlwe1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuI3JlZHtcbiAgICBjb2xvcjogcmVkO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLGFBQWE7SUFDYix1Q0FBdUM7QUFDM0M7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSx3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksVUFBVTtBQUNkXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5nYW1lLWJvYXJke1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjVweCk7XFxufVxcblxcbmJvZHl7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG59XFxuLnBsYXktYXJlYXtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDYwMHB4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbi5jZWxse1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgICBtYXJnaW46IDJweDtcXG4gICAgaGVpZ2h0OiAyNXB4O1xcbn1cXG5cXG4uY2VsbDpob3ZlcntcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcblxcbi5jZWxsLnNoaXAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbn1cXG5cXG4uY2VsbC5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbn1cXG5cXG4jb3Jhbmdle1xcbiAgICBjb2xvcjogb3JhbmdlO1xcbn1cXG5cXG4uY2VsbC5oaXQtc2hpcHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4jcmVke1xcbiAgICBjb2xvcjogcmVkO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsiY2VsbEhvdmVyZWQiLCJjZWxsQ2xpY2tlZCIsInBsYXllck9uZUdhbWVib2FyZENvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwbGF5ZXJUd29HYW1lYm9hcmRDb250YWluZXIiLCJ1cGRhdGVHYW1lQm9hcmRET00iLCJnYW1lQm9hcmQiLCJpZCIsInBoYW50b21Cb2F0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicGhhbnRvbUJvYXRMZW5ndGgiLCJwaGFudG9tQm9hdFZlcnRpY2FsIiwiaGlkZVNoaXBzIiwic2l6ZSIsInBoYW50b21Cb2F0Q2VsbHMiLCJpIiwicHVzaCIsIngiLCJ5IiwiY2VsbCIsImdyaWQiLCJkb21DZWxsIiwiY2xhc3NOYW1lIiwiZm9yRWFjaCIsInBoYW50b21DZWxsIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2VsbElzSGl0U2hpcCIsImdlbmVyYXRlR2FtZUJvYXJkRE9NIiwicmV0dXJuRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJuZXdDZWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY2xlYXJDaGlsZHJlbiIsImVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwicmVtb3ZlQ2hpbGQiLCJsYXN0Q2hpbGQiLCJnZW5lcmF0ZURPTSIsInBsYXllck9uZSIsInBsYXllclR3byIsInVwZGF0ZURPTSIsIkJPQVJEX1NJWkUiLCJTaGlwIiwiY29uc3RydWN0b3IiLCJpc1ZlcnRpY2FsIiwiaGl0QXJyIiwiQXJyYXkiLCJhcHBseSIsImhpdCIsImxvY2F0aW9uIiwiaXNIaXQiLCJpc1N1bmsiLCJzdW5rIiwiR2FtZUJvYXJkIiwiZmlsbCIsIm1hcCIsInBsYWNlU2hpcCIsImV4aXN0aW5nU2hpcCIsIm5ld1NoaXAiLCJyZWNlaXZlQXR0YWNrIiwic2hpcEF0dGFja2VkIiwic2hpcE9yaWdpbiIsImZpbmRTaGlwQ29vcmRpbmF0ZSIsInNoaXAiLCJqIiwiYWxsU2hpcHNTdW5rIiwiUGxheWVyIiwib3Bwb25lbnQiLCJuYW1lIiwiZ2FtZVRleHQiLCJ3aW5uZXIiLCJjdXJyZW50UGxheWVyIiwiYm9keSIsIndpbmRvdyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJpZ2h0Q2xpY2siLCJib2F0cyIsInJhbmRYIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZFkiLCJwb3AiLCJwbGFjaW5nQm9hdHMiLCJjdXJyZW50SXNWZXJ0aWNhbCIsImlubmVyVGV4dCIsInJhbmRvbUNvb3JkIiwiYWlQbGF5ZXJUdXJuIiwiZXZlbnQiLCJ0YXJnZXQiLCJOdW1iZXIiLCJzbGljZSJdLCJzb3VyY2VSb290IjoiIn0=