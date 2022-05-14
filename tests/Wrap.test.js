import { getLines } from "../lib/wrapText";
import Canvas from "canvas";

const canvas = Canvas.createCanvas(100, 100);
const ctx = canvas.getContext("2d");

test("getLines", () => {

    let text = [{
        text: "I'd like to interject for a moment, what you reffered to as Linux was in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX. Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called \"Linux\", and many of its users are not aware that it is basically the GNU system, developed by the GNU Project. The Free Software Foundation obviously intends Linux to be free software like any other free program, and whoever works for the Free Software Foundation will do whatever it takes to ensure that the GNU system remains free. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called \"Linux\" distributions are really distributions of GNU/Linux.",
        font: 'Arial',
    }]

    let lines = getLines(ctx, text, 1000, 20);
    expect(lines.length).toBe(13);
    expect(lines[0]).toStrictEqual([
        { text: "I'd", font: 'Arial' },
        { text: 'like', font: 'Arial' },
        { text: 'to', font: 'Arial' },
        { text: 'interject', font: 'Arial' },
        { text: 'for', font: 'Arial' },
        { text: 'a', font: 'Arial' },
        { text: 'moment,', font: 'Arial' },
        { text: 'what', font: 'Arial' },
        { text: 'you', font: 'Arial' },
        { text: 'reffered', font: 'Arial' },
        { text: 'to', font: 'Arial' },
        { text: 'as', font: 'Arial' },
        { text: 'Linux', font: 'Arial' },
        { text: 'was', font: 'Arial' },
        { text: 'in', font: 'Arial' },
        { text: 'fact,', font: 'Arial' },
        { text: 'GNU/Linux,', font: 'Arial' },
        { text: 'or', font: 'Arial' },
        { text: 'as', font: 'Arial' },
        { text: "I've", font: 'Arial' },
        { text: 'recently', font: 'Arial' },
        { text: 'taken', font: 'Arial' },
        { text: 'to', font: 'Arial' }
    ]);

});