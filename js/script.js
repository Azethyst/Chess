const players = ["white", "black"];
var turn = 0; // 0 = white, 1 = black

const board = document.querySelector(".board");
const squareList = board.querySelectorAll(".square");
const squareTotalNum = squareList.length;
var lastSelection; // the square currently selected
var init = 1;

/** initiates the event listener of the program listening for a click */
for (let i = 0; i < squareTotalNum; i++) {
  const a = squareList[i];
  a.addEventListener("click", function () {
    turnControl(this);
  });
}

/** controls the turn based on the turn global variable */
function turnControl(square) {
  if (turn == 0 && square.classList.contains("white")) {
    selectorControl(square, "white");
  } else if (turn == 1 && square.classList.contains("black")) {
    selectorControl(square, "black");
  }
}

/** controls the selected piece on the board */
function selectorControl(square, color) {
  if (square == lastSelection) {
    init = 1;
    square.classList.remove("selected");
    lastSelection = null;
    removeMoves();
  } else {
    if (init == 0) {
      lastSelection.classList.remove("selected");
    } else {
      init = 0;
    }
    square.classList.toggle("selected");
    removeMoves();
    pieceMovement(square, color);
    lastSelection = square;
  }
}

/** Controls and displays the squares of the possible moves in based on the selected piece */
function pieceMovement(square, color) {
  const piece = square.querySelector("i").classList[1].substring(9);
  console.log(piece);
  if (piece == "pawn" && color == "black") {
    const id = square.id;
    const left_id = +id[0] - 1 + " " + (+id[2] - 1);
    const right_id = +id[0] + 1 + " " + (+id[2] - 1);
    if (isValidSquare(left_id)) {
      document.getElementById(left_id).classList.toggle("moves");
    }
    if (isValidSquare(right_id)) {
      document.getElementById(right_id).classList.toggle("moves");
    }
  } else if (piece == "pawn" && color == "white") {
    const id = square.id;
    const left_id = +id[0] - 1 + " " + (+id[2] + 1);
    const right_id = +id[0] + 1 + " " + (+id[2] + 1);
    if (isValidSquare(left_id)) {
      document.getElementById(left_id).classList.toggle("moves");
    }
    if (isValidSquare(right_id)) {
      document.getElementById(right_id).classList.toggle("moves");
    }
  } else if (piece == "knight") {
    const id = square.id;
    const ids = [
      +id[0] + 1 + " " + (+id[2] + 2),
      +id[0] + 2 + " " + (+id[2] + 1),
      +id[0] + 2 + " " + (+id[2] - 1),
      +id[0] + 1 + " " + (+id[2] - 2),
      +id[0] - 1 + " " + (+id[2] - 2),
      +id[0] - 2 + " " + (+id[2] - 1),
      +id[0] - 2 + " " + (+id[2] + 1),
      +id[0] - 1 + " " + (+id[2] + 2),
    ];
    for (let i = 0; i < ids.length; i++) {
      if (isValidSquare(ids[i])) {
        document.getElementById(ids[i]).classList.toggle("moves");
      }
    }
  } else if (piece == "bishop") {
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var id = square.id;
      while (en_seq) {
        if (i == 0) {
          id = +id[0] + 1 + " " + (+id[2] + 1);
        } else if (i == 1) {
          id = +id[0] + 1 + " " + (+id[2] - 1);
        } else if (i == 2) {
          id = +id[0] - 1 + " " + (+id[2] - 1);
        } else {
          id = +id[0] - 1 + " " + (+id[2] + 1);
        }
        if (isValidSquare(id)) {
          document.getElementById(id).classList.toggle("moves");
        } else {
          en_seq = false;
        }
      }
    }
  } else if (piece == "rook") {
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var id = square.id;
      while (en_seq) {
        if (i == 0) {
          id = +id[0] + " " + (+id[2] + 1);
        } else if (i == 1) {
          id = +id[0] + 1 + " " + +id[2];
        } else if (i == 2) {
          id = +id[0] + " " + (+id[2] - 1);
        } else {
          id = +id[0] - 1 + " " + +id[2];
        }
        if (isValidSquare(id)) {
          document.getElementById(id).classList.toggle("moves");
        } else {
          en_seq = false;
        }
      }
    }
  } else if (piece == "king") {
    const id = square.id;
    const ids = [
      +id[0] + 1 + " " + +id[2],
      +id[0] + 1 + " " + (+id[2] + 1),
      +id[0] + " " + (+id[2] + 1),
      +id[0] - 1 + " " + (+id[2] + 1),
      +id[0] - 1 + " " + +id[2],
      +id[0] - 1 + " " + (+id[2] - 1),
      +id[0] + " " + (+id[2] - 1),
      +id[0] + 1 + " " + (+id[2] - 1),
    ];
    for (let i = 0; i < ids.length; i++) {
      if (isValidSquare(ids[i])) {
        document.getElementById(ids[i]).classList.toggle("moves");
      }
    }
  } else if (piece == "queen") {
    // N, S, W, E
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var id = square.id;
      while (en_seq) {
        if (i == 0) {
          id = +id[0] + " " + (+id[2] + 1);
        } else if (i == 1) {
          id = +id[0] + 1 + " " + +id[2];
        } else if (i == 2) {
          id = +id[0] + " " + (+id[2] - 1);
        } else {
          id = +id[0] - 1 + " " + +id[2];
        }
        if (isValidSquare(id)) {
          document.getElementById(id).classList.toggle("moves");
        } else {
          en_seq = false;
        }
      }
    }
    // NW, NE, SW, SE
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var id = square.id;
      while (en_seq) {
        if (i == 0) {
          id = +id[0] + 1 + " " + (+id[2] + 1);
        } else if (i == 1) {
          id = +id[0] + 1 + " " + (+id[2] - 1);
        } else if (i == 2) {
          id = +id[0] - 1 + " " + (+id[2] - 1);
        } else {
          id = +id[0] - 1 + " " + (+id[2] + 1);
        }
        if (isValidSquare(id)) {
          document.getElementById(id).classList.toggle("moves");
        } else {
          en_seq = false;
        }
      }
    }
  }
}

/** removes all the "moves" class of all the squares in the board */
function removeMoves() {
  for (let i = 0; i < squareTotalNum; i++) {
    const a = squareList[i];
    if (a.classList.contains("moves")) {
      a.classList.remove("moves");
    }
  }
}

/** checks whether the square selected on the given id is a valid square within the board */
function isValidSquare(id) {
  if (id.length == 3) {
    if (+id[0] >= 1 && +id[0] <= 8 && +id[2] >= 1 && +id[2] <= 8) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
