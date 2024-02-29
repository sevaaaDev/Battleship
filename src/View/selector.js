// import css from "../style.css";

const select = {
  compBoard: document.querySelector('div[data-board="computer"]'),
  playerBoard: document.querySelector('div[data-board="player"]'),
};

Object.freeze(select);

export default select;
