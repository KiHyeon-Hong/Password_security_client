const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

class PasswordSecurityCheck {
    passwordSecurityCheck(password, predictPoint) {
        if(predictPoint > 0.6) {
            return {
                password: password,
                predictPoint: predictPoint,
                comment: [
                    `${password}는 유출되지 않은 비밀번호`
                ],
                recommended: [
                    password
                ]
            };
        }

        var feature = [(koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password), ludsPoint.ludsPoint(password).nScore, levenshteinDistance.totalLVD(password)];

        var comment = [];
        var recommended = [];

        // feedback

        return {
            password: password,
            predictPoint: predictPoint,
            comment: comment,
            recommended: recommended
        };
    };
}

module.exports.PasswordSecurityCheck = PasswordSecurityCheck;