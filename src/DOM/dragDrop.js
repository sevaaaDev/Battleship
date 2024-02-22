export function startDrag(e) {
  let currentElement = e.target;
  function moveHandler(e) {}
  document.addEventListener("mousemove", moveHandler);
  function endDrag(e) {
    let targetElement = document.elementFromPoint(e.pageX, e.pageY);
    if (targetElement.dataset.drop) {
      drop(currentElement, targetElement);
    }
    document.removeEventListener("mousemove", moveHandler);
  }
  document.addEventListener("mouseup", endDrag);
}

function drop(currentElement, targetElement) {
  console.log(currentElement);
  console.log(targetElement);
}
