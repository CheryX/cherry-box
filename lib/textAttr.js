"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLines = exports.getTotalWidth = void 0;
/**
 * Get total width of multiple fonts at once
 * @param ctx Canvas context
 * @param text Text to be displayed in the text box
 * @param fontSize Maximum font size of the text
 * @param spaceWidth Width of the space between words
 * @returns Width of the text
 */
function getTotalWidth(ctx, text, fontSize, spaceWidth) {
    if (spaceWidth === void 0) { spaceWidth = 0; }
    var width = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i].modifier == null)
            text[i].modifier = '';
        ctx.font = "".concat(text[i].modifier, " ").concat(fontSize, "px ").concat(text[i].font);
        width += ctx.measureText(text[i].text).width + spaceWidth;
    }
    return width - spaceWidth;
}
exports.getTotalWidth = getTotalWidth;
/**
 * Paint text using all the options provided.
 * @param ctx Canvas context
 * @param text Text to be displayed
 * @param x X coordinate of the text box
 * @param y Y coordinate of the text box
 * @param fontSize Font size of the font
 * @param spaceWidth Width of the space between words
 */
function paintText(ctx, text, x, y, fontSize, spaceWidth) {
    var _a, _b;
    if (spaceWidth === void 0) { spaceWidth = 0; }
    ctx.save();
    for (var i = 0; i < text.length; i++) {
        ctx.fillStyle = "".concat(text[i].color);
        if (text[i].modifier == undefined)
            text[i].modifier = '';
        ctx.font = "".concat(text[i].modifier, " ").concat(fontSize, "px ").concat(text[i].font);
        if (text[i].shadow) {
            //If it works, it works, but it still doesn't work (please someone fix this)
            ctx.shadowColor = "".concat((_a = text[i].shadow) === null || _a === void 0 ? void 0 : _a.color);
            //ctx.shadowOffsetX = text[i].shadow?.offset[0] * fontSize / 100;
            //ctx.shadowOffsetY = text[i].shadow?.offset[1] * fontSize / 100;
            ctx.shadowBlur = parseInt("".concat((_b = text[i].shadow) === null || _b === void 0 ? void 0 : _b.blur));
        }
        else
            ctx.shadowColor = "transparent";
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
function getLines(ctx, text, width, fontSize) {
    var spaceWidth = fontSize / 4;
    // Generate the lines
    var lines = [];
    var line = [];
    for (var i = 0; i < text.length; i++) {
        var splitText = text[i].text.split(' ');
        for (var j = 0; j < splitText.length; j++) {
            var textRich = text[i];
            textRich.text = splitText[j];
            // Remove unnecessary info in the object
            textRich = JSON.parse(JSON.stringify(textRich));
            var lineWidth = getTotalWidth(ctx, line, fontSize, spaceWidth);
            var textWidth = getTotalWidth(ctx, [textRich], fontSize, spaceWidth);
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
exports.getLines = getLines;
exports.default = paintText;
