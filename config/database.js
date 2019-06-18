if(process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb://lovestories:Frogfoot25>@ds239797.mlab.com:39797/heroku_kw34mtnf'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost:27017/lovestories'}
}