let board = new BOARD();
const size = 8;

for (let i = 1; i <= size; i++) {
  for (let j = 1; j <= size; j++) {
    const square = board.getBoardSquare([i, j]);
    square.getSquare().addEventListener("click", function () {
      board.setSelected([i, j]);
      // if (square.hasMoves()) {
      //   null;
      // } else {
      //   null;
      // }
    });
  }
}
