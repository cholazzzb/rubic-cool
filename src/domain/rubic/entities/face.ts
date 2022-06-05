export class Face {
  private squares: Array<Array<string>>;
  constructor(name: string) {
    const squares = [];
    for (let r = 0; r < 3; r++) {
      const row = [];
      for (let c = 0; c < 3; c++) {
        row.push(name);
      }
      squares.push(row);
    }
    this.squares = squares;
  }
  rotateC() {
    [
      this.squares[0][0],
      this.squares[0][1],
      this.squares[0][2],
      this.squares[1][0],
      this.squares[1][1],
      this.squares[1][2],
      this.squares[2][0],
      this.squares[2][1],
      this.squares[2][2],
    ] = [
      this.squares[2][0],
      this.squares[1][0],
      this.squares[0][0],
      this.squares[2][1],
      this.squares[1][1],
      this.squares[0][1],
      this.squares[2][2],
      this.squares[1][2],
      this.squares[0][2],
    ];
  }
  rotateCC() {
    [
      this.squares[2][0],
      this.squares[1][0],
      this.squares[0][0],
      this.squares[2][1],
      this.squares[1][1],
      this.squares[0][1],
      this.squares[2][2],
      this.squares[1][2],
      this.squares[0][2],
    ] = [
      this.squares[0][0],
      this.squares[0][1],
      this.squares[0][2],
      this.squares[1][0],
      this.squares[1][1],
      this.squares[1][2],
      this.squares[2][0],
      this.squares[2][1],
      this.squares[2][2],
    ];
  }
  getSquaresByRow(row: number) {
    return this.squares[row];
  }
  getSquaresByCol(col: number) {
    const squares: Array<string> = [];
    for (let r = 0; r < 3; r++) {
      squares.push(this.squares[r][col]);
    }
    return squares;
  }
  setSquaresByRow(row: number, newSquares: Array<string>) {
    this.squares[row] = newSquares;
  }
  setSquaresByCol(col: number, newSquares: Array<string>) {
    for (let r = 0; r < 3; r++) {
      this.squares[r][col] = newSquares[r];
    }
  }
}
