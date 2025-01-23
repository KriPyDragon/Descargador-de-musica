import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

async function downloadMP3(url: string, outputPath: string): Promise<void> {
    const response = await axios.get(url, { responseType: 'stream' });
    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

const url = 'https://www.youtube.com/watch?v=Uoox9fpmDP0&pp=ygUJYm9hIGR1dmV0';
const downloadsPath = path.join(process.env.USERPROFILE || '', 'Downloads');
const outputPath = path.resolve(downloadsPath, 'music.mp3');

downloadMP3(url, outputPath)
    .then(() => console.log('Download completed!'))
    .catch(err => console.error('Download failed:', err));