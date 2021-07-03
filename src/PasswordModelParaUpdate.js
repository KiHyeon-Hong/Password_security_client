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
            
        });

        return {
            state: 200,
            comment: `하이퍼 파라매터 수정 요청 완료`
        };
    }
}

module.exports.PasswordModelParaUpdate = PasswordModelParaUpdate;