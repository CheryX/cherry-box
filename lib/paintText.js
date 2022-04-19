class coloredText {
    /**
     * 
     * @param {ctx} ctx Canvas context
     * @param {string} text Text to be displayed
     * @param {int} x X coordinate of the text box
     * @param {int} y Y coordinate of the text box
     * @param {string} font Font name of the text
     */
    constructor(ctx, text, x, y, fontSize) {

        ctx.save();

        text.forEach(({ text, color, shadow, font, modifier }) => {

            ctx.fillStyle = color;
            ctx.font = `${modifier} ${fontSize}px ${font}`;

            if (shadow != undefined) {
                ctx.shadowColor = shadow.color;
                ctx.shadowOffsetX = shadow.offset[0] * fontSize / 100;
                ctx.shadowOffsetY = shadow.offset[1] * fontSize / 100;
                ctx.shadowBlur = shadow.blur;
            } else {
                ctx.shadowColor = "transparent";
            }
            
            ctx.fillText(text, x, y);
            x += ctx.measureText(text).width;
        });

        ctx.restore();
    }

}

export default coloredText;