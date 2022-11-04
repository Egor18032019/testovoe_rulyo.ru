
import fs from "fs";


const deleteFile = (pathForZipFile) => {
    fs.rm(pathForZipFile, (err) => {
        if (err) throw err;
        console.log('zip file was deleted');
    })
}

export default deleteFile;