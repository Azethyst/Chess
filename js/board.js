class BOARD {
  /**
   * Construct a default board similar to the design at the bottom
   * x = down, y = right
   * -----------------------------------------
   * | WR | WP |    |    |    |    | BP | BR |
   * |----|----|----|----|----|----|----|----|
   * | WH | WP |    |    |    |    | BP | BH |
   * |----|----|----|----|----|----|----|----|
   * | WB | WP |    |    |    |    | BP | BB |
   * |----|----|----|----|----|----|----|----|
   * | WQ | WP |    |    |    |    | BP | BQ |
   * |----|----|----|----|----|----|----|----|
   * | WK | WP |    |    |    |    | BP | BK |
   * |----|----|----|----|----|----|----|----|
   * | WB | WP |    |    |    |    | BP | BB |
   * |----|----|----|----|----|----|----|----|
   * | WH | WP |    |    |    |    | BP | BH |
   * |----|----|----|----|----|----|----|----|
   * | WR | WP |    |    |    |    | BP | BR |
   * -----------------------------------------
   */
  constructor(
    board = [
      [
        new SQUARE(1, 1, "white", "rook"),
        new SQUARE(1, 2, "white", "pawn"),
        new SQUARE(1, 3),
        new SQUARE(1, 4),
        new SQUARE(1, 5),
        new SQUARE(1, 6),
        new SQUARE(1, 7, "black", "pawn"),
        new SQUARE(1, 8, "black", "rook"),
      ],
      [
        new SQUARE(2, 1, "white", "knight"),
        new SQUARE(2, 2, "white", "pawn"),
        new SQUARE(2, 3),
        new SQUARE(2, 4),
        new SQUARE(2, 5),
        new SQUARE(2, 6),
        new SQUARE(2, 7, "black", "pawn"),
        new SQUARE(2, 8, "black", "knight"),
      ],
      [
        new SQUARE(3, 1, "white", "bishop"),
        new SQUARE(3, 2, "white", "pawn"),
        new SQUARE(3, 3),
        new SQUARE(3, 4),
        new SQUARE(3, 5),
        new SQUARE(3, 6),
        new SQUARE(3, 7, "black", "pawn"),
        new SQUARE(3, 8, "black", "bishop"),
      ],
      [
        new SQUARE(4, 1, "white", "queen"),
        new SQUARE(4, 2, "white", "pawn"),
        new SQUARE(4, 3),
        new SQUARE(4, 4),
        new SQUARE(4, 5),
        new SQUARE(4, 6),
        new SQUARE(4, 7, "black", "pawn"),
        new SQUARE(4, 8, "black", "queen"),
      ],
      [
        new SQUARE(5, 1, "white", "king"),
        new SQUARE(5, 2, "white", "pawn"),
        new SQUARE(5, 3),
        new SQUARE(5, 4),
        new SQUARE(5, 5),
        new SQUARE(5, 6),
        new SQUARE(5, 7, "black", "pawn"),
        new SQUARE(5, 8, "black", "king"),
      ],
      [
        new SQUARE(6, 1, "white", "bishop"),
        new SQUARE(6, 2, "white", "pawn"),
        new SQUARE(6, 3),
        new SQUARE(6, 4),
        new SQUARE(6, 5),
        new SQUARE(6, 6),
        new SQUARE(6, 7, "black", "pawn"),
        new SQUARE(6, 8, "black", "bishop"),
      ],
      [
        new SQUARE(7, 1, "white", "knight"),
        new SQUARE(7, 2, "white", "pawn"),
        new SQUARE(7, 3),
        new SQUARE(7, 4),
        new SQUARE(7, 5),
        new SQUARE(7, 6),
        new SQUARE(7, 7, "black", "pawn"),
        new SQUARE(7, 8, "black", "knight"),
      ],
      [
        new SQUARE(8, 1, "white", "rook"),
        new SQUARE(8, 2, "white", "pawn"),
        new SQUARE(8, 3),
        new SQUARE(8, 4),
        new SQUARE(8, 5),
        new SQUARE(8, 6),
        new SQUARE(8, 7, "black", "pawn"),
        new SQUARE(8, 8, "black", "rook"),
      ],
    ],
    selected = null
  ) {
    this.board = board;
    this.selected = selected;
    this.blackKingPos = [5, 8];
    this.whiteKingPos = [5, 1];
    this.turn = true; // white = true, black = false
  }

  getBoardSquare(arr) {
    return this.board[arr[0] - 1][arr[1] - 1];
  }

  control(arr) {
    if (
      (this.turn && this.getBoardSquare(arr).getColor() == "white") ||
      this.getBoardSquare(arr).hasMoves()
    ) {
      this.setSelected(arr);
    } else if (
      (!this.turn && this.getBoardSquare(arr).getColor() == "black") ||
      this.getBoardSquare(arr).hasMoves()
    ) {
      this.setSelected(arr);
    }
    return this.turn;
  }

  setSelected(arr) {
    if (this.getBoardSquare(arr).hasMoves()) {
      if (this.getBoardSquare(this.selected).getPiece() == "king") {
        if (this.getBoardSquare(this.selected).getColor() == "black") {
          this.blackKingPos[0] = arr[0];
          this.blackKingPos[1] = arr[1];
        } else {
          this.whiteKingPos[0] = arr[0];
          this.whiteKingPos[1] = arr[1];
        }
      }
      this.getBoardSquare(arr).movePiece(this.getBoardSquare(this.selected));
      this.removeSelected();
      this.turn = !this.turn;
    } else if (this.selected == null) {
      this.selected = arr;
      this.getBoardSquare(arr).toggleSelected();
      this.displayMoves();
    } else if (this.selected[0] == arr[0] && this.selected[1] == arr[1]) {
      this.removeSelected();
    } else {
      this.removeSelected();
      this.selected = arr;
      this.getBoardSquare(arr).toggleSelected();
      this.displayMoves();
    }
  }

  removeSelected() {
    if (this.selected == null) {
      console.log(
        "Error: The board doesnt have a piece that is currently being selected!"
      );
    } else {
      this.getBoardSquare([
        this.selected[0],
        this.selected[1],
      ]).toggleSelected();
      this.selected = null;
      this.removeMoves();
    }
  }

  /** checks whether the given coordinates is a valid square on the board */
  isValidSquare(arr) {
    if (arr[0] >= 1 && arr[0] <= 8 && arr[1] >= 1 && arr[1] <= 8) {
      return true;
    } else {
      return false;
    }
  }

  pawnMoves(vir_square) {
    if (vir_square.getColor() == "black") {
      var left = [vir_square.getXindex() - 1, vir_square.getYindex() - 1];
      var right = [vir_square.getXindex() + 1, vir_square.getYindex() - 1];
      var forward = [vir_square.getXindex(), vir_square.getYindex() - 1];
      var jump = [vir_square.getXindex(), vir_square.getYindex() - 2];
      var oppColor = "white";
      var tempKingPos = this.blackKingPos;
      var initRow = 7;
    } else if (vir_square.getColor() == "white") {
      var left = [vir_square.getXindex() - 1, vir_square.getYindex() + 1];
      var right = [vir_square.getXindex() + 1, vir_square.getYindex() + 1];
      var forward = [vir_square.getXindex(), vir_square.getYindex() + 1];
      var jump = [vir_square.getXindex(), vir_square.getYindex() + 2];
      var oppColor = "black";
      var tempKingPos = this.whiteKingPos;
      var initRow = 2;
    }

    if (
      this.isValidSquare(forward) &&
      this.getBoardSquare(forward).getColor() != "black" &&
      this.getBoardSquare(forward).getColor() != "white"
    ) {
      if (this.checkMoveValid(vir_square, forward, oppColor, tempKingPos)) {
        this.getBoardSquare(forward).toggleMoves();
      }

      if (vir_square.getYindex() == initRow) {
        if (
          this.isValidSquare(jump) &&
          this.getBoardSquare(jump).getColor() != "black" &&
          this.getBoardSquare(jump).getColor() != "white" &&
          this.checkMoveValid(vir_square, jump, oppColor, tempKingPos)
        ) {
          this.getBoardSquare(jump).toggleMoves();
        }
      }
    }
    if (
      this.isValidSquare(left) &&
      this.getBoardSquare(left).getColor() == oppColor &&
      this.checkMoveValid(vir_square, left, oppColor, tempKingPos)
    ) {
      this.getBoardSquare(left).toggleMoves();
    }
    if (
      this.isValidSquare(right) &&
      this.getBoardSquare(right).getColor() == oppColor &&
      this.checkMoveValid(vir_square, right, oppColor, tempKingPos)
    ) {
      this.getBoardSquare(right).toggleMoves();
    }
  }

  knightMoves(vir_square) {
    const jumps = [
      [vir_square.getXindex() + 1, vir_square.getYindex() + 2],
      [vir_square.getXindex() + 2, vir_square.getYindex() + 1],
      [vir_square.getXindex() + 2, vir_square.getYindex() - 1],
      [vir_square.getXindex() + 1, vir_square.getYindex() - 2],
      [vir_square.getXindex() - 1, vir_square.getYindex() - 2],
      [vir_square.getXindex() - 2, vir_square.getYindex() - 1],
      [vir_square.getXindex() - 2, vir_square.getYindex() + 1],
      [vir_square.getXindex() - 1, vir_square.getYindex() + 2],
    ];
    for (let i = 0; i < jumps.length; i++) {
      if (vir_square.getColor() == "black") {
        if (
          this.isValidSquare(jumps[i]) &&
          this.getBoardSquare(jumps[i]).getColor() != "black" &&
          this.checkMoveValid(vir_square, jumps[i], "white", this.blackKingPos)
        ) {
          this.getBoardSquare(jumps[i]).toggleMoves();
        }
      } else if (vir_square.getColor() == "white") {
        if (
          this.isValidSquare(jumps[i]) &&
          this.getBoardSquare(jumps[i]).getColor() != "white" &&
          this.checkMoveValid(vir_square, jumps[i], "black", this.whiteKingPos)
        ) {
          this.getBoardSquare(jumps[i]).toggleMoves();
        }
      }
    }
  }

  bishopMoves(vir_square) {
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var vir_id = [vir_square.getXindex(), vir_square.getYindex()];
      while (en_seq) {
        if (i == 0) {
          vir_id = [vir_id[0] + 1, vir_id[1] + 1];
        } else if (i == 1) {
          vir_id = [vir_id[0] + 1, vir_id[1] - 1];
        } else if (i == 2) {
          vir_id = [vir_id[0] - 1, vir_id[1] - 1];
        } else {
          vir_id = [vir_id[0] - 1, vir_id[1] + 1];
        }

        if (vir_square.getColor() == "black") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none" &&
            this.checkMoveValid(vir_square, vir_id, "white", this.blackKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "white" &&
            this.checkMoveValid(vir_square, vir_id, "white", this.blackKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (vir_square.getColor() == "white") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none" &&
            this.checkMoveValid(vir_square, vir_id, "black", this.whiteKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "black" &&
            this.checkMoveValid(vir_square, vir_id, "black", this.whiteKingPos)
          ) {
            en_seq = false;
            this.getBoardSquare(vir_id).toggleMoves();
          } else {
            en_seq = false;
          }
        }
      }
    }
  }

  rookMoves(vir_square) {
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var vir_id = [vir_square.getXindex(), vir_square.getYindex()];
      while (en_seq) {
        if (i == 0) {
          vir_id = [vir_id[0], vir_id[1] + 1];
        } else if (i == 1) {
          vir_id = [vir_id[0] + 1, vir_id[1]];
        } else if (i == 2) {
          vir_id = [vir_id[0], vir_id[1] - 1];
        } else {
          vir_id = [vir_id[0] - 1, vir_id[1]];
        }
        if (vir_square.getColor() == "black") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none" &&
            this.checkMoveValid(vir_square, vir_id, "white", this.blackKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "white" &&
            this.checkMoveValid(vir_square, vir_id, "white", this.blackKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (vir_square.getColor() == "white") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none" &&
            this.checkMoveValid(vir_square, vir_id, "black", this.whiteKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "black" &&
            this.checkMoveValid(vir_square, vir_id, "black", this.whiteKingPos)
          ) {
            this.getBoardSquare(vir_id).toggleMoves();
            en_seq = false;
          } else {
            en_seq = false;
          }
        }
      }
    }
  }

  kingMoves(vir_square) {
    const steps = [
      [vir_square.getXindex() + 1, vir_square.getYindex()],
      [vir_square.getXindex() + 1, vir_square.getYindex() + 1],
      [vir_square.getXindex(), vir_square.getYindex() + 1],
      [vir_square.getXindex() - 1, vir_square.getYindex() + 1],
      [vir_square.getXindex() - 1, vir_square.getYindex()],
      [vir_square.getXindex() - 1, vir_square.getYindex() - 1],
      [vir_square.getXindex(), vir_square.getYindex() - 1],
      [vir_square.getXindex() + 1, vir_square.getYindex() - 1],
    ];
    for (let i = 0; i < steps.length; i++) {
      if (vir_square.getColor() == "black") {
        if (
          this.isValidSquare(steps[i]) &&
          this.getBoardSquare(steps[i]).getColor() != "black" &&
          this.checkMoveValid(vir_square, steps[i], "white", steps[i])
        ) {
          this.getBoardSquare(steps[i]).toggleMoves();
        }
      } else if (vir_square.getColor() == "white") {
        if (
          this.isValidSquare(steps[i]) &&
          this.getBoardSquare(steps[i]).getColor() != "white" &&
          this.checkMoveValid(vir_square, steps[i], "black", steps[i])
        ) {
          this.getBoardSquare(steps[i]).toggleMoves();
        }
      }
    }
  }

  queenMoves(vir_square) {
    // NW, NE, SW, SE
    this.bishopMoves(vir_square);
    // N, S, W, E
    this.rookMoves(vir_square);
  }

  displayMoves() {
    const vir_square = this.getBoardSquare([
      this.selected[0],
      this.selected[1],
    ]);

    if (vir_square.getPiece() == "pawn") {
      this.pawnMoves(vir_square);
    } else if (vir_square.getPiece() == "knight") {
      this.knightMoves(vir_square);
    } else if (vir_square.getPiece() == "bishop") {
      this.bishopMoves(vir_square);
    } else if (vir_square.getPiece() == "rook") {
      this.rookMoves(vir_square);
    } else if (vir_square.getPiece() == "king") {
      this.kingMoves(vir_square);
    } else if (vir_square.getPiece() == "queen") {
      this.queenMoves(vir_square);
    }
  }

  removeMoves() {
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        var item = this.getBoardSquare([i, j]);
        if (item.hasMoves()) {
          item.toggleMoves();
        }
      }
    }
  }

  /** arr: is the square where the king might possibly be. color: is the color of the opponents piece that checks your king */
  isSquareChecked(arr, color) {
    const vir_square = this.getBoardSquare(arr);

    // Checks for knights targeting the king
    const jumps = [
      [vir_square.getXindex() + 1, vir_square.getYindex() + 2],
      [vir_square.getXindex() + 2, vir_square.getYindex() + 1],
      [vir_square.getXindex() + 2, vir_square.getYindex() - 1],
      [vir_square.getXindex() + 1, vir_square.getYindex() - 2],
      [vir_square.getXindex() - 1, vir_square.getYindex() - 2],
      [vir_square.getXindex() - 2, vir_square.getYindex() - 1],
      [vir_square.getXindex() - 2, vir_square.getYindex() + 1],
      [vir_square.getXindex() - 1, vir_square.getYindex() + 2],
    ];
    for (let i = 0; i < jumps.length; i++) {
      if (
        this.isValidSquare(jumps[i]) &&
        this.getBoardSquare(jumps[i]).getColor() == color &&
        this.getBoardSquare(jumps[i]).getPiece() == "knight"
      ) {
        return true;
      }
    }

    // Checks for diagonals targeting the king (pawns, bishop, queen, king)
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var vir_id = [vir_square.getXindex(), vir_square.getYindex()];
      var initCheck = true;
      var checkPawn = false;
      while (en_seq) {
        if (i == 0) {
          vir_id = [vir_id[0] + 1, vir_id[1] + 1];
          if (color == "black") {
            checkPawn = true;
          } else if (color == "white") {
            checkPawn = false;
          }
        } else if (i == 1) {
          vir_id = [vir_id[0] + 1, vir_id[1] - 1];
          if (color == "black") {
            checkPawn = false;
          } else if (color == "white") {
            checkPawn = true;
          }
        } else if (i == 2) {
          vir_id = [vir_id[0] - 1, vir_id[1] - 1];
          if (color == "black") {
            checkPawn = false;
          } else if (color == "white") {
            checkPawn = true;
          }
        } else {
          vir_id = [vir_id[0] - 1, vir_id[1] + 1];
          if (color == "black") {
            checkPawn = true;
          } else if (color == "white") {
            checkPawn = false;
          }
        }

        if (color == "black") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            en_seq = true;
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "black"
          ) {
            if (this.getBoardSquare(vir_id).getPiece() == "bishop") {
              return true;
            } else if (this.getBoardSquare(vir_id).getPiece() == "queen") {
              return true;
            }

            if (initCheck) {
              if (this.getBoardSquare(vir_id).getPiece() == "king") {
                return true;
              }
              if (checkPawn) {
                if (this.getBoardSquare(vir_id).getPiece() == "pawn") {
                  return true;
                }
              }
            }
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (color == "white") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            en_seq = true;
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "white"
          ) {
            if (this.getBoardSquare(vir_id).getPiece() == "bishop") {
              return true;
            } else if (this.getBoardSquare(vir_id).getPiece() == "queen") {
              return true;
            }

            if (initCheck) {
              if (this.getBoardSquare(vir_id).getPiece() == "king") {
                return true;
              }
              if (checkPawn) {
                if (this.getBoardSquare(vir_id).getPiece() == "pawn") {
                  return true;
                }
              }
            }
            en_seq = false;
          } else {
            en_seq = false;
          }
        }

        initCheck = false;
      }
    }

    // Checks for horizontal/vertical targeting the king (rook, queen, king)
    for (let i = 0; i < 4; i++) {
      var en_seq = true;
      var vir_id = [vir_square.getXindex(), vir_square.getYindex()];
      var initCheck = true;
      while (en_seq) {
        if (i == 0) {
          vir_id = [vir_id[0], vir_id[1] + 1];
        } else if (i == 1) {
          vir_id = [vir_id[0] + 1, vir_id[1]];
        } else if (i == 2) {
          vir_id = [vir_id[0], vir_id[1] - 1];
        } else {
          vir_id = [vir_id[0] - 1, vir_id[1]];
        }

        if (color == "black") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            en_seq = true;
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "black"
          ) {
            if (this.getBoardSquare(vir_id).getPiece() == "rook") {
              return true;
            } else if (this.getBoardSquare(vir_id).getPiece() == "queen") {
              return true;
            }

            if (initCheck && this.getBoardSquare(vir_id).getPiece() == "king") {
              return true;
            }
            en_seq = false;
          } else {
            en_seq = false;
          }
        } else if (color == "white") {
          if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            en_seq = true;
          } else if (
            this.isValidSquare(vir_id) &&
            this.getBoardSquare(vir_id).getColor() == "white"
          ) {
            if (this.getBoardSquare(vir_id).getPiece() == "rook") {
              return true;
            } else if (this.getBoardSquare(vir_id).getPiece() == "queen") {
              return true;
            }

            if (initCheck && this.getBoardSquare(vir_id).getPiece() == "king") {
              return true;
            }
            en_seq = false;
          } else {
            en_seq = false;
          }
        }

        initCheck = false;
      }
    }
  }

  checkMoveValid(vir_square, targetSquare, opponentColor, kingPos) {
    this.getBoardSquare(targetSquare).setTempColor(vir_square.getColor());
    vir_square.setTempColor("none");

    if (opponentColor == "black") {
      if (this.isSquareChecked(kingPos, opponentColor)) {
        this.getBoardSquare(targetSquare).resetTempColor();
        vir_square.resetTempColor();
        return false;
      } else {
        this.getBoardSquare(targetSquare).resetTempColor();
        vir_square.resetTempColor();
        return true;
      }
    } else if (opponentColor == "white") {
      if (this.isSquareChecked(kingPos, opponentColor)) {
        this.getBoardSquare(targetSquare).resetTempColor();
        vir_square.resetTempColor();
        return false;
      } else {
        this.getBoardSquare(targetSquare).resetTempColor();
        vir_square.resetTempColor();
        return true;
      }
    }
  }
}
