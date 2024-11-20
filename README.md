# Icon generator

## Install

```bash
npm install @roumi/svg-to-icon-font
```

## Generate a new font

Use the function `generateIconFont(fontName, zipFilePath)` to generate a new font from a zip file containing all the icons in SVG format.

This will generate CSS, Woff, Woff2 files.

To use your new font, you can use the class `[fontName]-[icon-name]` to display an icon.

```javascript
import {generateIconFont} from '@roumi/svg-to-icon-font';

await generateIconFont('icon', '/path/to/icons.zip', '/path/to/output');

// CSS, Woff, Woff2 files are in the output folder
// You also have a icon-list.html file to see all the icons
```

## Font name examples

- `icon` => `<i class="icon-trash"></i>`
- `my-projet` => `<i class="my-projet-trash"></i>`
- `"this is a test"` => `<i class="thisisatest-trash"></i>`
