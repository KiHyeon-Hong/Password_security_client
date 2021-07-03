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
            
        });
        
        return {
            state: 200,
            comment: `사전 수정 요청 완료`
        };
    }
}

module.exports.PasswordDictUpdate = PasswordDictUpdate;
