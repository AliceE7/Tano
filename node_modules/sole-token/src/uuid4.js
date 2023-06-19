/**
 * This method generate version 4 UUID
 * @returns uuid-4 array.
 */
 let uuid4 = () => {
    let uuid = "";
    while(true){
        let char = String.fromCharCode(Math.floor(Math.random() * (126 - 64 + 1) + 64))
        if(uuid.length > 5) break;
        if(char != ' ' && char != '[' && char != ']' && char != '\\' && char != '/' && char != '{' && char != '}' && char != '(' && char != ')' && char != `'` && char != `"` && char != '`')
            uuid += char;
    }
    let total = 0;
    while(true){
        let num = Math.round(Math.random() * 1000000);
        if(total > 1000000) break;
        total += num;
    }
    uuid = uuid + total;
    while(true){
        let char = String.fromCharCode(Math.floor(Math.random() * (126 - 64 + 1) + 64))
        if(uuid.length > 31) break;
        if(char != ' ' && char != '[' && char != ']' && char != '\\' && char != '/' && char != '{' && char != '}' && char != '(' && char != ')' && char != `'` && char != `"` && char != '`')
            uuid += char;
    }
    return [ uuid.substring(0, 8), uuid.substring(8, 12), uuid.substring(12, 16), uuid.substring(16, 20), uuid.substring(20, 32) ]
}

module.exports = {
	uuid4
}
