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

  playerOneGameboardContainer.appendChild(
    generateGameBoardDOM(playerOne.gameBoard),
  );
  playerTwoGameboardContainer.appendChild(
    generateGameBoardDOM(playerTwo.gameBoard),
  );
}

export { updateDOM };
