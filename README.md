# About

cherry-box is a [Node.js](https://nodejs.org/en/about/) package filled with utilities, which are useful for working with [node-canvas](https://github.com/Automattic/node-canvas).

# Example usage

```js
import { textBox } from "cherry-box";
import Canvas from "canvas";

let canvas = new Canvas.createCanvas(800, 600);
let ctx = canvas.getContext("2d");

let textSchema = [
    {
        text: "I like cookies!",
        color: "#ff8800",
        font: "Arial",
        modifier: "bold",
        shadow: {
            offset: [10, 10], blur: 5, color: "red"
        },
    }
]
textBox(800, 600, textSchema, 200, ['middle', 'center']);
```

# Documentation

## Popular functions

* [textBox](#textBox) - Align the text to specified width and height, adjust the size of the font so it fits.
* [textSchema](#textSchema) - An easy way to specify text color, font, shadow and more into a JSON object.
## textSchema
Text schema is made of multiple objects. These objects accepts the following values:

name | description | example | type | required
--- | --- | --- | --- | ---
text | Text to be displayed | Hello world | string | true
color | Color of the text | #FFFFFF | string | true
shadow | Shadow of the text | | shadow | false
font | Font of the text | Arial | string | true
modifier | Modifier of the text | bold | string | true

Example text schema:
```js
[
    {
        text: "I like cookies!",
        color: "#ff8800",
        shadow: {
            offset: [10, 10], blur: 5, color: "red"
        },
        font: "Arial",
        modifier: "bold"
    }
]
```

### Shadow schema
Shadow is a JSON object with the following values:

> `x` and `y` offsets are relative to the text size. For example use `x: 10, y: 10` for minecraft font.

name | description | example | type | required
--- | --- | --- | --- | ---
color | Color of the shadow | #FFFFFF | string | true
blur | Blur of the shadow | 5 | number | true
offset | X and Y offset of the shadow | [10, 5] | array | true

## textBox

textBox is an easy way to align your text, decrease font size to fit in an area and more.
### textBox Schema

name | description | example | type | required
--- | --- | --- | --- | ---
x | X position of the textbox | 0 | number | true
y | Y position of the textbox | 0 | number | true
width | Width of the textbox | 100 | number | true
height | Height of the textbox | 100 | number | true
text | Text to be displayed | | textSchema | true
maxFont | Max font size of the text | 100 | number | true
fontName | Font of the text | Arial | string | true
align | Align of the text |  | array | true

### textBox Errors

Code | Description
--- | ---
601 | Text is too big to be displayed

### Align values

1. Horizontal: `left`, `center` or `right`
2. Vertical: `top`, `middle` or `bottom`

Example: `['top', 'middle']`

Example use of textBox in your code: 
```js
textBox(ctx, 0, 0, canvas.width, canvas.height-20, upperText, 80, ["bottom", "center"]);
```

## wrapText

wrapText is a function similar to textBox, but it doesn't just align the text. It also wraps the text to fit in the specified width.

### wrapText Schema

name | description | example | type | required
--- | --- | --- | --- | ---
ctx | Canvas context | | object | true
x | X coordinate of the text box | 0 | number | true
y | Y coordinate of the text box | 0 | number | true
width | Width of the text box | 100 | number | true
text | Text to be displayed | | textSchema | true
fontSize | Font size of the text | 100 | number | true
align | Align of the text | justify | string | true

### Align values

* `left`
* `center`
* `right`
* `justify`

Example use of `wrapText` in your code: 
```js
wrapText(ctx, 0, 0, canvas.width, wrapTextBox, 20, 'justify');
```