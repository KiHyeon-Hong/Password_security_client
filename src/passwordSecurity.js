const fs = require('fs');
const http = require('http');

var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

class passwordSecurity {
    passwordValidation(password) {
        const test = async function() {
            const loadedModel = await tf.loadLayersModel("file://" + __dirname + "/../passwordModel/model.json");
            loadedModel.predict(tf.tensor([[0, 2, 10]])).print();
        }
        
        test();
        return 'passwordValidation';
    };

    passwordModelDistribution(versionData, comment) {
        const weights = fs.createWriteStream("./PasswordSecurityClient/passwordModel/weights.bin");
        http.get("http://localhost:65001/passwordModelDistributionWeight", function(response) {
            response.pipe(weights);
        });

        const model = fs.createWriteStream("./PasswordSecurityClient/passwordModel/model.json");
        http.get("http://localhost:65001/passwordModelDistributionModel", function(response) {
            response.pipe(model);
        });

        return 'passwordModelDistribution';
    };

    passwordDictUpdate(dictionary, comment) {
        return 'passwordDictUpdate';
    };

    passwordModelParaUpdate(parameter, comment) {
        return 'passwordModelParaUpdate';
    };

    getLog(level, startDate, finishDate) {
        return 'getLog';
    }
}

module.exports.passwordSecurity = passwordSecurity;