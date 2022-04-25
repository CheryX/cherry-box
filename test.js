import { textBox } from "./lib/textBox.js";
import Canvas from "canvas";
import fs from "fs";

const canvas = new Canvas.createCanvas(800, 600);
const ctx = canvas.getContext("2d");

let upperText = [
    {
        text: "This text is in the center of an image",
        color: "white",
        modifier: "bold",
        font: "ubuntu",
        shadow: {
            color: "red",
            offset: [0, 0],
            blur: 10
        }
    }
];
textBox(ctx, 0, 0, canvas.width, canvas.height, upperText, 100, ["middle", "center"])

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out);