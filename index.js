import {generateFonts} from './src/generate-svg.js';
import {generateCSS} from './src/generate-css.js';
import {unzipIcons} from './src/unzip.js';
import {fixSvg, optimizeSvgs} from './src/optimize-svg.js';
import {generateHtml} from './src/generate-html.js';

export const generateIconFont = async(fontName, zipFilePath, outputFolder = './output') => {
    await unzipIcons(zipFilePath);
    await fixSvg(); // This part is for svg that have stroke instead of fill attribute
    await optimizeSvgs(); // We remove the fill-rule="evenodd" attribute from the SVGs
    const glyphMetadata = await generateFonts(fontName, outputFolder);
    await generateCSS(glyphMetadata, fontName, outputFolder);
    await generateHtml(glyphMetadata, fontName, outputFolder);

    return glyphMetadata;
};
