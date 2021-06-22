const request = require('request');

class PasswordDictUpdate {
    passwordDictUpdate(dictionary, comment) {
        var data = JSON.parse(dictionary);
        data.comment = comment;

        request.post({
            headers: {
                'content-type': 'application/json'
            },
            url:'http://localhost:65001/passwordDictUpdate',
            body: data,
            json: true
        }, function(err, res, body) {
            // res.json(body);
            console.log(body);
        });
    }
}

module.exports.PasswordDictUpdate = PasswordDictUpdate;
