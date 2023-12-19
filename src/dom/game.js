import styles from "./gameUi.css";

export function displayGame() {
  console.log(styles);
  const body = document.querySelector("body");
  body.innerHTML = "";
  const title = document.createElement("h1");
  title.innerText = "Battleship";
  title.classList.add(styles.title);
  const info = document.createElement("p");
  info.classList.add(styles.info);
  const container = document.createElement("div");
  container.classList.add(styles.container);
  board("player", container);
  const restart = document.createElement("button");
  restart.setAttribute("type", "button");
  restart.classList.add(styles.restartBtn);
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
  userBoard.classList.add(styles[`${name}Board`]);
  nameInfo.innerText = name;
  nameInfo.classList.add(styles.name);
  board.classList.add(styles.board);
  userBoard.append(nameInfo, board);
  container.append(userBoard);
}
