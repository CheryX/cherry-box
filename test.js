import { textBox } from "./lib/textBox.js";
import Canvas from "canvas";
import fs from "fs";

let canvas = new Canvas.createCanvas(800, 600);
let ctx = canvas.getContext("2d");

let upperText = [
    {
        text: "test",
        color: "white",
        font: "Impact",
        modifier: "bold",
        shadow: {
            color: "black",
            offset: [0, 0],
            blur: 10
        }
    }
];
textBox(ctx, 5, 10, canvas.width-10, 100, upperText, 200, ["top", "center"]);

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out);