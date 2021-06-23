const fs = require('fs');

const koreanZxcvbn = require(__dirname + '/../libTest/koreanZxcvbn');
const levenshteinDistance = require(__dirname + '/../libTest/levenshteinDistance.js');
const ludsPoint = require(__dirname + '/../libTest/ludsPoint.js');

const koreanZxcvbnString = require(__dirname + '/../libTest/koreanZxcvbnString');
const comparePoint = new koreanZxcvbnString.koreanZxcvbnString.koreanZxcvbnString();

var tf = require('@tensorflow/tfjs');
require("tfjs-node-save");

class PasswordValidationTest {
    async passwordValidationTest(password) {
        var feature = [(koreanZxcvbn(password).score * 2) + comparePoint.frequencyComparePoint(password), ludsPoint.ludsPoint(password).nScore, levenshteinDistance.totalLVD(password)]

        // console.log(comparePoint.frequencyComparePoint("rlgus"));
        // console.log(comparePoint.koreanZxcvbnString("rlgus"));
        const loadedModel = await tf.loadLayersModel("file://" + __dirname + "/../passwordModel/model.json");
        loadedModel.predict(tf.tensor([feature])).print();
        
    };
}

module.exports.PasswordValidationTest = PasswordValidationTest;