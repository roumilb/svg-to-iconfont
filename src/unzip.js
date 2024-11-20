import fs from 'fs/promises';
import unzipper from 'unzipper';
import {unzipIconsFolder} from './variables.js';

export const deleteIconFolder = async() => {
    try {
        await fs.access(unzipIconsFolder);
        await fs.rm(unzipIconsFolder, {recursive: true});
    } catch {
        // Directory does not exist
    }
};

export const unzipIcons = async(zipFilePath) => {
    try {
        try {
            await fs.access(zipFilePath);
        } catch {
            console.error(`Zip file does not exist: ${zipFilePath}`);
            return;
        }

        await deleteIconFolder();

        await fs.mkdir(unzipIconsFolder, {recursive: true});

        const directory = await unzipper.Open.file(zipFilePath);
        await directory.extract({path: unzipIconsFolder});
    } catch (err) {
        console.error('Error while extracting zip:', err);
    }
};
