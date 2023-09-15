function getPasswordChecker(password) {
    return function(guess) {
        if (password === guess) {
            return true;
        }
        return false;
    }
}

const check = getPasswordChecker('1594826');

console.log(check('1894629'));
console.log(check('2243010'));
console.log(check('1594826'));