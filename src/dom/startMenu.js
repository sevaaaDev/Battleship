import { displayGame } from "./game";
import styles from "./startMenuUi.css";
export function startMenu() {
  const body = document.querySelector("body");
  body.innerHTML = `
<div class=${styles.container}>
<h1 class=${styles.title}>Battleship</h1>
<button type="button" class=${styles.start}>Start</button>
</div>
`;
}
