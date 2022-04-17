import textBox from './lib/textBox.js';
import Canvas from "canvas";
import fs from "fs";

let canvas = new Canvas.createCanvas(800, 600);
let ctx = canvas.getContext("2d");

let text = textBox(800, 600, [{text: "hello world", color: "red"}], 200, "Arial");
ctx.drawImage(text, 0, 0)

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out);