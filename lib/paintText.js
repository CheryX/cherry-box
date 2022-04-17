class coloredText {
    /**
     * 
     * @param {ctx} ctx Canvas context
     * @param {string} text Text to be displayed
     * @param {int} x X coordinate of the text box
     * @param {int} y Y coordinate of the text box
     * @param {string} font Font name of the text
     */
    constructor(ctx, text, x, y, font) {

        ctx.save();

        text.forEach(({ text, color, shadow }) => {
            ctx.fillStyle = color;
            ctx.font = font;

            if (shadow) {
                let fontSize = parseInt(font.split(' ')[0]); 

                ctx.shadowColor = shadow.color;
                ctx.shadowOffsetX = shadow.x * fontSize / 100;
                ctx.shadowOffsetY = shadow.y * fontSize / 100;
                ctx.shadowBlur = shadow.blur;
            }
            
            ctx.fillText(text, x, y);
            x += ctx.measureText(text).width;
        });

        ctx.restore();
    }

}

export default coloredText;