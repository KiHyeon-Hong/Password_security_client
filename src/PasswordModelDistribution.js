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

        const weights = fs.createWriteStream(downloadPath + 'passwordModel/weights.bin');
        http.get(`http://localhost:65001/passwordModelDistributionWeight?versionData=${versionData}&comment=${comment}`, function(response) {
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

        const model = fs.createWriteStream(downloadPath + 'passwordModel/model.json');
        http.get(`http://localhost:65001/passwordModelDistributionModel?versionData=${versionData}&comment=${comment}`, function(response) {
            response.pipe(model);
        });
    };
}

module.exports.PasswordModelDistribution = PasswordModelDistribution;