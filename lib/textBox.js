import paintText from './paintText.js'; 

/**
 * Get total width of multiple fonts at once
 * @param {ctx} ctx Canvas context
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @param {int} spaceWidth Width of the space between words 
 * @returns {int} Width of the text
 */
function getTotalWidth(ctx, text, fontSize, spaceWidth=0) {

    let width = 0;

    text.forEach(({ text, font, modifier }) => {
        if (modifier == undefined) modifier = '';
        ctx.font = `${modifier} ${fontSize}px ${font}`;
        width += ctx.measureText(text).width + spaceWidth;
    });

    return width - spaceWidth;
}

/**
 * Get total height of multiple fonts at once
 * @param {ctx} ctx Canvas context
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @returns {int} Height of the text
 */
function getTotalHeight(ctx, text, fontSize) {

    let wordsTotal = "";
    text.forEach(({ text, font }) => {
        ctx.font = fontSize + "px " + font;
        wordsTotal += text;
    });
    
    const metrics = ctx.measureText(wordsTotal);
    return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

}

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
function textBox(ctx, x, y, width, height, text, fontSize, align=['middle', 'center']) {

    ctx.save();
    
    // Resize the textbox if the text is too long
    let textWidth = getTotalWidth(ctx, text, fontSize);
    if (textWidth > width) fontSize *= width / textWidth;;

    let textHeight = getTotalHeight(ctx, text, fontSize);
    textWidth = getTotalWidth(ctx, text, fontSize);

    // Calculate the position of the text
    switch (align[0]) {
        case 'top':
            y += textHeight
            break;
        case 'middle':
            y += (textHeight + height) / 2;
            break;
        case 'bottom':
            y += height;
            break;
    }

    switch (align[1]) {
        case 'left':
            x += 0;
            break;
        case 'center':
            x += (width - textWidth) / 2;
            break;
        case 'right':
            x += width - textWidth;
            break;
    }

    paintText(ctx, text, x, y, fontSize);
    ctx.restore()

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
function wrapText(ctx, x, y, width, text, fontSize, align='left') {
    
    ctx.save();

    let lines = [];
    let line = [];
    let spaceWidth = fontSize / 4;

    for (let i in text) {
        
        let splitText = text[i].text.split(' ');

        let j = 0;
        for (j in splitText) {

            let textRich = {
                color: text[i].color,
                text: splitText[j],
                font: text[i].font,
                modifier: text[i].modifier,
                shadow: text[i].shadow
            };

            
            let lineWidth = getTotalWidth(ctx, line, fontSize, spaceWidth);
            let textWidth = getTotalWidth(ctx, [textRich], fontSize, spaceWidth);

            // TODO: Fix this
            if (lineWidth + textWidth + 10 > width) {

                lines.push(line);
                line = [];

            }

            line.push(textRich);

        }
    }
    
    lines.push(line);
    
    
    for (let i in lines) {
        let textWidth = getTotalWidth(ctx, lines[i], fontSize, spaceWidth);

        switch (align) {
            case 'left':
                x += 0;
                break;
            case 'center':
                x += (width - textWidth) / 2;
                break;
            case 'right':
                x += width - textWidth;
                break;
            case 'justify':
                let rawTextWidth = getTotalWidth(ctx, lines[i], fontSize);
                spaceWidth = (width - rawTextWidth) / (lines[i].length - 1);
    
                if (spaceWidth < 4) spaceWidth = 4;
                if (spaceWidth > 30) spaceWidth = 10;
                
                break;
        }

        paintText(ctx, lines[i], x, y+fontSize*(i)+fontSize, fontSize, spaceWidth);
    }

    ctx.restore();

}

export { textBox, getTotalWidth, getTotalHeight, wrapText };