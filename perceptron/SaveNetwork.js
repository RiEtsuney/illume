function save(Net, filepath){
	var exported = Net.toJSON();

	var fs = require('fs');
	fs.writeFileSync(filepath, JSON.stringify(exported));
}
exports.save = save;