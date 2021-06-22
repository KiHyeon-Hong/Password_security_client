const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../libTest/koreanBasedPassword/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../libTest/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../libTest/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../libTest/koreanBasedPassword/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

class PasswordValidationTest {
    async passwordValidationTest(password) {
        var feature = [(koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password), ludsPoint.ludsPoint(password).nScore, levenshteinDistance.totalLVD(password)]

        const loadedModel = await tf.loadLayersModel("file://" + __dirname + "/../passwordModel/model.json");
        loadedModel.predict(tf.tensor([feature])).print();
        
    };
}

module.exports.PasswordValidationTest = PasswordValidationTest;