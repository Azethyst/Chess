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
  constructor(selected = null) {
    this.enablePromote();
    this.board = this.boardResetValue();
    this.selected = selected;
    this.blackKingPos = [5, 8];
    this.whiteKingPos = [5, 1];
    this.turn = true; // white = true, black = false
    this.promotionSquare = null;

    this.castleIndicators = {
      blackKing: true,
      rightBlackRook: true,
      leftBlackRook: true,
      whiteKing: true,
      rightWhiteRook: true,
      leftWhiteRook: true,
    };
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

          // Castle King Detect Move
          if (this.selected[0] == 5 && this.selected[1] == 8) {
            this.castleIndicators.blackKing = false;
          }

          // Castle Black King
          if (arr[0] == 3 && arr[1] == 8) {
            this.getBoardSquare([4, 8]).movePiece(this.getBoardSquare([1, 8]));
          } else if (arr[0] == 7 && arr[1] == 8) {
            this.getBoardSquare([6, 8]).movePiece(this.getBoardSquare([8, 8]));
          }
        } else if (this.getBoardSquare(this.selected).getColor() == "white") {
          this.whiteKingPos[0] = arr[0];
          this.whiteKingPos[1] = arr[1];

          // Castle King Detect Move
          if (this.selected[0] == 5 && this.selected[1] == 1) {
            this.castleIndicators.whiteKing = false;
          }

          // Castle White King
          if (arr[0] == 3 && arr[1] == 1) {
            this.getBoardSquare([4, 1]).movePiece(this.getBoardSquare([1, 1]));
          } else if (arr[0] == 7 && arr[1] == 1) {
            this.getBoardSquare([6, 1]).movePiece(this.getBoardSquare([8, 1]));
          }
        }
      }

      // Castle Rook Detect Move
      if (this.getBoardSquare(this.selected).getPiece() == "rook") {
        if (this.getBoardSquare(this.selected).getColor() == "black") {
          if (this.selected[0] == 1 && this.selected[1] == 8) {
            this.castleIndicators.leftBlackRook = false;
          } else if (this.selected[0] == 8 && this.selected[1] == 8) {
            this.castleIndicators.rightBlackRook = false;
          }
        } else if (this.getBoardSquare(this.selected).getColor() == "white") {
          if (this.selected[0] == 1 && this.selected[1] == 1) {
            this.castleIndicators.leftWhiteRook = false;
          } else if (this.selected[0] == 8 && this.selected[1] == 1) {
            this.castleIndicators.rightWhiteRook = false;
          }
        }
      }

      // Promotion
      if (
        this.getBoardSquare(this.selected).getPiece() == "pawn" &&
        arr[1] == 8
      ) {
        this.promotionSquare = arr;
        document.querySelector(".promotion").classList.remove("hidden");
      } else {
        this.getBoardSquare(arr).movePiece(this.getBoardSquare(this.selected));
        this.removeSelected();
      }
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
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            if (
              this.checkMoveValid(
                vir_square,
                vir_id,
                "white",
                this.blackKingPos
              )
            ) {
              this.getBoardSquare(vir_id).toggleMoves();
            }
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
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            if (
              this.checkMoveValid(
                vir_square,
                vir_id,
                "black",
                this.whiteKingPos
              )
            ) {
              this.getBoardSquare(vir_id).toggleMoves();
            }
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
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            if (
              this.checkMoveValid(
                vir_square,
                vir_id,
                "white",
                this.blackKingPos
              )
            ) {
              this.getBoardSquare(vir_id).toggleMoves();
            }
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
            this.getBoardSquare(vir_id).getColor() == "none"
          ) {
            if (
              this.checkMoveValid(
                vir_square,
                vir_id,
                "black",
                this.whiteKingPos
              )
            ) {
              this.getBoardSquare(vir_id).toggleMoves();
            }
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
    console.log("hi from king");
    // Add Castle Moves
    const whiteSquaresLeft = [
      [2, 1],
      [3, 1],
      [4, 1],
    ];
    const whiteSquaresRight = [
      [6, 1],
      [7, 1],
    ];
    const blackSquaresLeft = [
      [2, 8],
      [3, 8],
      [4, 8],
    ];
    const blackSquaresRight = [
      [6, 8],
      [7, 8],
    ];
    // Castle
    if (vir_square.getColor() == "white") {
      // White castle left
      if (this.getBoardSquare(whiteSquaresLeft[0]).getColor() == "none") {
        if (this.getBoardSquare(whiteSquaresLeft[1]).getColor() == "none") {
          if (this.getBoardSquare(whiteSquaresLeft[2]).getColor() == "none") {
            if (
              !this.isSquareChecked(
                [vir_square.getXindex(), vir_square.getYindex()],
                "black"
              )
            ) {
              if (!this.isSquareChecked(whiteSquaresLeft[1], "black")) {
                if (!this.isSquareChecked(whiteSquaresLeft[2], "black")) {
                  if (
                    this.castleIndicators.leftWhiteRook &&
                    this.castleIndicators.whiteKing
                  ) {
                    this.getBoardSquare([3, 1]).toggleMoves();
                  }
                }
              }
            }
          }
        }
      }
      // White castle right
      if (this.getBoardSquare(whiteSquaresRight[0]).getColor() == "none") {
        if (this.getBoardSquare(whiteSquaresRight[1]).getColor() == "none") {
          if (
            !this.isSquareChecked(
              [vir_square.getXindex(), vir_square.getYindex()],
              "black"
            )
          ) {
            if (!this.isSquareChecked(whiteSquaresRight[0], "black")) {
              if (!this.isSquareChecked(whiteSquaresRight[1], "black")) {
                if (
                  this.castleIndicators.rightWhiteRook &&
                  this.castleIndicators.whiteKing
                ) {
                  this.getBoardSquare([7, 1]).toggleMoves();
                }
              }
            }
          }
        }
      }
    } else if (vir_square.getColor() == "black") {
      // Black castle left
      if (this.getBoardSquare(blackSquaresLeft[0]).getColor() == "none") {
        if (this.getBoardSquare(blackSquaresLeft[1]).getColor() == "none") {
          if (this.getBoardSquare(blackSquaresLeft[2]).getColor() == "none") {
            if (
              !this.isSquareChecked(
                [vir_square.getXindex(), vir_square.getYindex()],
                "white"
              )
            ) {
              if (!this.isSquareChecked(blackSquaresLeft[1], "white")) {
                if (!this.isSquareChecked(blackSquaresLeft[2], "white")) {
                  if (
                    this.castleIndicators.leftBlackRook &&
                    this.castleIndicators.blackKing
                  ) {
                    this.getBoardSquare([3, 8]).toggleMoves();
                  }
                }
              }
            }
          }
        }
      }
      // Black castle right
      if (this.getBoardSquare(blackSquaresRight[0]).getColor() == "none") {
        if (this.getBoardSquare(blackSquaresRight[1]).getColor() == "none") {
          if (
            !this.isSquareChecked(
              [vir_square.getXindex(), vir_square.getYindex()],
              "white"
            )
          ) {
            if (!this.isSquareChecked(blackSquaresRight[0], "white")) {
              if (!this.isSquareChecked(blackSquaresRight[1], "white")) {
                if (
                  this.castleIndicators.rightBlackRook &&
                  this.castleIndicators.blackKing
                ) {
                  this.getBoardSquare([7, 8]).toggleMoves();
                }
              }
            }
          }
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

  isCheckMate() {
    var counter = 0;
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        const vir_square = this.getBoardSquare([i, j]);
        if (
          (this.turn && vir_square.getColor() == "white") ||
          (!this.turn && vir_square.getColor() == "black")
        ) {
          if (vir_square.getPiece() == "pawn") {
            // pawn
            if (this.turn) {
              var left = [
                vir_square.getXindex() - 1,
                vir_square.getYindex() + 1,
              ];
              var right = [
                vir_square.getXindex() + 1,
                vir_square.getYindex() + 1,
              ];
              var forward = [
                vir_square.getXindex(),
                vir_square.getYindex() + 1,
              ];
              var jump = [vir_square.getXindex(), vir_square.getYindex() + 2];
              var oppColor = "black";
              var tempKingPos = this.whiteKingPos;
              var initRow = 2;
            } else {
              var left = [
                vir_square.getXindex() - 1,
                vir_square.getYindex() - 1,
              ];
              var right = [
                vir_square.getXindex() + 1,
                vir_square.getYindex() - 1,
              ];
              var forward = [
                vir_square.getXindex(),
                vir_square.getYindex() - 1,
              ];
              var jump = [vir_square.getXindex(), vir_square.getYindex() - 2];
              var oppColor = "white";
              var tempKingPos = this.blackKingPos;
              var initRow = 7;
            }

            if (
              this.isValidSquare(forward) &&
              this.getBoardSquare(forward).getColor() != "black" &&
              this.getBoardSquare(forward).getColor() != "white"
            ) {
              if (
                this.checkMoveValid(vir_square, forward, oppColor, tempKingPos)
              ) {
                counter += 1;
              }

              if (vir_square.getYindex() == initRow) {
                if (
                  this.isValidSquare(jump) &&
                  this.getBoardSquare(jump).getColor() != "black" &&
                  this.getBoardSquare(jump).getColor() != "white" &&
                  this.checkMoveValid(vir_square, jump, oppColor, tempKingPos)
                ) {
                  counter += 1;
                }
              }
            }
            if (
              this.isValidSquare(left) &&
              this.getBoardSquare(left).getColor() == oppColor &&
              this.checkMoveValid(vir_square, left, oppColor, tempKingPos)
            ) {
              counter += 1;
            }
            if (
              this.isValidSquare(right) &&
              this.getBoardSquare(right).getColor() == oppColor &&
              this.checkMoveValid(vir_square, right, oppColor, tempKingPos)
            ) {
              counter += 1;
            }
          } else if (vir_square.getPiece() == "knight") {
            // knight
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
              if (this.turn) {
                if (
                  this.isValidSquare(jumps[i]) &&
                  this.getBoardSquare(jumps[i]).getColor() != "white" &&
                  this.checkMoveValid(
                    vir_square,
                    jumps[i],
                    "black",
                    this.whiteKingPos
                  )
                ) {
                  counter += 1;
                }
              } else {
                if (
                  this.isValidSquare(jumps[i]) &&
                  this.getBoardSquare(jumps[i]).getColor() != "black" &&
                  this.checkMoveValid(
                    vir_square,
                    jumps[i],
                    "white",
                    this.blackKingPos
                  )
                ) {
                  counter += 1;
                }
              }
            }
          } else if (vir_square.getPiece() == "bishop") {
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

                if (this.turn) {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "black",
                        this.whiteKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "black" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "black",
                      this.whiteKingPos
                    )
                  ) {
                    en_seq = false;
                    counter += 1;
                  } else {
                    en_seq = false;
                  }
                } else {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "white",
                        this.blackKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "white" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "white",
                      this.blackKingPos
                    )
                  ) {
                    counter += 1;
                    en_seq = false;
                  } else {
                    en_seq = false;
                  }
                }
              }
            }
          } else if (vir_square.getPiece() == "rook") {
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

                if (this.turn) {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "black",
                        this.whiteKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "black" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "black",
                      this.whiteKingPos
                    )
                  ) {
                    counter += 1;
                    en_seq = false;
                  } else {
                    en_seq = false;
                  }
                } else {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "white",
                        this.blackKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "white" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "white",
                      this.blackKingPos
                    )
                  ) {
                    counter += 1;
                    en_seq = false;
                  } else {
                    en_seq = false;
                  }
                }
              }
            }
          } else if (vir_square.getPiece() == "queen") {
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

                if (this.turn) {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "black",
                        this.whiteKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "black" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "black",
                      this.whiteKingPos
                    )
                  ) {
                    en_seq = false;
                    counter += 1;
                  } else {
                    en_seq = false;
                  }
                } else {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "white",
                        this.blackKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "white" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "white",
                      this.blackKingPos
                    )
                  ) {
                    counter += 1;
                    en_seq = false;
                  } else {
                    en_seq = false;
                  }
                }
              }
            }
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

                if (this.turn) {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "black",
                        this.whiteKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "black" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "black",
                      this.whiteKingPos
                    )
                  ) {
                    counter += 1;
                    en_seq = false;
                  } else {
                    en_seq = false;
                  }
                } else {
                  if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "none"
                  ) {
                    if (
                      this.checkMoveValid(
                        vir_square,
                        vir_id,
                        "white",
                        this.blackKingPos
                      )
                    ) {
                      counter += 1;
                    }
                  } else if (
                    this.isValidSquare(vir_id) &&
                    this.getBoardSquare(vir_id).getColor() == "white" &&
                    this.checkMoveValid(
                      vir_square,
                      vir_id,
                      "white",
                      this.blackKingPos
                    )
                  ) {
                    counter += 1;
                    en_seq = false;
                  } else {
                    en_seq = false;
                  }
                }
              }
            }
          } else if (vir_square.getPiece() == "king") {
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
              if (this.turn) {
                if (
                  this.isValidSquare(steps[i]) &&
                  this.getBoardSquare(steps[i]).getColor() != "white" &&
                  this.checkMoveValid(vir_square, steps[i], "black", steps[i])
                ) {
                  counter += 1;
                }
              } else {
                if (
                  this.isValidSquare(steps[i]) &&
                  this.getBoardSquare(steps[i]).getColor() != "black" &&
                  this.checkMoveValid(vir_square, steps[i], "white", steps[i])
                ) {
                  counter += 1;
                }
              }
            }
          }
        }
      }
    }
    if (counter == 0) {
      console.log("check mate true");
      return true;
    } else {
      console.log("check mate false");
      return false;
    }
  }

  boardResetValue() {
    return [
      [
        new SQUARE(1, 1, "white", "rook"),
        new SQUARE(1, 2, "white", "pawn"),
        new SQUARE(1, 3, "none", "none"),
        new SQUARE(1, 4, "none", "none"),
        new SQUARE(1, 5, "none", "none"),
        new SQUARE(1, 6, "none", "none"),
        new SQUARE(1, 7, "black", "pawn"),
        new SQUARE(1, 8, "black", "rook"),
      ],
      [
        new SQUARE(2, 1, "white", "knight"),
        new SQUARE(2, 2, "white", "pawn"),
        new SQUARE(2, 3, "none", "none"),
        new SQUARE(2, 4, "none", "none"),
        new SQUARE(2, 5, "none", "none"),
        new SQUARE(2, 6, "none", "none"),
        new SQUARE(2, 7, "black", "pawn"),
        new SQUARE(2, 8, "black", "knight"),
      ],
      [
        new SQUARE(3, 1, "white", "bishop"),
        new SQUARE(3, 2, "white", "pawn"),
        new SQUARE(3, 3, "none", "none"),
        new SQUARE(3, 4, "none", "none"),
        new SQUARE(3, 5, "none", "none"),
        new SQUARE(3, 6, "none", "none"),
        new SQUARE(3, 7, "black", "pawn"),
        new SQUARE(3, 8, "black", "bishop"),
      ],
      [
        new SQUARE(4, 1, "white", "queen"),
        new SQUARE(4, 2, "white", "pawn"),
        new SQUARE(4, 3, "none", "none"),
        new SQUARE(4, 4, "none", "none"),
        new SQUARE(4, 5, "none", "none"),
        new SQUARE(4, 6, "none", "none"),
        new SQUARE(4, 7, "black", "pawn"),
        new SQUARE(4, 8, "black", "queen"),
      ],
      [
        new SQUARE(5, 1, "white", "king"),
        new SQUARE(5, 2, "white", "pawn"),
        new SQUARE(5, 3, "none", "none"),
        new SQUARE(5, 4, "none", "none"),
        new SQUARE(5, 5, "none", "none"),
        new SQUARE(5, 6, "none", "none"),
        new SQUARE(5, 7, "black", "pawn"),
        new SQUARE(5, 8, "black", "king"),
      ],
      [
        new SQUARE(6, 1, "white", "bishop"),
        new SQUARE(6, 2, "white", "pawn"),
        new SQUARE(6, 3, "none", "none"),
        new SQUARE(6, 4, "none", "none"),
        new SQUARE(6, 5, "none", "none"),
        new SQUARE(6, 6, "none", "none"),
        new SQUARE(6, 7, "black", "pawn"),
        new SQUARE(6, 8, "black", "bishop"),
      ],
      [
        new SQUARE(7, 1, "white", "knight"),
        new SQUARE(7, 2, "white", "pawn"),
        new SQUARE(7, 3, "none", "none"),
        new SQUARE(7, 4, "none", "none"),
        new SQUARE(7, 5, "none", "none"),
        new SQUARE(7, 6, "none", "none"),
        new SQUARE(7, 7, "black", "pawn"),
        new SQUARE(7, 8, "black", "knight"),
      ],
      [
        new SQUARE(8, 1, "white", "rook"),
        new SQUARE(8, 2, "white", "pawn"),
        new SQUARE(8, 3, "none", "none"),
        new SQUARE(8, 4, "none", "none"),
        new SQUARE(8, 5, "none", "none"),
        new SQUARE(8, 6, "none", "none"),
        new SQUARE(8, 7, "black", "pawn"),
        new SQUARE(8, 8, "black", "rook"),
      ],
    ];
  }

  reset() {
    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        const html_square = document.getElementById(i + " " + j);

        html_square.classList.remove("none");
        html_square.classList.remove("white");
        html_square.classList.remove("black");

        const html_piece = html_square.querySelector("i");
        html_piece.classList.remove("fa-chess-pawn");
        html_piece.classList.remove("fa-chess-knight");
        html_piece.classList.remove("fa-chess-bishop");
        html_piece.classList.remove("fa-chess-rook");
        html_piece.classList.remove("fa-chess-queen");
        html_piece.classList.remove("fa-chess-king");
      }
    }
    this.board = null;
    this.board = this.boardResetValue();
    this.selected = null;
    this.blackKingPos = [5, 8];
    this.whiteKingPos = [5, 1];
    this.turn = true; // white = true, black = false

    this.castleIndicators = {
      blackKing: true,
      rightBlackRook: true,
      leftBlackRook: true,
      whiteKing: true,
      rightWhiteRook: true,
      leftWhiteRook: true,
    };
  }

  enablePromote() {
    document.querySelector(".promote-queen").addEventListener("click", () => {
      this.getBoardSquare(this.selected).setPiece("queen");
      document.querySelector(".promotion").classList.add("hidden");
      this.getBoardSquare(this.promotionSquare).movePiece(
        this.getBoardSquare(this.selected)
      );
      this.removeSelected();
      this.promotionSquare = null;
    });
    document.querySelector(".promote-knight").addEventListener("click", () => {
      this.getBoardSquare(this.selected).setPiece("knight");
      document.querySelector(".promotion").classList.add("hidden");
      this.getBoardSquare(this.promotionSquare).movePiece(
        this.getBoardSquare(this.selected)
      );
      this.removeSelected();
      this.promotionSquare = null;
    });
    document.querySelector(".promote-bishop").addEventListener("click", () => {
      this.getBoardSquare(this.selected).setPiece("bishop");
      document.querySelector(".promotion").classList.add("hidden");
      this.getBoardSquare(this.promotionSquare).movePiece(
        this.getBoardSquare(this.selected)
      );
      this.removeSelected();
      this.promotionSquare = null;
    });
    document.querySelector(".promote-rook").addEventListener("click", () => {
      this.getBoardSquare(this.selected).setPiece("rook");
      document.querySelector(".promotion").classList.add("hidden");
      this.getBoardSquare(this.promotionSquare).movePiece(
        this.getBoardSquare(this.selected)
      );
      this.removeSelected();
      this.promotionSquare = null;
    });
  }
}
