import fs from 'fs';
import fetch from 'node-fetch'

const downloadFile = async (url, path) => {
    const res = await fetch(url)
    const fileStream = fs.createWriteStream(path)
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream)
        res.body.on("error", reject)
        fileStream.on("finish", resolve)
    })
};
export default downloadFile;
