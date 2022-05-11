//import { textBox, wrapText } from "./lib/textBox.js";
import { textBox, wrapText } from "./index.min.js";
import Canvas from "canvas";
import fs from "fs";

const canvas = new Canvas.createCanvas(800, 600);
const ctx = canvas.getContext("2d");

let upperText = [
    {
        text: "POV: Linux user",
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
textBox(ctx, 0, 0, canvas.width, canvas.height-20, upperText, 80, ["bottom", "center"]);

let wrapTextBox = [
    {
        text: "I'd like to interject for a moment, what you reffered to as Linux was in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX. Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called \"Linux\", and many of its users are not aware that it is basically the GNU system, developed by the GNU Project. The Free Software Foundation obviously intends Linux to be free software like any other free program, and whoever works for the Free Software Foundation will do whatever it takes to ensure that the GNU system remains free. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called \"Linux\" distributions are really distributions of GNU/Linux.",
        color: "yellow",
        font: 'Arial',
        modifier: "bold",
        shadow: {
            color: "red",
            offset: [10, 10],
            blur: 10
        }
    }
]
wrapText(ctx, 25, 25, canvas.width-50, wrapTextBox, 20, 'justify');

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out);