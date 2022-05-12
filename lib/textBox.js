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
        //nice
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
    
    for (let i = 0; i < lines.length; i++) {
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

        paintText(ctx, lines[i], x, y+fontSize*(i+1), fontSize, spaceWidth);
    }

    ctx.restore();

}

export { textBox, getTotalWidth, getTotalHeight, wrapText };