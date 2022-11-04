import fs from "fs";
import * as path from 'path'

const saveData = async (data) => {
    const dataForSaveInFile =JSON.stringify(data)
    const dir = path.resolve("test.txt");
    fs.writeFile(dir, dataForSaveInFile, () => {
        console.log("file record")
    })
}

export default saveData;