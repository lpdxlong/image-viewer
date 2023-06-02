const fs = require('fs');
const params = {
	encoding: 'utf8'
};
fs.readFile('./src/package.json', params, (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	fs.writeFile('./image-viewer/package.json', data, (err) => {
		if (err) {
			console.error(err);
		}
	});
});