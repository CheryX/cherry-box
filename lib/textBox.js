import paintText from './paintText.js'; 
import { getTotalWidth } from './textAttr.js';

/**
 * Text that adjusts to the size of the canvas
 * @param {ctx} ctx Canvas context
 * @param {x} x X coordinate of the text box
 * @param {y} y Y coordinate of the text box
 * @param {int} width Width of the text box
 * @param {int} height Height of the text box
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @param {array} align Alignment of the text
 */
function textBox(ctx, x, y, width, height, text, fontSize, align=[1, 1]) {

    ctx.save();
    
    // Resize the textbox if the text is too long
    let textWidth = getTotalWidth(ctx, text, fontSize);
    if (textWidth > width) fontSize *= width / textWidth;;

    textWidth = getTotalWidth(ctx, text, fontSize);

    // Calculate the position of the text
    switch (align[0]) {
        case 0:
            y += fontSize;
            break;
        case 1:
            y += (fontSize + height) / 2;
            break;
        case 2:
            y += height;
            break;
    }

    switch (align[1]) {
        case 1:
            x += (width - textWidth) / 2;
            break;
        case 2:
            x += width - textWidth;
            break;
    }

    paintText(ctx, text, x, y, fontSize);
    ctx.restore();

    return {
        x: x,
        y: y,
        width: textWidth,
        height: fontSize,
    };

}

export { textBox };