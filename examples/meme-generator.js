import { textBox } from "cherry-box";
import Canvas from "canvas";

const canvas = new Canvas.createCanvas(800, 600);
const ctx = canvas.getContext("2d");

let meme = [
    'upper text',
    'lower text'
]

let upperText = [
    {
        text: meme[0],
        color: "white",
        font: "Impact",
        shadow: {
            color: "black",
            offset: [0, 0],
            blur: 10
        }
    }
];

let lowerText = [
    {
        text: meme[1],
        color: "white",
        font: "Impact",
        shadow: {
            color: "black",
            offset: [0, 0],
            blur: 10
        }
    }
];

//Draw text
textBox(ctx, 0, 0, canvas.width, 80, upperText, 80, [1, 1]);
textBox(ctx, 0, canvas.height-80, canvas.width, 80, lowerText, 80, [1, 1]);