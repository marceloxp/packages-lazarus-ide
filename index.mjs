import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;
const packagelist_url = 'https://packages.lazarus-ide.org/packagelist.json';
const filename = 'public/packagelist.json';
const currentFolder = process.cwd();

if (!fs.existsSync(filename)) {
    console.log('Downloading packagelist...');

    await new Promise((resolve, reject) => {
        fetch(packagelist_url)
            .then(response => response.json())
            .then(data => {
                fs.writeFileSync(filename, JSON.stringify(data));
                console.log('Download complete.');
                resolve();
            });
    });
}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`Lazarus Package List
        <br>
        Enter this URL in remote repository:
        <br>
        http://localhost:${PORT}
        <br>
        Download files from <a href="https://packages.lazarus-ide.org" target="_blank">https://packages.lazarus-ide.org</a> and save to:
        <br>
        ${currentFolder}/public
    `);
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));