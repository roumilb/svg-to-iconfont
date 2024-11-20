# Icon generator

## Generate a new font

1. Put all these icons in SVG format in a zip file, for example on figma select all the icons and export in SVG the fact
2. Put the zip file named "icons.zip" at the root of this project
3. Run the command `node index.js [font-name]` to generate the new font
4. View the new font in the `index.html` file

For `[font-name]` you have to put the name of the font that we will find in the classes to put, here are examples with an icon `trash`:

- `node index.js icon` => `<i class="icon-trash"></i>`
- `node index.js my-projet` => `<i class="my-projet-trash"></i>`
- `node index.js "this is a test"` => `<i class="thisisatest-trash"></i>`
