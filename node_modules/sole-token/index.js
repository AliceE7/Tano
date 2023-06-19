/**
 * @author Suryapratap Singh Suryavanshi
 * @date 31/05/2022
 * @summary This file contains main hierarchy of the module.
 */

// A formatter function format the uuid delimiter.
let formate = (uuidArray, delimiter) => {
    return uuidArray.join(delimiter);
}

// Generate version-1 UUID.
const uuid1 = require('./src/uuid1').getUUID1;

// Generate version-4 UUID.
const uuid4 = require('./src/uuid4').uuid4;

// Generate ID's.
const ids = require('./src/num');

/**
 * Generate UUID1 and UUID-4 or Token type unique value for your various works.
 * @param {Object} param0 configuration object.
 * @return {String} Return a unique token or UUID value.
 */
const soleToken = (n_config) => {
	let config = { ...{ type: 'uuid4', delimiter: '-', size: 32 }, ...n_config };
	let size = config.size;
	let delimiter = config.delimiter;
	let type = config.type;

	if(size < 32 && type !== 'id') {
		return formate(uuid4(), '').slice(0, size);
	}else if(size === 32 || type === 'id') {
		switch(type) {
			case 'uuid1':
				return formate(uuid1(), delimiter);
			case 'uuid4':
				return formate(uuid4(), delimiter);
			// Generate unofficial UUID or token.
			case 'token':
				return formate(uuid4(), '')
			case 'id':
				return ids().slice(0, size);
		}
	}else {
		throw 'The size of the UUID or token are not supported!';
	}
}

module.exports = {
	soleToken
};
