/**
 * Paint text using all the options provided.
 * @param {ctx} ctx Canvas context
 * @param {string} text Text to be displayed
 * @param {int} x X coordinate of the text box
 * @param {int} y Y coordinate of the text box
 * @param {string} font Font name of the text
 * @param {number} spaceWidth Width of the space between words 
 */
function paintText(ctx, text, x, y, fontSize, spaceWidth=0) {

    ctx.save();

    for (let i = 0; i < text.length; i++) {

        ctx.fillStyle = text[i].color;
        
        if (text[i].modifier == undefined) text[i].modifier = '';
        ctx.font = `${text[i].modifier} ${fontSize}px ${text[i].font}`;
    
        if (text[i].shadow) {
    
            ctx.shadowColor = text[i].shadow.color;
            ctx.shadowOffsetX = text[i].shadow.offset[0] * fontSize / 100;
            ctx.shadowOffsetY = text[i].shadow.offset[1] * fontSize / 100;
            ctx.shadowBlur = text[i].shadow.blur;
    
        } else ctx.shadowColor = "transparent";
        
        ctx.fillText(text[i].text, x, y);
        x += ctx.measureText(text[i].text).width + spaceWidth;

    }

    ctx.restore();
}

export default paintText;