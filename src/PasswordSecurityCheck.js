const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

class PasswordSecurityCheck {
    passwordSecurityCheck(password, predictPoint) {
        // predictPoint 어떤 것이 우수한지 테스트 필요
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
        console.log(feature);

        /*
            핵심 부분

        */
        var comment = [];
        var recommended = [];



        return {
            password: password,
            predictPoint: predictPoint,
            comment: comment,
            recommended: recommended
        };
    };
}

module.exports.PasswordSecurityCheck = PasswordSecurityCheck;