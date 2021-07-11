const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

class PasswordSecurityCheck {
    passwordSecurityCheck(password, predictPoint) {

        var zxcvbnPoint = parseInt(parseInt(((koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password))) / 2) < 5? parseInt(parseInt(((koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password))) / 2): 4;
        var luds = parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20) < 5? parseInt(parseInt(ludsPoint.ludsPoint(password).nScore) / 20): 4;
        var levenshteinPoint = parseInt(parseInt(levenshteinDistance.totalLVD(password)) / 5) < 5? parseInt(parseInt(levenshteinDistance.totalLVD(password)) / 5): 4;
        
        console.log(zxcvbnPoint + ',' + luds + ',' + levenshteinPoint);


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

        // var feature = [(koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password), ludsPoint.ludsPoint(password).nScore, levenshteinDistance.totalLVD(password)];

        var comment = [];
        var recommended = [];



        // feedback
        // 현재는 유출된 비밀번호면랜덤 위치에 랜덤 문자열 추가
        var arr = [zxcvbnPoint, luds, levenshteinPoint];
        var check = arr.indexOf(Math.min.apply(null, arr));

        if(check == 0) {
            comment[0] = '사전의 단어를 사용하였으므로, 단어 변경 요망';
        }
        else if(check == 1) {
            comment[0] = '대문자, 소문자, 숫자, 특수기호를 적절하게 사용하지 않음';
        }
        else {
            comment[0] = '사전의 단어와 비슷한 단어를 사용함';
        }


        var chars = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "0123456789", "!@#$%^&*()"];

        var length = password.length;
        var random = Math.floor(Math.random() * (password.length + 1));
    
        if(random == length) {
            var ran = Math.floor(Math.random() * 4);
    
            var rnum = Math.floor(Math.random() * chars[ran].length);
            rnum = chars[ran].substring(rnum, rnum + 1);
    
            recommended[0] = password + rnum;
        }
        else {
            var ran = Math.floor(Math.random() * 4);
    
            var rnum = Math.floor(Math.random() * chars[ran].length);
            rnum = chars[ran].substring(rnum, rnum + 1);
        
            recommended[0] = password.substring(0, random) + rnum + password.substring(random, password.length);
        }



        return {
            password: password,
            predictPoint: predictPoint,
            comment: comment,
            recommended: recommended
        };
    };
}

module.exports.PasswordSecurityCheck = PasswordSecurityCheck;