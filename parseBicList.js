import admZip from 'adm-zip'
import xml2js from 'xml2js'
import iconv from 'iconv-lite'
import fs from 'fs';

const parseBicList = async (pathForZipFile) => {
    let results = []
    console.log(pathForZipFile)
    // проверка смогли ли скачать файл
    if (fs.existsSync(pathForZipFile)) {
        // ..разархивирует zip,  отдельно ?
        const zip = new admZip(pathForZipFile)
        const zipEntries = zip.getEntries();
        // распарсит XML
        const parser = new xml2js.Parser(xml2js.defaults["0.2"]);
        zipEntries.forEach(function (zipEntry) {
            let data = zipEntry.getData()
            data = iconv.decode(data, 'win1251')
            parser.parseString(data, function (err, result) {
                for (const entry of result.ED807.BICDirectoryEntry) {
                    // получаем все BICDirectoryEntry из хмл
                    if (entry.hasOwnProperty('Accounts')) {
                        for (const account of entry.Accounts) {
                            results.push({
                                bic: entry.$.BIC,
                                /*
 [
   {
     '$': {
       NameP: 'УФК по Астраханской области'
           }
    }
 ]
 берем первый элемент массива и по ключу
                                 */
                                name: entry.ParticipantInfo[0].$.NameP,
                                corrAccount: account.$.Account,
                            })
                        }
                    }
                }
            })
        })
    } else {
        console.log("Файл не найден:", pathForZipFile);
    }
    console.log(results.length)
    return results
}

export default parseBicList;