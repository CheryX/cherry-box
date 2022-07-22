# About

cherry-box is a [Node.js](https://nodejs.org/en/about/) package filled with utilities, which are useful for working with [node-canvas](https://github.com/Automattic/node-canvas).

# Example usage

```js
const cb = require("cherry-box")
const Canvas = require("canvas")
const fs = require("fs");

let canvas = Canvas.createCanvas(1000, 200);
let ctx = canvas.getContext('2d');

let text = [
    {
        text: "I like cookies!",
        color: "#ffffff",
        font: "monospace",
        modifier: "bold",
    }
]
cb.textBox(ctx, 0, 0, 1000, 200, text, 200, [1, 1]);

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out); 
```

Using modules:

```js
import { textBox } from "cherry-box";
import { createCanvas } from "canvas";
import fs from "fs";

let canvas = Canvas.createCanvas(1000, 200);
let ctx = canvas.getContext('2d');

let text = [
    {
        text: "I like cookies!",
        color: "#ffffff",
        font: "monospace",
        modifier: "bold",
    }
]
textBox(ctx, 0, 0, 1000, 200, text, 200, [1, 1]);

// Save canvas to file
let out = fs.createWriteStream("./out.png");
let stream = canvas.createPNGStream();
stream.pipe(out); 
```

# Using Typescript

When using textObject you also need to import `TextObject`

```ts
import { textObject } from "cherry-box";

...

let text: TextObject = [
    {
        text: "I like cookies!",
        color: "#ffffff",
        font: "monospace",
        modifier: "bold",
    }
]

...
```

# Documentation

## Popular functions

* [textBox](#textBox) - Align the text to specified width and height, adjust the size of the font so it fits.
* [textSchema](#textSchema) - An easy way to specify text color, font, shadow and more into a JSON object.

## TextObject
TextObject is made of multiple objects. These objects accepts the following values:

name | description | example | type | required
--- | --- | --- | --- | ---
text | Text to be displayed | `Hello world` | string | true
font | Font of the text | `Arial` | string | true
color | Color of the text | `#FFFFFF` | string | true
modifier | Modifier of the text | `bold` | string | false
shadow | Shadow of the text | | object| false

### Shadow schema
Shadow is a JSON object with the following values:

> `x` and `y` offsets are relative to the text size. For example use `x: 10, y: 10`

name | description | example | type | required
--- | --- | --- | --- | ---
color | Color of the shadow | `#FFFFFF` | string | true
blur | Blur of the shadow | `5` | number | true
offset | X and Y offset of the shadow | `[10, 5]` | array | true

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

## textBox

textBox is an easy way to align your text, decrease font size to fit in an area and more.
### textBox Schema

name | description | example | type | required
--- | --- | --- | --- | ---
ctx | Canvas context | | CanvasRenderingContext2D | true
x | X coordinate of the text box | `0` | number | true
y | Y coordinate of the text box | `0` | number | true
width | Width of the text box | `100` | number | true
height | Height of the text box | `100` | number | true
text | Text to be displayed in the text box | | TextObject | true
fontSize | Maximum font size of the text | `100` | number | true
align | Align of the text | `[1,1]` | array | true

### Align values

1. Horizontal: left `0`, center `1`, right `2`
2. Vertical: top `0`, middle `1`, bottom `2`

Example: `[1,1]`

Example use of textBox in your code: 
```js
textBox(ctx, 0, 0, canvas.width, canvas.height-20, upperText, 80, [2,1]);
```

## wrapText

wrapText is a function similar to textBox, but it doesn't just align the text. It also wraps the text to fit in the specified width.

### wrapText Schema

name | description | example | type | required
--- | --- | --- | --- | ---
ctx | Canvas context | | CanvasRenderingContext2D | true
x | X coordinate of the text box | `0` | number | true
y | Y coordinate of the text box | `0` | number | true
width | Width of the text box | `100` | number | true
text | Text to be displayed in the text box | | TextObject | true
fontSize | Maximum font size of the text | `100` | number | true
align | Align of the text | `3` | number | true

### Align values

* left `0`
* center `1`
* right `2`
* justify `3`

Example use of `wrapText` in your code: 
```js
wrapText(ctx, 0, 0, canvas.width, text, 20, 3);
```
