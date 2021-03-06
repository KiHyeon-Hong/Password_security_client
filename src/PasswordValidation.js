const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../lib/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../lib/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../lib/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../lib/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

class PasswordValidation {
    async passwordValidation(password) {
        var feature = [(koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password), ludsPoint.ludsPoint(password).nScore, levenshteinDistance.totalLVD(password)];

        const loadedModel = await tf.loadLayersModel("file://" + __dirname + "/../passwordModel/model.json");
        var predictPoint = loadedModel.predict(tf.tensor([feature]));
        predictPoint = Array.from(predictPoint.dataSync())[0];

        return predictPoint;
    };
}

module.exports.PasswordValidation = PasswordValidation;