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
    async passwordValidation(password) {
        // 반환받은 결과를 바탕으로 피드백 기능 필요
        const result = await new PasswordValidation.PasswordValidation().passwordValidation(password);
        return new PasswordSecurityCheck.PasswordSecurityCheck().passwordSecurityCheck(password, result);
    };

    passwordModelDistribution(versionData, comment) {
        // 사전 파일도 받아오도록 작성
        var pwd = new PasswordModelDistribution.PasswordModelDistribution();
        
        pwd.passwordModelDistributionWeights(versionData, comment);
        pwd.passwordModelDistributionModel(versionData, comment);
        pwd.passwordModelDistributionDictionary(versionData, comment);

        return 'passwordModelDistribution';
    };

    passwordDictUpdate(dictionary, comment) {
        var pwd = new PasswordDictUpdate.PasswordDictUpdate();
        pwd.passwordDictUpdate(dictionary, comment);

        return 'passwordDictUpdate Success';
    };

    passwordModelParaUpdate(parameter, comment) {
        var pwd = new PasswordModelParaUpdate.PasswordModelParaUpdate();
        pwd.passwordModelParaUpdate(parameter, comment);

        return 'passwordModelParaUpdate Success';
    };

    getLog(level, startDate, finishDate) {
        return 'getLog';
    }

    serverAddressUpdate(serverAddress) {
        fs.writeFileSync(__dirname + '/../files/smartServerAddress.txt', serverAddress, 'utf8');
        return 'server Address Update';
    }


    

    passwordModelTest(serverAddress) {

    }
}

module.exports.PasswordSecurity = PasswordSecurity;