if(process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb://lovestories:Frogfoot25>@ds139167.mlab.com:39167/heroku_jt5hcdv6'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost:27017/lovestories'}
}