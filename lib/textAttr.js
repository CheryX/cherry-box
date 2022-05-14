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

export { getTotalWidth, getTotalHeight };