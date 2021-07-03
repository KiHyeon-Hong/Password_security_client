const fs = require('fs');
const http = require('http');
const request = require('request');

const PasswordValidation = require(__dirname + '/PasswordValidation.js');
const PasswordModelDistribution = require(__dirname + '/PasswordModelDistribution.js');
const PasswordDictUpdate = require(__dirname + '/PasswordDictUpdate.js');
const PasswordModelParaUpdate = require(__dirname + '/PasswordModelParaUpdate.js');
const PasswordSecurityCheck = require(__dirname + '/PasswordSecurityCheck.js');

class PasswordSecurity {
    async passwordValidation(password) {
        if(password.split('\n').length != 1 || password.split(',').length != 1 || password.split('\'').length != 1 || password.split('"').length != 1) {
            return {
                state: 310,
                comment: `유효하지 않은 비밀번호`
            };
        }

        const result = await new PasswordValidation.PasswordValidation().passwordValidation(password);
        return new PasswordSecurityCheck.PasswordSecurityCheck().passwordSecurityCheck(password, result);
    };

    passwordModelDistribution(versionData, comment) {
        var pwd = new PasswordModelDistribution.PasswordModelDistribution();
        
        versionData = versionData.toString();
        comment = comment.toString();

        pwd.passwordModelDistributionWeights(versionData, comment);
        pwd.passwordModelDistributionModel(versionData, comment);
        pwd.passwordModelDistributionDictionary(versionData, comment);

        return {
            state: 200,
            comment: `유출 비밀번호 예측모델 배포 완료`
        };
    };

    passwordDictUpdate(dictionary, comment) {
        var pwd = new PasswordDictUpdate.PasswordDictUpdate();

        return pwd.passwordDictUpdate(dictionary, comment);
    };

    passwordModelParaUpdate(parameter, comment) {
        var pwd = new PasswordModelParaUpdate.PasswordModelParaUpdate();

        return pwd.passwordModelParaUpdate(parameter, comment);
    };

    serverAddressUpdate(serverAddress) {
        fs.writeFileSync(__dirname + '/../files/smartServerAddress.txt', serverAddress, 'utf8');
        return {
            state: 200,
            comment: `서버 주소 변경 완료`
        };
    };

    getLog(level, startDate, finishDate) {
        return 'getLog';
    };
}

module.exports.PasswordSecurity = PasswordSecurity;