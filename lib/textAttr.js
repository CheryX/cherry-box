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

    for (let i = 0; i < text.length; i++) {

        if (text[i].modifier == null) text[i].modifier = '';
        ctx.font = `${text[i].modifier} ${fontSize}px ${text[i].font}`;
        width += ctx.measureText(text[i].text).width + spaceWidth;

    }

    return width - spaceWidth;
}

export { getTotalWidth };