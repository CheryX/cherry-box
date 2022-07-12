import paintText, { getTotalWidth, TextObject } from './textAttr';

/**
 * Text that adjusts to the size of the canvas
 * @param ctx Canvas context
 * @param x X coordinate of the text box
 * @param y Y coordinate of the text box
 * @param width Width of the text box
 * @param height Height of the text box
 * @param text Text to be displayed in the text box
 * @param fontSize Maximum font size of the text
 * @param align Alignment of the text
 */
function textBox(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, text: Array<TextObject>, fontSize: number, align=[1, 1]) {

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