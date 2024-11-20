import fs from 'fs/promises';
import unzipper from 'unzipper';

const zipFilePath = './icons.zip';
const outputDirectory = './icons';

export const unzipIcons = async() => {
    try {
        try {
            await fs.access(zipFilePath);
        } catch {
            console.error(`Zip file does not exist: ${zipFilePath}`);
            return;
        }

        try {
            await fs.access(outputDirectory);
            await fs.rm(outputDirectory, {recursive: true});
        } catch {
            // Directory does not exist
        }

        await fs.mkdir(outputDirectory, {recursive: true});

        const directory = await unzipper.Open.file(zipFilePath);
        await directory.extract({path: outputDirectory});
    } catch (err) {
        console.error('Error while extracting zip:', err);
    }
};
