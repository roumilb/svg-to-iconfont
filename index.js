import {generateFonts} from './generate-svg.js';
import {generateCSS} from './generate-css.js';
import {unzipIcons} from './unzip.js';
import {fixSvg, optimizeSvgs} from './optimize-svg.js';
import {generateHtml} from './generate-html.js';

const args = process.argv.slice(2);

const helpMessage = `
Usage: node index.js [font-name]
Also make sure you have the zip file in the root directory named icons.zip
`;

if (args.includes('--help') || args.includes('-h')) {
    console.log(helpMessage);
    process.exit(0);
}

const formatFontName = (unformattedName) => {
    return unformattedName.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
};

const fontName = args[0] ? formatFontName(args[0]) : 'icon';

await unzipIcons();
await fixSvg(); // This part is for svg that have stroke instead of fill attribute
await optimizeSvgs(); // We remove the fill-rule="evenodd" attribute from the SVGs
const glyphMetadata = await generateFonts(fontName);
await generateCSS(glyphMetadata, fontName);
await generateHtml(glyphMetadata, fontName);
