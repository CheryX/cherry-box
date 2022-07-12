interface TextObject {
    text: string,
    font: string,
    color?: string,
    modifier?: string, //Bold, italic, etc.
    shadow?: {
        offset: Array<number>,
        color: string,
        blur: number
    }
}

/**
 * Get total width of multiple fonts at once
 * @param ctx Canvas context
 * @param text Text to be displayed in the text box
 * @param fontSize Maximum font size of the text
 * @param spaceWidth Width of the space between words 
 * @returns Width of the text
 */
function getTotalWidth(ctx: CanvasRenderingContext2D, text: Array<TextObject>, fontSize: number, spaceWidth: number=0) {

    let width: number = 0;

    for (let i = 0; i < text.length; i++) {

        if (text[i].modifier == null) text[i].modifier = '';
        ctx.font = `${text[i].modifier} ${fontSize}px ${text[i].font}`;
        width += ctx.measureText(text[i].text).width + spaceWidth;

    }

    return width - spaceWidth;
}


/**
 * Paint text using all the options provided.
 * @param ctx Canvas context
 * @param text Text to be displayed
 * @param x X coordinate of the text box
 * @param y Y coordinate of the text box
 * @param fontSize Font size of the font
 * @param spaceWidth Width of the space between words 
 */
function paintText(ctx: CanvasRenderingContext2D, text: Array<TextObject>, x: number, y: number, fontSize: number, spaceWidth: number=0) {
    
    ctx.save();
    
    for (let i = 0; i < text.length; i++) {

        ctx.fillStyle = `${text[i].color}`
        
        if (text[i].modifier == undefined) text[i].modifier = '';
        ctx.font = `${text[i].modifier} ${fontSize}px ${text[i].font}`;
        
        // if (text[i].shadow) {
            
        //     ctx.shadowColor = text[i].shadow.color;
        //     ctx.shadowOffsetX = text[i].shadow.offset[0] * fontSize / 100;
        //     ctx.shadowOffsetY = text[i].shadow.offset[1] * fontSize / 100;
        //     ctx.shadowBlur = text[i].shadow.blur;
            
        // } else ctx.shadowColor = "transparent";
        
        ctx.fillText(text[i].text, x, y);
        x += ctx.measureText(text[i].text).width + spaceWidth;
        
    }
    
    ctx.restore();
}

/**
 * Get lines of text that fit in the box
 * @param ctx Canvas context
 * @param text Text to be displayed in the text box
 * @param fontSize Font size of the text
 * @param width Width of the text
 * @returns 
 */
function getLines(ctx: CanvasRenderingContext2D, text: Array<TextObject>, width: number, fontSize: number) {

    let spaceWidth = fontSize / 4;
    
    // Generate the lines
    let lines: Array<Array<TextObject>> = [];
    let line: Array<TextObject> = [];
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


export { getTotalWidth, TextObject, getLines };
export default paintText;