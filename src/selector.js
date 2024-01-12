import mainStyle from "./app/ui/style/gameUi.css";
const select = {
  playerBoard: document.querySelector(
    `${mainStyle.playerBoard} ${mainStyle.board}`,
  ),
  computerBoard: document.querySelector(
    `${mainStyle.compBoard} ${mainStyle.board}`,
  ),
};

export default select;
