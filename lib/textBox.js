import paintText from './paintText.js'; 

/**
 * 
 * @param {ctx} ctx Canvas context
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @param {int} spaceWidth Width of the space between words 
 * @returns {int} Width of the text
 */
function getTotalWidth(ctx, text, fontSize, spaceWidth=0) {

    let width = 0;

    text.forEach(({ text, font, modifier }) => {
        ctx.font = modifier + " " + fontSize + "px " + font;
        width += ctx.measureText(text).width + spaceWidth;
    });

    return width - spaceWidth;
}

/**
 * 
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
 * 
 * @param {ctx} ctx Canvas context
 * @param {x} x X coordinate of the text box
 * @param {y} y Y coordinate of the text box
 * @param {int} width Width of the text box
 * @param {int} height Height of the text box
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @param {array} align Alignment of the text
 */
function textBox (ctx, x, y, width, height, text, fontSize, align=['middle', 'center']) {

    ctx.save();
    
    // Resize the textbox if the text is too long
    let textWidth = getTotalWidth(ctx, text, fontSize);
    if (textWidth > width) fontSize *= width / textWidth;;

    let textHeight = getTotalHeight(ctx, text, fontSize);
    textWidth = getTotalWidth(ctx, text, fontSize);

    // Calculate the position of the text
    if (align[0] === 'top') y += textHeight
    if (align[0] === 'bottom') y += height;
    if (align[0] === 'middle') y += (textHeight + height) / 2;

    if (align[1] === 'center') x += width / 2 - textWidth / 2;
    if (align[1] === 'right') x += width - textWidth;
    if (align[1] === 'left') x += 0;

    paintText(ctx, text, x, y, fontSize);
    ctx.restore()

}

/**
 * 
 * @param {ctx} ctx Canvas context
 * @param {int} x X coordinate of the text box
 * @param {int} y Y coordinate of the text box
 * @param {int} width Width of the text box
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 */
function wrapText(ctx, x, y, width, text, fontSize, align='left') {
    
    ctx.save();

    let x_ = 0;
    let lines = [];
    let line = [];
    let spaceWidth = 0;

    for (let i in text) {
        
        let splitText = text[i].text.split(' ');

        let j = 0;
        for (j in splitText) {

            let textRich = {
                color: text[i].color,
                text: splitText[j],
                font: text[i].font
            };
            
            ctx.font = fontSize + "px " + text[i].font;
            let wordWidth = ctx.measureText(textRich).width;
            //let wordWidth = getTotalWidth(ctx, [textRich], fontSize, spaceWidth);
            
            if (x_ + wordWidth > width) {

                x_ = 0;
                
                lines.push(line);
                line = [];

            } else {
                x_ += wordWidth;
            }

            line.push(textRich);

        }
    }
    
    lines.push(line);
    
    for (let i in lines) {
        let textWidth = getTotalWidth(ctx, lines[i], fontSize, spaceWidth);

        let x_ = x;
        if (align === 'center') x_ += width / 2 - textWidth / 2;
        if (align === 'right') x_ += width - textWidth;
        if (align === 'left') x_ += 0;

        paintText(ctx, lines[i], x_, y+fontSize*(i)+fontSize, fontSize, spaceWidth);
    }

    ctx.restore();

}

export { textBox, getTotalWidth, getTotalHeight, wrapText };
