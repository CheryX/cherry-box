import paintText from './paintText.js'; 
import Canvas from 'canvas';

function getTotalWidth(ctx, text) {

    let width = 0;
    text.forEach(({ text }) => {
        width += ctx.measureText(text).width;
    });

    return width;
}

function getTotalHeight(ctx, text) {

    let wordsTotal = "";
    text.forEach(({ text }) => wordsTotal += text);

    let metrics = ctx.measureText(wordsTotal);
    return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

}

/**
 * 
 * @param {int} width Width of the text box
 * @param {int} height Height of the text box
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @param {string} fontName Font name of the text
 * @param {array} align Alignment of the text
 */
function textBox (width, height, text, fontSize, fontName, align=['middle', 'center']) {

    // Create a new canvas
    let canvas = new Canvas.createCanvas(width, height);
    let ctx = canvas.getContext('2d');
    
    // Set up the font
    let font = fontSize + "px " + fontName;
    ctx.font = font;
    
    // Resize the textbox if the text is too long
    let textWidth = getTotalWidth(ctx, text);
    if (textWidth > width) fontSize *= width / textWidth;
    ctx.font = fontSize + "px " + fontName;
    font = ctx.font;

    let textHeight = getTotalHeight(ctx, text);
    textWidth = getTotalWidth(ctx, text);

    // Calculate the position of the text
    let x, y;
    if (align[1] === 'center') x = width / 2 - textWidth / 2;
    if (align[1] === 'right') x = width - textWidth;

    if (align[0] === 'top') y = textHeight
    if (align[0] === 'bottom') y = height;
    if (align[0] === 'middle') y = (textHeight + height) / 2;

    new paintText(ctx, text, x, y, font);

    return canvas

}

export { textBox };