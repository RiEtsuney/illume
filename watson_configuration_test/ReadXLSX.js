/*
function readExcel(pathname) {
    var xlsx = require('xlsx');

    // read xlsx file，convert the first worksheet into JSON object
    var workbook = xlsx.readFile(pathname);
    var sheetNameList = workbook.SheetNames;
    var worksheet = workbook.Sheets[sheetNameList[0]];
    var userArray = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // convert to JSON object array

    //console.log(userArray);

    var doc = [];
    for (i = 0; i < userArray.length; i++) {
        var temp = { id: userArray[i][0], author: userArray[i][1], bibliography: userArray[i][2], body: userArray[i][3], title: userArray[i][4] };
        doc[i] = temp;
    }
    return doc;
}
exports.readExcel = readExcel;
*/
function readExcel() {
    console.log('hello');
    var xlsx = require('xlsx');
    var pathname = 'F:\Downloads-PC\toy.xlsx';
    // read xlsx file，convert the first worksheet into JSON object
    var workbook = xlsx.readFile(pathname);
    var sheetNameList = workbook.SheetNames;
    var worksheet = workbook.Sheets[sheetNameList[0]];
    var userArray = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // convert to JSON object array

    //console.log(userArray);

    var doc = [];
    for (i = 0; i < userArray.length; i++) {
        var temp = { id: userArray[i][0], patent_no: userArray[i][1], title: userArray[i][2], author: userArray[i][3], abstract: userArray[i][4], claim: userArray[i][5] };
        doc[i] = temp;
    }
    console.log(doc);
}
