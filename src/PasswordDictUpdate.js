const request = require('request');
const fs = require('fs');

class PasswordDictUpdate {
    passwordDictUpdate(dictionary, comment) {
        var data = JSON.parse(dictionary);
        data.comment = comment;

        var address = fs.readFileSync(__dirname + '/../files/smartServerAddress.txt', 'utf8');
        
        request.post({
            headers: {
                'content-type': 'application/json'
            },
            url:`http://${address}/passwordDictUpdate`,
            body: data,
            json: true
        }, function(err, res, body) {
            console.log(body);
        });
        
    }
}

module.exports.PasswordDictUpdate = PasswordDictUpdate;
