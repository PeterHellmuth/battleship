const playerOneGameboardContainer = document.getElementById(
  "player-one-gameboard",
);

const playerTwoGameboardContainer = document.getElementById(
  "player-two-gameboard",
);

function generateGameBoardDOM(gameBoard) {
  const returnElement = document.createElement("div");
  returnElement.classList.add("game-board");
  const { size } = gameBoard;
  for (let y = size - 1; y >= 0; y--) {
    for (let x = 0; x < size; x++) {
      const cell = gameBoard.grid[x][y];
      const newCell = document.createElement("span");
      newCell.classList.add("cell");
      if (cell) {
        newCell.classList.add("ship");
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

function updateDOM(playerOne, playerTwo) {
  clearChildren(playerOneGameboardContainer);
  clearChildren(playerTwoGameboardContainer);

  playerOneGameboardContainer.appendChild(
    generateGameBoardDOM(playerOne.gameBoard),
  );
  playerTwoGameboardContainer.appendChild(
    generateGameBoardDOM(playerTwo.gameBoard),
  );
}

export { updateDOM };
