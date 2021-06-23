const fs = require('fs');
const http = require('http');
const request = require('request');

const PasswordValidation = require(__dirname + '/PasswordValidation.js');
const PasswordModelDistribution = require(__dirname + '/PasswordModelDistribution.js');
const PasswordDictUpdate = require(__dirname + '/PasswordDictUpdate.js');
const PasswordModelParaUpdate = require(__dirname + '/PasswordModelParaUpdate.js');
const PasswordValidationTest = require(__dirname + '/PasswordValidationTest.js');
const PasswordSecurityCheck = require(__dirname + '/PasswordSecurityCheck.js');

class PasswordSecurity {
    passwordValidation(password) {
        // 반환받은 결과를 바탕으로 피드백 기능 필요
        return new PasswordValidation.PasswordValidation().passwordValidation(password);
    };

    passwordModelDistribution(versionData, comment) {
        // 서버 주소 파일 형태로 변환 기능 필요
        /*
        const weights = fs.createWriteStream("./PasswordSecurityClient/passwordModel/weights.bin");
        http.get("http://localhost:65001/passwordModelDistributionWeight", function(response) {
            response.pipe(weights);
        });

        const model = fs.createWriteStream("./PasswordSecurityClient/passwordModel/model.json");
        http.get("http://localhost:65001/passwordModelDistributionModel", function(response) {
            response.pipe(model);
        });
        */

        var pwd = new PasswordModelDistribution.PasswordModelDistribution();
        pwd.passwordModelDistributionWeights(versionData, comment);
        pwd.passwordModelDistributionModel(versionData, comment);

        return 'passwordModelDistribution';
    };

    passwordDictUpdate(dictionary, comment) {
        var pwd = new PasswordDictUpdate.PasswordDictUpdate();
        pwd.passwordDictUpdate(dictionary, comment);

        return 'passwordDictUpdate';
    };

    passwordModelParaUpdate(parameter, comment) {
        var pwd = new PasswordModelParaUpdate.PasswordModelParaUpdate();
        pwd.passwordModelParaUpdate(parameter, comment);

        return 'passwordModelParaUpdate';
    };

    getLog(level, startDate, finishDate) {
        return 'getLog';
    }

    async passwordValidationTest(password) {
        const result = await new PasswordValidationTest.PasswordValidationTest().passwordValidationTest(password);
        return new PasswordSecurityCheck.PasswordSecurityCheck().passwordSecurityCheck(password, result);
    };
}

module.exports.PasswordSecurity = PasswordSecurity;