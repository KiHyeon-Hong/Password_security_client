const http = require('http');
const fs = require('fs');

class PasswordModelDistribution {
    passwordModelDistributionWeights(versionData, comment) {
        var path = __dirname;

        path = path.split('\\');

        var downloadPath = "";
        for(let i = 0; i < path.length - 1; i++) {
            downloadPath = downloadPath + path[i] + '/';
        }

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        const weights = fs.createWriteStream(downloadPath + 'passwordModel/weights.bin');
        http.get(`http://${address}/passwordModelDistributionWeight?versionData=${versionData}&comment=${comment}`, function(response) {
            response.pipe(weights);
        });
    };

    passwordModelDistributionModel(versionData, comment) {
        var path = __dirname;

        path = path.split('\\');

        var downloadPath = "";
        for(let i = 0; i < path.length - 1; i++) {
            downloadPath = downloadPath + path[i] + '/';
        }

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        const model = fs.createWriteStream(downloadPath + 'passwordModel/model.json');
        http.get(`http://${address}/passwordModelDistributionModel?versionData=${versionData}&comment=${comment}`, function(response) {
            response.pipe(model);
        });
    };

    /*
        추가된 유출 비밀번호를 포함한 사전을 특징 추출을 위한 사전에 추가
    */
    passwordModelDistributionDictionary(versionData, comment) {

    }
}

module.exports.PasswordModelDistribution = PasswordModelDistribution;