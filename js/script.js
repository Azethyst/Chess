const players = ["white", "black"];
var turn = 0;  // 0 = white, 1 = black

const board = document.querySelector(".board");
const iconList = board.querySelectorAll(".black,.white");
const iconTotalNumn = iconList.length;
const squareList = board.querySelectorAll(".square");
const squareTotalNum = squareList.length;
var lastSelection;  // the square currently selected
var init = 1;

for (let i = 0; i < squareTotalNum; i++ ) {
    const a = squareList[i].querySelector("i");
    a.addEventListener("click", function () {
        if (init == 0) {
            lastSelection.classList.remove("selected");
        } else {
            init = 0;
        }
        this.classList.toggle("selected");
        lastSelection = this;
    })
}

