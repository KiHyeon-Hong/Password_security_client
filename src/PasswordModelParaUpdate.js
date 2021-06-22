const request = require('request');

class PasswordModelParaUpdate {
    passwordModelParaUpdate(parameter, comment) {
        var data = JSON.parse(parameter);
        data.comment = comment;

        request.post({
            headers: {
                'content-type': 'application/json'
            },
            url:'http://localhost:65001/passwordModelParaUpdate',
            body: data,
            json: true
        }, function(err, res, body) {
            // res.json(body);
            console.log(body);
        });
    }
}

module.exports.PasswordModelParaUpdate = PasswordModelParaUpdate;