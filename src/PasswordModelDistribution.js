const http = require('http');
const fs = require('fs');

class PasswordModelDistribution {
    passwordModelDistributionWeights(versionData, comment) {
        var path = __dirname;

        var tempPath = path.split('\\');

        if(tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

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

        var tempPath = path.split('\\');

        if(tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

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

    passwordModelDistributionDictionary(versionData, comment) {
        var path = __dirname;

        var tempPath = path.split('\\');

        if(tempPath.length == 1) {
            tempPath = path.split('/');
        }

        path = tempPath;

        var downloadPath = "";
        for(let i = 0; i < path.length - 1; i++) {
            downloadPath = downloadPath + path[i] + '/';
        }

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        http.get(`http://${address}/passwordModelDistributionDict?versionData=${versionData}&comment=${comment}`, function(response) {

        });
    }
}

module.exports.PasswordModelDistribution = PasswordModelDistribution;