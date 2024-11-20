import fs from 'fs/promises';
import path from 'path';
import {createReadStream, createWriteStream} from 'fs';
import {SVGIcons2SVGFontStream} from 'svgicons2svgfont';
import svg2ttf from 'svg2ttf';
import ttf2woff from 'ttf2woff';
import ttf2woff2 from 'ttf2woff2';
import {deleteIconFolder} from './unzip.js';


const iconsDirectory = './icons';


export const generateFonts = async(fontName, outputFolder) => {
    const outputFontFile = `${outputFolder}/${fontName}.svg`;
    const outputTTFFile = `${outputFolder}/${fontName}.ttf`;
    const outputWOFFFile = `${outputFolder}/${fontName}.woff`;
    const outputWOFF2File = `${outputFolder}/${fontName}.woff2`;
    const filesToDelete = [
        outputFontFile,
        outputTTFFile
    ];

    try {
        // Ensure output directory exists
        await fs.mkdir(path.dirname(outputFontFile), {recursive: true});

        // Step 1: Generate SVG Font
        const outputStream = createWriteStream(outputFontFile);

        const fontStream = new SVGIcons2SVGFontStream({
            fontName,
            normalize: true,
            fontHeight: 1024
        });

        fontStream.pipe(outputStream)
                  .on('finish', () => {
                      console.log(`SVG font generated: ${outputFontFile}`);
                  })
                  .on('error', (err) => {
                      console.error('Error generating SVG font:', err);
                  });

        const glyphMetadata = [];

        const files = await fs.readdir(iconsDirectory);

        for (const file of files) {
            if (path.extname(file) === '.svg') {
                const filePath = path.join(iconsDirectory, file);
                const glyphName = path.basename(file, '.svg');
                const unicode = String.fromCharCode(0xe000 + Math.random() * 1000);

                const glyphStream = createReadStream(filePath);
                glyphStream.metadata = {
                    unicode: [unicode],
                    name: glyphName
                };

                fontStream.write(glyphStream);

                glyphMetadata.push({
                    name: glyphName,
                    unicode
                });
            }
        }

        fontStream.end();

        // Wait for the font stream to finish
        await new Promise((resolve, reject) => {
            fontStream.on('finish', resolve);
            fontStream.on('error', reject);
        });

        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        // Step 2: Convert SVG Font to TTF
        console.log('Converting SVG font to TTF...');
        const svgFontData = await fs.readFile(outputFontFile, 'utf8');
        const ttf = svg2ttf(svgFontData, {});
        await fs.writeFile(outputTTFFile, Buffer.from(ttf.buffer));
        console.log(`TTF font generated: ${outputTTFFile}`);

        // Step 3: Convert TTF Font to WOFF
        console.log('Converting TTF font to WOFF...');
        const ttfData = await fs.readFile(outputTTFFile);
        const woff = ttf2woff(ttfData);
        await fs.writeFile(outputWOFFFile, Buffer.from(woff.buffer));
        console.log(`WOFF font generated: ${outputWOFFFile}`);

        // Step 4: Convert TTF Font to WOFF2
        console.log('Converting TTF font to WOFF2...');
        const woff2 = ttf2woff2(ttfData);
        await fs.writeFile(outputWOFF2File, woff2);
        console.log(`WOFF2 font generated: ${outputWOFF2File}`);

        // Clean up
        for (const file of filesToDelete) {
            try {
                await fs.unlink(file);
                console.log(`File deleted: ${file}`);
            } catch {
                // File does not exist
            }
        }
        await deleteIconFolder();

        return glyphMetadata;
    } catch (err) {
        console.error('Error generating fonts:', err);
    }
};
