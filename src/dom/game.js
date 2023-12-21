import styles from "./gameUi.css";

export function displayGame() {
  const body = document.querySelector("body");
  body.innerHTML = `
<h1 class="${styles.title}">Battleship</h1>
<p class="${styles.info}"></p>
<div class="${styles.container}">
  <div class="${styles.playerBoard}">
    <h3 class="${styles.name}">You</h3>
    <div class="${styles.board}"></div>
  </div>
  <button type='button' class='${styles.restartBtn}'>Restart</button>
  <div class="${styles.compBoard}">
    <h3 class="${styles.name}">Enemy</h3>
    <div class="${styles.board}"></div>
  </div>
  <dialog class='${styles.modal}'>
     <h2 class="${styles.title}">Place your Ship</h2>
     <button type='button' class="${styles.button}">Orientation : X</button>
     <div class="${styles.container}">
       <div class='${styles.board}'></div>
     </div> 
     <button type='button' class="${styles.button}" id="start" aria-disabled='true'>Start</button>
  </dialog>
</div>

`;
  // const title = document.createElement("h1");
  // title.innerText = "Battleship";
  // title.classList.add(styles.title);
  // const info = document.createElement("p");
  // info.classList.add(styles.info);
  // const container = document.createElement("div");
  // container.classList.add(styles.container);
  // board("player", container);
  // const restart = document.createElement("button");
  // restart.setAttribute("type", "button");
  // restart.classList.add(styles.restartBtn);
  // restart.innerText = "restart";
  // container.append(restart);
  // board("comp", container);
  // body.append(title, info, container);

  console.log(body);
}
