const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

class PasswordSecurityCheck {
    passwordSecurityCheck(password, predictPoint) {
        if(predictPoint > 0.5) {
            return {
                password: password,
                comment: [
                    `${password}는 유출되지 않은 비밀번호`
                ],
                recommended: [
                    password
                ]
            };
        }

        

        return {

        };
    };
}

module.exports.PasswordSecurityCheck = PasswordSecurityCheck;