const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const container = document.querySelector(".game-container");
const Gameboard = (() => {
  const gameboard = Array(9);
  for (let i = 0; i < gameboard.length; i++) {
    let div = document.createElement("div");
    div.classList.add("game-object");
    div.dataset.obj = i;
    container.appendChild(div);
  }
  return gameboard;
})();

const objs = document.querySelectorAll(`[data-obj]`);

const GameFlow = (() => {
  for (let i = 0; i < objs.length; i++) {
    objs[i].addEventListener("click", SetMarker);
  }
  function SetMarker(e) {
    let obj = e.target;
    let r = document.querySelector(`:root`);
    let currentClass = "o";
    if (obj.classList.contains("o") || obj.classList.contains("x")) {
      return;
    }
    if (
      r.style.getPropertyValue("--marker") == `"X"` &&
      !obj.classList.contains("o")
    ) {
      r.style.setProperty("--marker", `"O"`);
      obj.classList.add("x");
      currentClass = "x";
      console.log("X");
    } else if (
      r.style.getPropertyValue("--marker") == `"O"` &&
      !obj.classList.contains("x")
    ) {
      obj.classList.add("o");
      r.style.setProperty("--marker", `"X"`);
      currentClass = "o";
    }

    if (checkWin(currentClass)) {
      let modal = document.getElementById("myModal");
      let winner = document.getElementsByClassName("winner")[0];
      modal.style.display = "block";
      winner.innerText = `the winner is ${currentClass}`;
      console.log("winning");
    }
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATION.some((combination) => {
      return combination.every((index) => {
        return objs[index].classList.contains(currentClass);
      });
    });
  }
})();
