const http = require('http');
const fs = require('fs');

class PasswordModelDistribution {
    passwordModelDistributionWeights(versionData, comment) {
        const weights = fs.createWriteStream("./PasswordSecurityClient/passwordModel/weights.bin");
        http.get("http://localhost:65001/passwordModelDistributionWeight", function(response) {
            response.pipe(weights);
        });
    };

    passwordModelDistributionModel(versionData, comment) {
        const model = fs.createWriteStream("./PasswordSecurityClient/passwordModel/model.json");
        http.get("http://localhost:65001/passwordModelDistributionModel", function(response) {
            response.pipe(model);
        });
    };
}

module.exports.PasswordModelDistribution = PasswordModelDistribution;