/*
	Generates and returns a random color.
*/
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/*
	If /compareNum/ is /firstNum/, return /secondNum/, otherwise return /firstNum/
*/
function returnOpp (compareNum, firstNum, secondNum) {
	if (compareNum == firstNum){
		return secondNum;
	}
	return firstNum;
}

/*
	Check if /str/ ends with /suffix/
*/
function endsWith(str, suffix) {
    return 
    	str.indexOf(suffix, str.length - suffix.length) !== -1;
}
