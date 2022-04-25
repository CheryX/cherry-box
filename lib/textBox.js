import paintText from './paintText.js'; 

/**
 * 
 * @param {ctx} ctx Canvas context
 * @param {object} text Text to be displayed in the text box
 * @param {int} fontSize Maximum font size of the text
 * @returns {int} Width of the text
 */
function getTotalWidth(ctx, text, fontSize) {

    let width = 0;
    
    if (typeof text == 'string') {

        ctx.font = fontSize + "px Arial";
        width += ctx.measureText(text).width;

    } else if (typeof text == 'object') {

        text.forEach(({ text, font, modifier }) => {
            ctx.font = modifier + " " + fontSize + "px " + font;
            width += ctx.measureText(text).width;
        });

    }

    return width;
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
function wrapText(ctx, x, y, width, text, fontSize) {

    let lines = [];
    for (let i in text) {

        let line = text[i].text;
        let words = line.split(" ");
        let fitLine = "";
        let wordIndex = 0;
        let textWidth = getTotalWidth(ctx, fitLine, fontSize);

        while (wordIndex + 2 <= words.length) {
            while (getTotalWidth(ctx, fitLine+words[wordIndex], fontSize) <= width) {
                
                if (words[wordIndex] != undefined) {
                    fitLine += words[wordIndex] + " ";
                } else {
                    fitLine += "";
                }

                textWidth = getTotalWidth(ctx, fitLine, fontSize);
                wordIndex++;
            }
            
            lines.push(fitLine);
            fitLine = "";

            console.log(wordIndex, words.length)
        }
    }

    for (let i in lines) {
        let lineObj = [
            {
                text: lines[i],
                color: "white",
                font: "arial"
            }
        ]
        paintText(ctx, lineObj, x, y + (i*fontSize)+fontSize, fontSize);
    }

    console.log(lines)

    ctx.save();

    ctx.restore();

}

export { textBox, getTotalWidth, getTotalHeight, wrapText };
