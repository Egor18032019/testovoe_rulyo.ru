import downloadFile from "./downloadFile.js";
import parseBicList from "./parseBicList.js";
import deleteFile from "./deleteFile.js";
import saveData from "./saveData.js";


const url = 'http://www.cbr.ru/s/newbik'
const pathForZipFile = './bicForCbr.zip'

// скачиват файл
 downloadFile(url, pathForZipFile)
    .then
    (() => parseBicList(pathForZipFile))
    .then
    ((data) => saveData(data))
    .then
    (() => deleteFile(pathForZipFile))
    .catch(
        err=>console.log(err)
    )
