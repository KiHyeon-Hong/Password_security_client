const request = require('request');
const fs = require('fs');

class PasswordModelParaUpdate {
    passwordModelParaUpdate(parameter, comment) {
        var data = JSON.parse(parameter);
        data.comment = comment;

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');

        request.post({
            headers: {
                'content-type': 'application/json'
            },
            url:`http://${address}/passwordModelParaUpdate`,
            body: data,
            json: true
        }, function(err, res, body) {
            // res.json(body);
            console.log(body);
        });
    }
}

module.exports.PasswordModelParaUpdate = PasswordModelParaUpdate;