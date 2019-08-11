const rp = require('request-promise');
const fs = require('fs')

function ping(callback){

    var options = {
        uri: 'http://evstat.mybluemix.net/stat_json?z=6',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    rp(options).then(function (response) {
        var array = []
        for (var i = 0; i < response.length; i++){
            let obj = {}
            if(response[i].busy === 1){
                obj.busy = 'Yes'
            }else{
                obj.busy = 'No'
            }
            obj.id = response[i].id
            obj.pole = response[i].pole
            if(response[i].unit === 0){
                obj.unit = 'right'
            } else{
                obj.unit = 'left'
            }
            obj.power = response[i].power
            array.push(obj)
        }

        //TESTING
        //array = fs.readFileSync('data_test.json')
        // console.log('ping--')
        //array = JSON.parse(array)
        // console.log(typeof(array))
        //
        
        callback(array)
    }).catch(function (err) {
        console.log(err)
    })
}

module.exports = ping

