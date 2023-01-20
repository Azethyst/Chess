const players = ["white", "black"];
var turn = false; // false = white, true = black

const board = document.querySelector(".board");
const squareList = board.querySelectorAll(".square");
const squareTotalNum = squareList.length;
var lastSelection; // the square currently selected
var init = 1;

/** initiates the event listener of the program listening for a click */
for (let i = 0; i < squareTotalNum; i++) {
  const a = squareList[i];
  a.addEventListener("click", function () {
    if (a.classList.contains("moves")) {
      movePiece(this);
    } else {
      turnControl(this);
    }
  });
}

/** controls the turn based on the turn global variable */
function turnControl(square) {
  if (!turn && square.classList.contains("white")) {
    selectorControl(square, "white");
  } else if (turn && square.classList.contains("black")) {
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
  if (piece == "pawn" && color == "black") {                 // white pawn
    const id = square.id;
    const left_id = +id[0] - 1 + " " + (+id[2] - 1);
    const right_id = +id[0] + 1 + " " + (+id[2] - 1);
    const forward_id = +id[0] + " " + (+id[2] - 1);
    const jump_id = +id[0] + " " + (+id[2] - 2);
    if (isValidSquare(forward_id) && !hasColor(forward_id, "black") && !hasColor(forward_id, "white")) {
      document.getElementById(forward_id).classList.toggle("moves");

      if (id[2] == "7") {
        if (isValidSquare(jump_id) && !hasColor(jump_id, "white") && !hasColor(jump_id, "black")) {
          document.getElementById(jump_id).classList.toggle("moves");
        }
      }
    }
    if (isValidSquare(left_id) && hasColor(left_id,"white")) {
      document.getElementById(left_id).classList.toggle("moves");
    }
    if (isValidSquare(right_id) && hasColor(right_id,"white")) {
      document.getElementById(right_id).classList.toggle("moves");
    }
  } else if (piece == "pawn" && color == "white") {         // black pawn
    const id = square.id;
    const left_id = +id[0] - 1 + " " + (+id[2] + 1);
    const right_id = +id[0] + 1 + " " + (+id[2] + 1);
    const forward_id = +id[0] + " " + (+id[2] + 1);
    const jump_id = +id[0] + " " + (+id[2] + 2);
    if (isValidSquare(forward_id) && !hasColor(forward_id, "white") && !hasColor(forward_id, "black")) {
      document.getElementById(forward_id).classList.toggle("moves");

      if (id[2] == "2") {
        if (isValidSquare(jump_id) && !hasColor(jump_id, "black") && !hasColor(jump_id, "white")) {
          document.getElementById(jump_id).classList.toggle("moves");
        }
      }
    }
    if (isValidSquare(left_id) && hasColor(left_id,"black")) {
      document.getElementById(left_id).classList.toggle("moves");
    }
    if (isValidSquare(right_id) && hasColor(right_id,"black")) {
      document.getElementById(right_id).classList.toggle("moves");
    }
  } else if (piece == "knight") {                            // knight
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
      if (color == "black") {
        if (isValidSquare(ids[i]) && !hasColor(ids[i], "black")) {
          document.getElementById(ids[i]).classList.toggle("moves");
        }
      } else if (color == "white") {
        if (isValidSquare(ids[i]) && !hasColor(ids[i], "white")) {
          document.getElementById(ids[i]).classList.toggle("moves");
        }
      }   
    }
  } else if (piece == "bishop") {                            // bishop
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
        if (color == "black") {
          if (isValidSquare(id) && !hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (color == "white") {
          if (isValidSquare(id) && !hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
        }
      }
    }
  } else if (piece == "rook") {                              // rook
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
        if (color == "black") {
          if (isValidSquare(id) && !hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (color == "white") {
          if (isValidSquare(id) && !hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
        }
      }
    }
  } else if (piece == "king") {                             // king
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
      if (color == "black") {
        if (isValidSquare(ids[i]) && !hasColor(ids[i], "black")) {
          document.getElementById(ids[i]).classList.toggle("moves");
        }
      } else if (color == "white") {
        if (isValidSquare(ids[i]) && !hasColor(ids[i], "white")) {
          document.getElementById(ids[i]).classList.toggle("moves");
        }
      }   
    }
  } else if (piece == "queen") {                             // queen
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
        if (color == "black") {
          if (isValidSquare(id) && !hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (color == "white") {
          if (isValidSquare(id) && !hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
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
        if (color == "black") {
          if (isValidSquare(id) && !hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (color == "white") {
          if (isValidSquare(id) && !hasColor(id, "white")) {
            document.getElementById(id).classList.toggle("moves");
          } else if (isValidSquare(id) && hasColor(id, "black")) {
            document.getElementById(id).classList.toggle("moves");
            en_seq = false;
          } else {
            en_seq = false;
          }
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

/** checks whether the square has the specified color */
function hasColor(id, color) {
  if (document.getElementById(id).classList.contains(color)) {
    return true;
  }
  return false;
}

/** lets the user move piece on the board */
function movePiece(square) {
  removeMoves();
  lastSelection.classList.remove("selected");

  // remove the piece thats being eaten if the piece exists
  if (square.classList.contains("black") || square.classList.contains("white")) {
    square.classList.remove(square.classList[2]);
    square.querySelector("i").classList.remove(square.querySelector("i").classList[1]);
  }

  // shift th piece to the targeted square
  square.classList.add(lastSelection.classList[2]);
  square.querySelector("i").classList.add(lastSelection.querySelector("i").classList[1]);

  // remove the piece from its original square
  lastSelection.classList.remove(lastSelection.classList[2]);
  lastSelection.querySelector("i").classList.remove(lastSelection.querySelector("i").classList[1]);

  lastSelection = null;
  init = 1;

  turn = !turn;
  if (turn) {
    document.getElementById("b-span").classList.remove("hidden");
    document.getElementById("w-span").classList.add("hidden");
  } else {
    document.getElementById("w-span").classList.remove("hidden");
    document.getElementById("b-span").classList.add("hidden");
  }
}
