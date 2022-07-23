import { getTotalWidth, TextObject } from "../textAttr";
import { createCanvas } from 'canvas'

const canvas = createCanvas(100, 100);
const ctx = canvas.getContext("2d");

test("getTotalWidth", () => {
    const text: Array<TextObject> = [{
        text: "test",
        font: 'Arial',
        color: 'red'
    }];

    expect( getTotalWidth(ctx, text, 20, 0) ).toBeCloseTo(32, -0.5);
    expect( getTotalWidth(ctx, text, 40, 0) ).toBeCloseTo(64, -0.5);
    expect( getTotalWidth(ctx, text, 60, 0) ).toBeCloseTo(96, -1);
    expect( getTotalWidth(ctx, text, 80, 0) ).toBeCloseTo(128, -1);
    expect( getTotalWidth(ctx, text, 0.1, 0) ).toBeCloseTo(0, 0);

});