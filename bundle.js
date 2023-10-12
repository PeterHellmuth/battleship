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
  if (id.slice(0, 9) === "playerOne") {
    if (placingBoats) {
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.updateDOM)(playerOne, playerTwo, [x, y], boats[boats.length - 1], currentIsVertical);
    }
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



.vertical-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.play-area{
    display: flex;
    width: 600px;
    justify-content: space-between;
    text-align: center;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,uCAAuC;AAC3C;;;;AAIA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,YAAY;IACZ,8BAA8B;IAC9B,kBAAkB;AACtB;;AAEA;IACI,sBAAsB;IACtB,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,UAAU;AACd","sourcesContent":[".game-board{\n    display: grid;\n    grid-template-columns: repeat(10, 25px);\n}\n\n\n\n.vertical-container{\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n.play-area{\n    display: flex;\n    width: 600px;\n    justify-content: space-between;\n    text-align: center;\n}\n\n.cell{\n    background-color: aqua;\n    margin: 2px;\n    height: 25px;\n}\n\n.cell:hover{\n    background-color: white;\n}\n\n.cell.ship {\n    background-color: grey;\n}\n\n.cell.miss {\n    background-color: orange;\n}\n\n#orange{\n    color: orange;\n}\n\n.cell.hit-ship{\n    background-color: red;\n}\n\n#red{\n    color: red;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ucG0tc3RhcnRlci10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vbnBtLXN0YXJ0ZXItdGVtcGxhdGUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL25wbS1zdGFydGVyLXRlbXBsYXRlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjZWxsSG92ZXJlZCwgY2VsbENsaWNrZWQgfSBmcm9tIFwiLlwiO1xuXG5jb25zdCBwbGF5ZXJPbmVHYW1lYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJwbGF5ZXItb25lLWdhbWVib2FyZFwiLFxuKTtcblxuY29uc3QgcGxheWVyVHdvR2FtZWJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwicGxheWVyLXR3by1nYW1lYm9hcmRcIixcbik7XG5cbmZ1bmN0aW9uIHVwZGF0ZUdhbWVCb2FyZERPTShcbiAgZ2FtZUJvYXJkLFxuICBpZCxcbiAgcGhhbnRvbUJvYXQgPSBudWxsLFxuICBwaGFudG9tQm9hdExlbmd0aCA9IG51bGwsXG4gIHBoYW50b21Cb2F0VmVydGljYWwgPSBudWxsLFxuICBoaWRlU2hpcHMgPSBudWxsLFxuKSB7XG4gIGNvbnN0IHsgc2l6ZSB9ID0gZ2FtZUJvYXJkO1xuICBjb25zdCBwaGFudG9tQm9hdENlbGxzID0gW107XG5cbiAgaWYgKHBoYW50b21Cb2F0KSB7XG4gICAgaWYgKHBoYW50b21Cb2F0VmVydGljYWwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGhhbnRvbUJvYXRMZW5ndGg7IGkrKykge1xuICAgICAgICBwaGFudG9tQm9hdENlbGxzLnB1c2goW3BoYW50b21Cb2F0WzBdLCBwaGFudG9tQm9hdFsxXSArIGldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaGFudG9tQm9hdExlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBoYW50b21Cb2F0Q2VsbHMucHVzaChbcGhhbnRvbUJvYXRbMF0gKyBpLCBwaGFudG9tQm9hdFsxXV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBnYW1lQm9hcmQuZ3JpZFt4XVt5XTtcbiAgICAgIGNvbnN0IGRvbUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpZCArIHh9OiR7eX1gKTtcbiAgICAgIGRvbUNlbGwuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICBpZiAocGhhbnRvbUJvYXQpIHtcbiAgICAgICAgcGhhbnRvbUJvYXRDZWxscy5mb3JFYWNoKChwaGFudG9tQ2VsbCkgPT4ge1xuICAgICAgICAgIGlmIChwaGFudG9tQ2VsbFswXSA9PT0geCAmJiBwaGFudG9tQ2VsbFsxXSA9PT0geSkge1xuICAgICAgICAgICAgZG9tQ2VsbC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgaWYgKGdhbWVCb2FyZC5jZWxsSXNIaXRTaGlwKHgsIHkpKSB7XG4gICAgICAgICAgZG9tQ2VsbC5jbGFzc0xpc3QuYWRkKFwiaGl0LXNoaXBcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoaGlkZVNoaXBzKSB7XG4gICAgICAgICAgZG9tQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9tQ2VsbC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjZWxsID09PSBmYWxzZSkge1xuICAgICAgICBkb21DZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9tQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlR2FtZUJvYXJkRE9NKGdhbWVCb2FyZCwgaWQsIGhpZGVTaGlwcyA9IG51bGwpIHtcbiAgY29uc3QgcmV0dXJuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHJldHVybkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdhbWUtYm9hcmRcIik7XG4gIGNvbnN0IHsgc2l6ZSB9ID0gZ2FtZUJvYXJkO1xuXG4gIGZvciAobGV0IHkgPSBzaXplIC0gMTsgeSA+PSAwOyB5LS0pIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgICAgY29uc3QgY2VsbCA9IGdhbWVCb2FyZC5ncmlkW3hdW3ldO1xuICAgICAgY29uc3QgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgbmV3Q2VsbC5pZCA9IGAke2lkfSR7eH06JHt5fWA7XG4gICAgICBuZXdDZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgY2VsbEhvdmVyZWQpO1xuICAgICAgbmV3Q2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2VsbENsaWNrZWQpO1xuICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcblxuICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgaWYgKGhpZGVTaGlwcykge1xuICAgICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKFwiZW1wdHlcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2VsbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZChcImVtcHR5XCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuRWxlbWVudC5hcHBlbmRDaGlsZChuZXdDZWxsKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldHVybkVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2hpbGRyZW4oZWxlbWVudCkge1xuICB3aGlsZSAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQubGFzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZURPTShwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBjbGVhckNoaWxkcmVuKHBsYXllck9uZUdhbWVib2FyZENvbnRhaW5lcik7XG4gIGNsZWFyQ2hpbGRyZW4ocGxheWVyVHdvR2FtZWJvYXJkQ29udGFpbmVyKTtcblxuICBwbGF5ZXJPbmVHYW1lYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgZ2VuZXJhdGVHYW1lQm9hcmRET00ocGxheWVyT25lLmdhbWVCb2FyZCwgXCJwbGF5ZXJPbmVcIiksXG4gICk7XG4gIHBsYXllclR3b0dhbWVib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICBnZW5lcmF0ZUdhbWVCb2FyZERPTShwbGF5ZXJUd28uZ2FtZUJvYXJkLCBcInBsYXllclR3b1wiKSxcbiAgKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZURPTShcbiAgcGxheWVyT25lLFxuICBwbGF5ZXJUd28sXG4gIHBoYW50b21Cb2F0ID0gbnVsbCxcbiAgcGhhbnRvbUJvYXRMZW5ndGggPSBudWxsLFxuICBwaGFudG9tQm9hdFZlcnRpY2FsID0gbnVsbCxcbikge1xuICB1cGRhdGVHYW1lQm9hcmRET00oXG4gICAgcGxheWVyT25lLmdhbWVCb2FyZCxcbiAgICBcInBsYXllck9uZVwiLFxuICAgIHBoYW50b21Cb2F0LFxuICAgIHBoYW50b21Cb2F0TGVuZ3RoLFxuICAgIHBoYW50b21Cb2F0VmVydGljYWwsXG4gICk7XG5cbiAgdXBkYXRlR2FtZUJvYXJkRE9NKHBsYXllclR3by5nYW1lQm9hcmQsIFwicGxheWVyVHdvXCIsIG51bGwsIG51bGwsIG51bGwsIHRydWUpO1xufVxuXG5leHBvcnQgeyB1cGRhdGVET00sIGdlbmVyYXRlRE9NIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IHVwZGF0ZURPTSwgZ2VuZXJhdGVET00gfSBmcm9tIFwiLi9kb20uanNcIjtcblxuY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5jbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBpc1ZlcnRpY2FsKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRBcnIgPSBBcnJheS5hcHBseShudWxsLCBBcnJheShsZW5ndGgpKTtcbiAgICB0aGlzLmlzVmVydGljYWwgPSBpc1ZlcnRpY2FsO1xuICB9XG5cbiAgaGl0KGxvY2F0aW9uKSB7XG4gICAgaWYgKGxvY2F0aW9uID49IDAgJiYgbG9jYXRpb24gPCB0aGlzLmhpdEFyci5sZW5ndGgpIHtcbiAgICAgIGlmICghdGhpcy5pc0hpdChsb2NhdGlvbikpIHtcbiAgICAgICAgdGhpcy5oaXRBcnJbbG9jYXRpb25dID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzSGl0KGxvY2F0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0QXJyW2xvY2F0aW9uXTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgdGhpcy5oaXRBcnIuZm9yRWFjaCgoaGl0KSA9PiB7XG4gICAgICBpZiAoaGl0ID09IG51bGwpIHtcbiAgICAgICAgc3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzdW5rO1xuICB9XG59XG5cbmNsYXNzIEdhbWVCb2FyZCB7XG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcbiAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkoc2l6ZSlcbiAgICAgIC5maWxsKG51bGwpXG4gICAgICAubWFwKCgpID0+IG5ldyBBcnJheShzaXplKS5maWxsKG51bGwpKTtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG5cbiAgcGxhY2VTaGlwKHgsIHksIGxlbmd0aCwgaXNWZXJ0aWNhbCA9IHRydWUpIHtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKGxlbmd0aCA+IDAgJiYgbGVuZ3RoICsgeSA8PSB0aGlzLnNpemUpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nU2hpcCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmdyaWRbeF1baV0pIHtcbiAgICAgICAgICAgIGV4aXN0aW5nU2hpcCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFleGlzdGluZ1NoaXApIHtcbiAgICAgICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAobGVuZ3RoLCBpc1ZlcnRpY2FsKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8IHkgKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ncmlkW3hdW2ldID0gbmV3U2hpcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBob3Jpem9udGFsXG4gICAgaWYgKGxlbmd0aCA+IDAgJiYgbGVuZ3RoICsgeCA8PSB0aGlzLnNpemUpIHtcbiAgICAgIGxldCBleGlzdGluZ1NoaXAgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmdyaWRbaV1beV0pIHtcbiAgICAgICAgICBleGlzdGluZ1NoaXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZXhpc3RpbmdTaGlwKSB7XG4gICAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcChsZW5ndGgsIGlzVmVydGljYWwpO1xuICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZ3JpZFtpXVt5XSA9IG5ld1NoaXA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGlmICh0aGlzLmdyaWRbeF1beV0pIHtcbiAgICAgIC8vIHRoZXJlIGlzIGEgc2hpcCBhdCB0aGlzIGxvY2F0aW9uLCBzZW5kIGhpdCBzaWduYWwgYW5kIGNoZWNrIGlmIGl0J3MgYWxyZWFkeSBoaXQuXG4gICAgICBjb25zdCBzaGlwQXR0YWNrZWQgPSB0aGlzLmdyaWRbeF1beV07XG4gICAgICBjb25zdCBzaGlwT3JpZ2luID0gdGhpcy5maW5kU2hpcENvb3JkaW5hdGUoc2hpcEF0dGFja2VkKTtcbiAgICAgIGlmIChzaGlwQXR0YWNrZWQuaXNWZXJ0aWNhbCkge1xuICAgICAgICByZXR1cm4gc2hpcEF0dGFja2VkLmhpdCh5IC0gc2hpcE9yaWdpblsxXSk7XG4gICAgICB9XG4gICAgICAvLyBIb3Jpem9udGFsXG4gICAgICByZXR1cm4gc2hpcEF0dGFja2VkLmhpdCh4IC0gc2hpcE9yaWdpblswXSk7XG4gICAgfVxuICAgIC8vIG5vIHNoaXAsIGNoZWNrIGlmIHdlJ3ZlIGFscmVhZHkgbWlzc2VkIGhlcmUuXG4gICAgaWYgKHRoaXMuZ3JpZFt4XVt5XSA9PSBudWxsKSB7XG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBtaXNzIHJlY29yZGVkXG4gICAgfVxuICAgIHJldHVybiBmYWxzZTsgLy8gYWxyZWFkeSBtaXNzZWQgaGVyZSwgY2FuJ3QgYXR0YWNrIGhlcmUuXG4gIH1cblxuICBjZWxsSXNIaXRTaGlwKHgsIHkpIHtcbiAgICBpZiAodGhpcy5ncmlkW3hdW3ldKSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5ncmlkW3hdW3ldO1xuICAgICAgY29uc3Qgc2hpcE9yaWdpbiA9IHRoaXMuZmluZFNoaXBDb29yZGluYXRlKHNoaXApO1xuICAgICAgaWYgKHNoaXAuaXNWZXJ0aWNhbCkge1xuICAgICAgICByZXR1cm4gc2hpcC5pc0hpdCh5IC0gc2hpcE9yaWdpblsxXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2hpcC5pc0hpdCh4IC0gc2hpcE9yaWdpblswXSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbmRTaGlwQ29vcmRpbmF0ZShzaGlwKSB7XG4gICAgY29uc3QgeyBpc1ZlcnRpY2FsIH0gPSBzaGlwO1xuXG4gICAgaWYgKHNoaXApIHtcbiAgICAgIGlmIChpc1ZlcnRpY2FsKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuc2l6ZTsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncmlkW2ldW2pdID09PSBzaGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbaSwgal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBIb3Jpem9udGFsXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5zaXplOyBqKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncmlkW2ldW2pdID09PSBzaGlwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBbaSwgal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhbGxTaGlwc1N1bmsoKSB7XG4gICAgbGV0IGFsbFNoaXBzU3VuayA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLnNpemU7IGorKykge1xuICAgICAgICBpZiAodGhpcy5ncmlkW2ldW2pdKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmdyaWRbaV1bal0uaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGFsbFNoaXBzU3VuayA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWxsU2hpcHNTdW5rO1xuICB9XG59XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG9wcG9uZW50ID0gbnVsbCwgbmFtZSA9IFwiUGxheWVyXCIpIHtcbiAgICB0aGlzLm9wcG9uZW50ID0gb3Bwb25lbnQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQoQk9BUkRfU0laRSk7XG4gIH1cbn1cblxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcihudWxsLCBcIlBsYXllciBPbmVcIik7XG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgUGxheWVyKHBsYXllck9uZSwgXCJQbGF5ZXIgVHdvXCIpO1xucGxheWVyVHdvLm9wcG9uZW50ID0gcGxheWVyT25lO1xuY29uc3QgZ2FtZVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtdGV4dFwiKTtcbmxldCB3aW5uZXIgPSBmYWxzZTtcbmxldCBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuY29uc3QgeyBib2R5IH0gPSBkb2N1bWVudDtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgKGUpID0+IGUucHJldmVudERlZmF1bHQoKSk7XG5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCByaWdodENsaWNrKTtcblxubGV0IGJvYXRzID0gWzUsIDQsIDMsIDMsIDJdO1xuXG4vLyBBSSBwbGFjZS5cbndoaWxlIChib2F0cy5sZW5ndGggPj0gMSkge1xuICBjb25zdCByYW5kWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpO1xuICBjb25zdCByYW5kWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpO1xuICBjb25zdCBpc1ZlcnRpY2FsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcbiAgaWYgKFxuICAgIHBsYXllclR3by5nYW1lQm9hcmQucGxhY2VTaGlwKFxuICAgICAgcmFuZFgsXG4gICAgICByYW5kWSxcbiAgICAgIGJvYXRzW2JvYXRzLmxlbmd0aCAtIDFdLFxuICAgICAgaXNWZXJ0aWNhbCxcbiAgICApXG4gICkge1xuICAgIGJvYXRzLnBvcCgpO1xuICB9XG59XG5cbmJvYXRzID0gWzUsIDQsIDMsIDMsIDJdO1xubGV0IHBsYWNpbmdCb2F0cyA9IHRydWU7XG5sZXQgY3VycmVudElzVmVydGljYWwgPSB0cnVlO1xuXG5nYW1lVGV4dC5pbm5lclRleHQgPSBcIlBsYWNlIHlvdXIgYm9hdHMsIHJpZ2h0IGNsaWNrIHRvIHJvdGF0ZS5cIjtcblxuZ2VuZXJhdGVET00ocGxheWVyT25lLCBwbGF5ZXJUd28pO1xuXG5mdW5jdGlvbiByYW5kb21Db29yZCgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEJPQVJEX1NJWkUpO1xufVxuXG5mdW5jdGlvbiBhaVBsYXllclR1cm4oKSB7XG4gIGxldCB4ID0gcmFuZG9tQ29vcmQoKTtcbiAgbGV0IHkgPSByYW5kb21Db29yZCgpO1xuICB3aGlsZSAoIXBsYXllck9uZS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KSkge1xuICAgIHggPSByYW5kb21Db29yZCgpO1xuICAgIHkgPSByYW5kb21Db29yZCgpO1xuICB9XG5cbiAgaWYgKHBsYXllck9uZS5nYW1lQm9hcmQuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICB3aW5uZXIgPSBwbGF5ZXJUd287XG4gICAgZ2FtZVRleHQuaW5uZXJUZXh0ID0gXCJQbGF5ZXIgdHdvIHdpbnMhXCI7XG4gIH1cbiAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbn1cblxuZnVuY3Rpb24gY2VsbEhvdmVyZWQoZXZlbnQpIHtcbiAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgeyBpZCB9ID0gY2VsbDtcbiAgY29uc3QgeCA9IE51bWJlcihpZC5zbGljZSg5LCAxMCkpO1xuICBjb25zdCB5ID0gTnVtYmVyKGlkLnNsaWNlKDExLCAxMikpO1xuICBpZiAoaWQuc2xpY2UoMCwgOSkgPT09IFwicGxheWVyT25lXCIpIHtcbiAgICBpZiAocGxhY2luZ0JvYXRzKSB7XG4gICAgICB1cGRhdGVET00oXG4gICAgICAgIHBsYXllck9uZSxcbiAgICAgICAgcGxheWVyVHdvLFxuICAgICAgICBbeCwgeV0sXG4gICAgICAgIGJvYXRzW2JvYXRzLmxlbmd0aCAtIDFdLFxuICAgICAgICBjdXJyZW50SXNWZXJ0aWNhbCxcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNlbGxDbGlja2VkKGV2ZW50KSB7XG4gIGlmICghd2lubmVyKSB7XG4gICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCB7IGlkIH0gPSBjZWxsO1xuICAgIGNvbnN0IHggPSBOdW1iZXIoaWQuc2xpY2UoOSwgMTApKTtcbiAgICBjb25zdCB5ID0gTnVtYmVyKGlkLnNsaWNlKDExLCAxMikpO1xuICAgIGlmIChwbGFjaW5nQm9hdHMpIHtcbiAgICAgIGlmIChpZC5zbGljZSgwLCA5KSA9PT0gXCJwbGF5ZXJPbmVcIikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcGxheWVyT25lLmdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIGJvYXRzW2JvYXRzLmxlbmd0aCAtIDFdLFxuICAgICAgICAgICAgY3VycmVudElzVmVydGljYWwsXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBib2F0cy5wb3AoKTtcbiAgICAgICAgICBpZiAoYm9hdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBwbGFjaW5nQm9hdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIGdhbWVUZXh0LmlubmVyVGV4dCA9IFwiUGxheWVyIG9uZSwgZmlyZSFcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRE9NKHBsYXllck9uZSwgcGxheWVyVHdvKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyT25lKSB7XG4gICAgICBpZiAoaWQuc2xpY2UoMCwgOSkgPT09IFwicGxheWVyVHdvXCIpIHtcbiAgICAgICAgaWYgKHBsYXllclR3by5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KSkge1xuICAgICAgICAgIGlmIChwbGF5ZXJUd28uZ2FtZUJvYXJkLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgICB3aW5uZXIgPSBwbGF5ZXJPbmU7XG4gICAgICAgICAgICBnYW1lVGV4dC5pbm5lclRleHQgPSBcIlBsYXllciBvbmUgd2lucyFcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR3bztcbiAgICAgICAgICAgIGFpUGxheWVyVHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVET00oXG4gICAgICAgICAgICBwbGF5ZXJPbmUsXG4gICAgICAgICAgICBwbGF5ZXJUd28sXG4gICAgICAgICAgICBbeCwgeV0sXG4gICAgICAgICAgICBib2F0c1tib2F0cy5sZW5ndGggLSAxXSxcbiAgICAgICAgICAgIGN1cnJlbnRJc1ZlcnRpY2FsLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmlnaHRDbGljayhldmVudCkge1xuICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCB7IGlkIH0gPSBjZWxsO1xuICBjb25zdCB4ID0gTnVtYmVyKGlkLnNsaWNlKDksIDEwKSk7XG4gIGNvbnN0IHkgPSBOdW1iZXIoaWQuc2xpY2UoMTEsIDEyKSk7XG4gIGlmIChwbGFjaW5nQm9hdHMpIHtcbiAgICBjdXJyZW50SXNWZXJ0aWNhbCA9ICFjdXJyZW50SXNWZXJ0aWNhbDtcbiAgICB1cGRhdGVET00oXG4gICAgICBwbGF5ZXJPbmUsXG4gICAgICBwbGF5ZXJUd28sXG4gICAgICBbeCwgeV0sXG4gICAgICBib2F0c1tib2F0cy5sZW5ndGggLSAxXSxcbiAgICAgIGN1cnJlbnRJc1ZlcnRpY2FsLFxuICAgICk7XG4gIH1cbn1cbmV4cG9ydCB7IFNoaXAsIEdhbWVCb2FyZCwgY2VsbEhvdmVyZWQsIGNlbGxDbGlja2VkIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLmdhbWUtYm9hcmR7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjVweCk7XG59XG5cblxuXG4udmVydGljYWwtY29udGFpbmVye1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnBsYXktYXJlYXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHdpZHRoOiA2MDBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2VsbHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xuICAgIG1hcmdpbjogMnB4O1xuICAgIGhlaWdodDogMjVweDtcbn1cblxuLmNlbGw6aG92ZXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG5cbi5jZWxsLnNoaXAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5jZWxsLm1pc3Mge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcbn1cblxuI29yYW5nZXtcbiAgICBjb2xvcjogb3JhbmdlO1xufVxuXG4uY2VsbC5oaXQtc2hpcHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbiNyZWR7XG4gICAgY29sb3I6IHJlZDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2IsdUNBQXVDO0FBQzNDOzs7O0FBSUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7SUFDWiw4QkFBOEI7SUFDOUIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLFVBQVU7QUFDZFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuZ2FtZS1ib2FyZHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDI1cHgpO1xcbn1cXG5cXG5cXG5cXG4udmVydGljYWwtY29udGFpbmVye1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ucGxheS1hcmVhe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogNjAwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4uY2VsbHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gICAgbWFyZ2luOiAycHg7XFxuICAgIGhlaWdodDogMjVweDtcXG59XFxuXFxuLmNlbGw6aG92ZXJ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uY2VsbC5zaGlwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLmNlbGwubWlzcyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuI29yYW5nZXtcXG4gICAgY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuLmNlbGwuaGl0LXNoaXB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuI3JlZHtcXG4gICAgY29sb3I6IHJlZDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImNlbGxIb3ZlcmVkIiwiY2VsbENsaWNrZWQiLCJwbGF5ZXJPbmVHYW1lYm9hcmRDb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGxheWVyVHdvR2FtZWJvYXJkQ29udGFpbmVyIiwidXBkYXRlR2FtZUJvYXJkRE9NIiwiZ2FtZUJvYXJkIiwiaWQiLCJwaGFudG9tQm9hdCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInBoYW50b21Cb2F0TGVuZ3RoIiwicGhhbnRvbUJvYXRWZXJ0aWNhbCIsImhpZGVTaGlwcyIsInNpemUiLCJwaGFudG9tQm9hdENlbGxzIiwiaSIsInB1c2giLCJ4IiwieSIsImNlbGwiLCJncmlkIiwiZG9tQ2VsbCIsImNsYXNzTmFtZSIsImZvckVhY2giLCJwaGFudG9tQ2VsbCIsImNsYXNzTGlzdCIsImFkZCIsImNlbGxJc0hpdFNoaXAiLCJnZW5lcmF0ZUdhbWVCb2FyZERPTSIsInJldHVybkVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwibmV3Q2VsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImNsZWFyQ2hpbGRyZW4iLCJlbGVtZW50IiwiaGFzQ2hpbGROb2RlcyIsInJlbW92ZUNoaWxkIiwibGFzdENoaWxkIiwiZ2VuZXJhdGVET00iLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJ1cGRhdGVET00iLCJCT0FSRF9TSVpFIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwiaXNWZXJ0aWNhbCIsImhpdEFyciIsIkFycmF5IiwiYXBwbHkiLCJoaXQiLCJsb2NhdGlvbiIsImlzSGl0IiwiaXNTdW5rIiwic3VuayIsIkdhbWVCb2FyZCIsImZpbGwiLCJtYXAiLCJwbGFjZVNoaXAiLCJleGlzdGluZ1NoaXAiLCJuZXdTaGlwIiwicmVjZWl2ZUF0dGFjayIsInNoaXBBdHRhY2tlZCIsInNoaXBPcmlnaW4iLCJmaW5kU2hpcENvb3JkaW5hdGUiLCJzaGlwIiwiaiIsImFsbFNoaXBzU3VuayIsIlBsYXllciIsIm9wcG9uZW50IiwibmFtZSIsImdhbWVUZXh0Iiwid2lubmVyIiwiY3VycmVudFBsYXllciIsImJvZHkiLCJ3aW5kb3ciLCJlIiwicHJldmVudERlZmF1bHQiLCJyaWdodENsaWNrIiwiYm9hdHMiLCJyYW5kWCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJhbmRZIiwicG9wIiwicGxhY2luZ0JvYXRzIiwiY3VycmVudElzVmVydGljYWwiLCJpbm5lclRleHQiLCJyYW5kb21Db29yZCIsImFpUGxheWVyVHVybiIsImV2ZW50IiwidGFyZ2V0IiwiTnVtYmVyIiwic2xpY2UiXSwic291cmNlUm9vdCI6IiJ9