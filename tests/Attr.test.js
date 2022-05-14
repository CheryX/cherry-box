import { getTotalHeight, getTotalWidth } from "../lib/textAttr";
import Canvas from "canvas";

const canvas = Canvas.createCanvas(100, 100);
const ctx = canvas.getContext("2d");

test("getTotalWidth", () => {
    const text = [{ text: "test", font: "Arial" }];

    expect( getTotalWidth(ctx, text, 20, 0) ).toBeCloseTo(32, -0.5);
    expect( getTotalWidth(ctx, text, 40, 0) ).toBeCloseTo(64, -0.5);
    expect( getTotalWidth(ctx, text, 60, 0) ).toBeCloseTo(96, -0.5);
    expect( getTotalWidth(ctx, text, 80, 0) ).toBeCloseTo(128, -0.5);
    expect( getTotalWidth(ctx, text, 0.1, 0) ).toBeCloseTo(0, 0);

});

test("getTotalHeight", () => {
    const text = [{ text: "test", font: "Arial" }];

    expect( getTotalHeight(ctx, text, 20, 0) ).toBeCloseTo(14, -0.5);
    expect( getTotalHeight(ctx, text, 40, 0) ).toBeCloseTo(28, -0.5);
    expect( getTotalHeight(ctx, text, 60, 0) ).toBeCloseTo(41, -0.5);
    expect( getTotalHeight(ctx, text, 80, 0) ).toBeCloseTo(56, -0.5);
    expect( getTotalHeight(ctx, text, 0.1, 0) ).toBeCloseTo(0, 0);

});