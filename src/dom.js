import { cellHovered, cellClicked } from ".";

const playerOneGameboardContainer = document.getElementById(
  "player-one-gameboard",
);

const playerTwoGameboardContainer = document.getElementById(
  "player-two-gameboard",
);

function updateGameBoardDOM(
  gameBoard,
  id,
  phantomBoat = null,
  phantomBoatLength = null,
  phantomBoatVertical = null,
  hideShips = null,
) {
  const { size } = gameBoard;
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
        phantomBoatCells.forEach((phantomCell) => {
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

function generateGameBoardDOM(gameBoard, id, hideShips = null) {
  const returnElement = document.createElement("div");
  returnElement.classList.add("game-board");
  const { size } = gameBoard;

  for (let y = size - 1; y >= 0; y--) {
    for (let x = 0; x < size; x++) {
      const cell = gameBoard.grid[x][y];
      const newCell = document.createElement("span");
      newCell.id = `${id}${x}:${y}`;
      newCell.addEventListener("mouseover", cellHovered);
      newCell.addEventListener("click", cellClicked);
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

  playerOneGameboardContainer.appendChild(
    generateGameBoardDOM(playerOne.gameBoard, "playerOne"),
  );
  playerTwoGameboardContainer.appendChild(
    generateGameBoardDOM(playerTwo.gameBoard, "playerTwo"),
  );
}
function updateDOM(
  playerOne,
  playerTwo,
  phantomBoat = null,
  phantomBoatLength = null,
  phantomBoatVertical = null,
) {
  updateGameBoardDOM(
    playerOne.gameBoard,
    "playerOne",
    phantomBoat,
    phantomBoatLength,
    phantomBoatVertical,
  );

  updateGameBoardDOM(playerTwo.gameBoard, "playerTwo", null, null, null, true);
}

export { updateDOM, generateDOM };
