const request = require('request')

const api_url = 'http://api.marketstack.com/v1/eod?'
const api_token = 'c5e4cca2984795252f4199f9e3ea635b'

const cotacao = (symbol, callback) => {
    
    const url = `${api_url}access_key=${api_token}&symbols=${symbol}`
    
    request({url: url, json: true}, (err, response) => {
        if(err){
            callback({
                message: `Something went wrong:${err}`,
                code: 500
            },undefined)
        }

        if(response.body === undefined || response.body.data === undefined){
            return callback({
                message: 'No data found',
                code: 404
            }, undefined)
        }

        const parsedJSON = response.body.data[0]
        const {symbol, open, close, high, low} = parsedJSON
        
        callback(undefined,{symbol, open, close, high, low})
    })
}

module.exports = {
    cotacao
}