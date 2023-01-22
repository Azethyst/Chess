class SQUARE {
  constructor(xIndex, yIndex, color = "none", piece = "none") {
    this.xIndex = xIndex;
    this.yIndex = yIndex;
    this.square = document.getElementById(this.xIndex + " " + this.yIndex);
    this.selected = false;
    this.moves = false;
    this.prevColor = null;

    // color => "black", "white", "none"
    this.color = color;
    if (this.color != "none") {
      this.square.classList.add(this.color);
    }
    // piece => "rook", bishop", "knight", "queen", "king", "pawn", "none"
    this.piece = piece;
    if (this.piece != "none") {
      this.square.querySelector("i").classList.add("fa-chess-" + this.piece);
    }
  }

  getColor() {
    return this.color;
  }

  getPiece() {
    return this.piece;
  }

  getSquare() {
    return this.square;
  }

  getSquareId() {
    return this.xIndex + " " + this.yIndex;
  }

  getXindex() {
    return this.xIndex;
  }

  getYindex() {
    return this.yIndex;
  }

  setTempColor(tempColor) {
    this.prevColor = this.color;
    this.color = tempColor;
  }

  resetTempColor() {
    this.color = this.prevColor;
    this.prevColor = null;
  }

  setColor(newColor) {
    this.color = newColor;
    if (this.color == "none") {
      this.square.classList.remove(this.square.classList[2]);
    } else {
      this.square.classList.add(newColor);
    }
  }

  setPiece(newPiece) {
    this.piece = newPiece;
    if (newPiece == "none") {
      this.square
        .querySelector("i")
        .classList.remove(this.square.querySelector("i").classList[1]);
    } else {
      this.square.querySelector("i").classList.add("fa-chess-" + newPiece);
    }
  }

  toggleSelected() {
    if (this.selected == false) {
      this.selected = true;
      this.square.classList.add("selected");
    } else {
      this.selected = false;
      this.square.classList.remove("selected");
    }
  }

  toggleMoves() {
    if (this.moves == false) {
      this.moves = true;
      this.square.querySelector(".moves").classList.remove("hidden");
    } else {
      this.moves = false;
      this.square.querySelector(".moves").classList.add("hidden");
    }
  }

  isSelected() {
    return this.selected;
  }

  hasMoves() {
    return this.moves;
  }

  hasPiece() {
    if (this.color != "none" && this.piece != "none") {
      return true;
    } else {
      return false;
    }
  }

  removePiece() {
    if (this.hasPiece()) {
      this.setColor("none");
      this.setPiece("none");
    } else {
      console.log(
        "Error: removePiece() cannot execute since piece does not exist!"
      );
    }
  }

  addPiece(sq) {
    if (!this.hasPiece()) {
      this.setColor(sq.getColor());
      this.setPiece(sq.getPiece());
    } else {
      console.log(
        "Error: addPiece() cannot execute since square already has piece!"
      );
    }
  }

  movePiece(sq) {
    if (sq.hasPiece()) {
      if (this.hasPiece()) {
        this.removePiece();
      }
      this.addPiece(sq);
      sq.removePiece();
    } else {
      console.log(
        "Error: transferPiece() cannot execute since square does not have an existing pieces!"
      );
    }
  }
}
