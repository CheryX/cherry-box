import paintText, { getTotalWidth, TextObject, getLines } from './textAttr';

/**
 * Text that adjusts to the size of the canvas, but it wraps
 * @param ctx Canvas context
 * @param x X coordinate of the text box
 * @param y Y coordinate of the text box
 * @param width Width of the text box
 * @param text Text to be displayed in the text box
 * @param fontSize Maximum font size of the text
 * @param align Alignment of the text
 */
 function wrapText(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, text: Array<TextObject>, fontSize: number, align=1) {
    
    ctx.save();
    
    let lines = getLines(ctx, text, width, fontSize);
    let spaceWidth = fontSize / 4;
    
    for (let i = 0; i < lines.length; i++) {
        let textWidth = getTotalWidth(ctx, lines[i], fontSize, spaceWidth);

        switch (align) {
            case 1:
                x += (width - textWidth) / 2;
                break;
            case 2:
                x += width - textWidth;
                break;
            case 3:
                let rawTextWidth = getTotalWidth(ctx, lines[i], fontSize);
                spaceWidth = (width - rawTextWidth) / (lines[i].length - 1);
    
                if (spaceWidth < 4) spaceWidth = 4;
                if (spaceWidth > 30) spaceWidth = 10;

                break;
        }

        paintText(ctx, lines[i], x, y+fontSize*(i+1), fontSize, spaceWidth);
    }

    ctx.restore();

}

export { wrapText, getLines };