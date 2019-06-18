if(process.env.NODE_ENV === 'production') {
    module.exports = {mongoURI: 'mongodb+srv://admin:Frogfoot25@lovestories-qg5ov.mongodb.net/test?retryWrites=true&w=majority'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost:27017/lovestories'}
}