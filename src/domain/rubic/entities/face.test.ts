import { Face } from "./face";

describe("Face: method getSquares", () => {
  let face: Face;
  beforeEach(() => {
    face = new Face("Front");
  });
  it("getSquaresByCol(0) should return the correct squares", () => {
    expect(face.getSquaresByCol(0)).toEqual(["Front", "Front", "Front"]);
  });
  it("getSquaresByRow(0) should return the correct squares", () => {
    expect(face.getSquaresByRow(0)).toEqual(["Front", "Front", "Front"]);
  });
});

describe("Face: method setSquares", () => {
  let face: Face;
  beforeEach(() => {
    face = new Face("Front");
  });
  it("getSquaresByCol(0) should return the correct squares", () => {
    face.setSquaresByCol(0, ["Back", "Back", "Back"]);
    expect(face.getSquaresByCol(0)).toEqual(["Back", "Back", "Back"]);
  });
  it("getSquaresByRow(0) should return the correct squares", () => {
    face.setSquaresByRow(0, ["Back", "Back", "Back"]);
    expect(face.getSquaresByRow(0)).toEqual(["Back", "Back", "Back"]);
  });
});

describe("Face: method rotate", () => {
  let face: Face;
  beforeEach(() => {
    face = new Face("Front");
  });
  it("should rotate the face clockwise", () => {
    face.setSquaresByRow(0, ["Back", "Back", "Back"]);
    face.rotateC();
    expect(face.getSquaresByRow(0)).toEqual(["Front", "Front", "Back"]);
    expect(face.getSquaresByRow(1)).toEqual(["Front", "Front", "Back"]);
    expect(face.getSquaresByRow(2)).toEqual(["Front", "Front", "Back"]);

    expect(face.getSquaresByCol(0)).toEqual(["Front", "Front", "Front"]);
    expect(face.getSquaresByCol(1)).toEqual(["Front", "Front", "Front"]);
    expect(face.getSquaresByCol(2)).toEqual(["Back", "Back", "Back"]);
  });
  it("should rotate the face counterclocwire", () => {
    face.setSquaresByRow(0, ["Back", "Back", "Back"]);
    face.rotateCC();
    expect(face.getSquaresByRow(0)).toEqual(["Back", "Front", "Front"]);
    expect(face.getSquaresByRow(1)).toEqual(["Back", "Front", "Front"]);
    expect(face.getSquaresByRow(2)).toEqual(["Back", "Front", "Front"]);

    expect(face.getSquaresByCol(0)).toEqual(["Back", "Back", "Back"]);
    expect(face.getSquaresByCol(1)).toEqual(["Front", "Front", "Front"]);
    expect(face.getSquaresByCol(2)).toEqual(["Front", "Front", "Front"]);
  });
});
