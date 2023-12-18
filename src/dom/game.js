export function displayGame() {
  const body = document.querySelector("body");
  const title = document.createElement("h1");
  title.innerText = "Battleship";
  const info = document.createElement("p");
  info.classList.add("info");
  const container = document.createElement("div");
  container.classList.add("container");
  board("player", container);
  const restart = document.createElement("button");
  restart.setAttribute("type", "button");
  restart.classList.add("restartBtn");
  restart.innerText = "restart";
  container.append(restart);
  board("comp", container);
  body.append(title, info, container);

  console.log(body);
}

function board(name, container) {
  const userBoard = document.createElement("div");
  const board = document.createElement("div");
  const nameInfo = document.createElement("h3");
  userBoard.classList.add(`${name}Board`);
  nameInfo.innerText = name;
  board.classList.add("board");
  userBoard.append(nameInfo, board);
  container.append(userBoard);
}
