import { textBox } from './lib/textBox.js';
import Canvas from "canvas";
import fs from "fs";

let canvas = new Canvas.createCanvas(800, 600);
let ctx = canvas.getContext("2d");

let textSchema = [
    { text: "Hello ", color: "red" },
    { text: "World", color: "green",
        shadow: {
            color: "black",
            offset: [10, 10],
            blur: 10
        }
    },
    { text: " !", color: "red" }
];
let text = textBox(800, 600, textSchema, 200, "Arial");
ctx.drawImage(text, 0, 0)

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out);