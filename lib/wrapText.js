import paintText from './paintText.js'; 
import { getTotalWidth } from './textAttr.js';

/**
 * Get lines of text that fit in the box
 * @param {ctx} ctx Canvas context
 * @param {object} text Text to be displayed in the text box
 * @param {number} fontSize Font size of the text
 * @param {number} width Width of the text
 * @returns 
 */
function getLines(ctx, text, width, fontSize) {

    let spaceWidth = fontSize / 4;
    
    // Generate the lines
    let lines = [];
    let line = [];
    for (let i = 0; i < text.length; i++) {
        
        let splitText = text[i].text.split(' ');

        for (let j = 0; j < splitText.length; j++) {

            let textRich = text[i];
            textRich.text = splitText[j];

            // Remove unnecessary info in the object
            textRich = JSON.parse(JSON.stringify(textRich));

            let lineWidth = getTotalWidth(ctx, line, fontSize, spaceWidth);
            let textWidth = getTotalWidth(ctx, [textRich], fontSize, spaceWidth);

            if (lineWidth + textWidth + spaceWidth > width) {
                lines.push(line);
                line = [];
            }

            line.push(textRich);

        }
    }

    lines.push(line);
    return lines;

}

/**
 * Text that adjusts to the size of the canvas, but it wraps
 * @param {ctx} ctx Canvas context
 * @param {int} x X coordinate of the text box
 * @param {int} y Y coordinate of the text box
 * @param {int} width Width of the text box
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @param {string} align Alignment of the text
 */
 function wrapText(ctx, x, y, width, text, fontSize, align=1) {
    
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