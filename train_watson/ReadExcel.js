
function readExcel(pathname){
	var xlsx = require('xlsx');

	// read xlsx file
	var workbook = xlsx.readFile(pathname);
	var sheetNameList = workbook.SheetNames;
	var worksheet = workbook.Sheets[sheetNameList[0]];
	var userArray = xlsx.utils.sheet_to_json(worksheet,{header:1}); // 转换为JSON对象数组

//console.log(userArray);

	var doc = [];
	for (i=0; i<userArray.length; i++){
		//var temp = {id: userArray[i][0], author: userArray[i][1], bibliography: userArray[i][2], body: userArray[i][3], title: userArray[i][4]};
		var temp = {id: userArray[i][0], patent_no: userArray[i][1], title: userArray[i][2], author: userArray[i][3], abstract: userArray[i][4], claim: userArray[i][5]};
		doc[i] = temp;
		}
	return doc;
}
exports.readExcel = readExcel;


