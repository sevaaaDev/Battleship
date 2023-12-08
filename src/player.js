export function computer(gameboard, x, y) {
  if (gameboard.board[x][y] === "hit") {
    attackRandom(gameboard);
    return;
  }
  gameboard.receiveAttack(x, y);
}

function attackRandom(gameboard) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  computer(gameboard, x, y);
}
