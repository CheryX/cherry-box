import { textBox } from './lib/textBox.js';
import Canvas from "canvas";
import fs from "fs";

let canvas = new Canvas.createCanvas(800, 600);
let ctx = canvas.getContext("2d");

let textSchema = [
    { text: "Hello ", color: "red", font: "Arial", modifier: "bold" },
    { text: "World", color: "green", font: "Arial", modifier: "italic",
        shadow: {
            color: "black",
            offset: [10, 10],
            blur: 10
        }
    },
    { text: " !", color: "red", font: "Arial", modifier: "bold" }
];
let text = textBox(800, 600, textSchema, 200, ["middle", "center"]);
ctx.drawImage(text, 0, 0)

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out);