"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLines = exports.wrapText = void 0;
var textAttr_1 = require("./textAttr");
Object.defineProperty(exports, "getLines", { enumerable: true, get: function () { return textAttr_1.getLines; } });
/**
 * Text that adjusts to the size of the canvas, but it wraps
 * @param ctx Canvas context
 * @param x X coordinate of the text box
 * @param y Y coordinate of the text box
 * @param width Width of the text box
 * @param text Text to be displayed in the text box
 * @param fontSize Maximum font size of the text
 * @param align Alignment of the text
 */
function wrapText(ctx, x, y, width, text, fontSize, align) {
    if (align === void 0) { align = 1; }
    ctx.save();
    var lines = (0, textAttr_1.getLines)(ctx, text, width, fontSize);
    var spaceWidth = fontSize / 4;
    for (var i = 0; i < lines.length; i++) {
        var textWidth = (0, textAttr_1.getTotalWidth)(ctx, lines[i], fontSize, spaceWidth);
        switch (align) {
            case 1:
                x += (width - textWidth) / 2;
                break;
            case 2:
                x += width - textWidth;
                break;
            case 3:
                var rawTextWidth = (0, textAttr_1.getTotalWidth)(ctx, lines[i], fontSize);
                spaceWidth = (width - rawTextWidth) / (lines[i].length - 1);
                if (spaceWidth < 4)
                    spaceWidth = 4;
                if (spaceWidth > 30)
                    spaceWidth = 10;
                break;
        }
        (0, textAttr_1.default)(ctx, lines[i], x, y + fontSize * (i + 1), fontSize, spaceWidth);
    }
    ctx.restore();
}
exports.wrapText = wrapText;
