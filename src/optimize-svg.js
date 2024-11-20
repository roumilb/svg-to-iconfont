import fixPathDirections from 'fix-path-directions';
import fs from 'fs/promises';
import path from 'path';
import SVGFixer from 'oslllo-svg-fixer';
import {unzipIconsFolder} from './variables.js';

const {getFixedPathDataString} = fixPathDirections;

const pathRegex = /<path[^>]*d="([^"]*)"/;
export const optimizeSvgs = async() => {
    try {
        console.log('Optimizing SVGs...');
        const files = await fs.readdir(unzipIconsFolder);
        for (const file of files) {
            if(path.extname(file).toLowerCase() !== '.svg') {
                continue;
            }
            const filePath = path.join(unzipIconsFolder, file);
            const data = await fs.readFile(filePath, 'utf8');
            if (!data.includes('fill-rule="evenodd"')) {
                continue;
            }

            const svgPath = data.match(pathRegex);
            if (!svgPath) {
                continue;
            }

            const pathData = svgPath[1];
            const pathDataFixed = getFixedPathDataString(svgPath[1]);

            let dataFixed = data.replace(pathData, pathDataFixed);
            dataFixed = dataFixed.replace('fill-rule="evenodd"', '');

            await fs.writeFile(filePath, dataFixed);
        }
    } catch (err) {
        console.error('Error while optimizing SVGs:', err);
    }
};

export const fixSvg = async() => {
    console.log('Fixing SVGs...');
    const options = {
        showProgressBar: false,
        throwIfDestinationDoesNotExist: false
    };

    await SVGFixer(unzipIconsFolder, unzipIconsFolder, options).fix(); // Returns instance
};
