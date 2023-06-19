const id = () => {
	let ids = "";
	while(true) {
		ids += parseInt((Math.random() * 100) % 100);
		if(ids.length >= 32) {
			break;
		}
	}
	return ids.slice(0, 32);
}

module.exports = id;
