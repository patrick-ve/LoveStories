const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
    _id: ObjectId,
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    festivals: Array
});

// var data = [
//     {
//         id: 1,
//         gender: 'woman',
//         name: 'Bea',
//         age: 27,
//         height: 174,
//         description: 'Living young, wild and free!'
//     },
//     {
//         id: 2,
//         gender: 'woman',
//         name: 'Kim',
//         age: 24,
//         height: 155,
//         description: 'Klein, maar fijn 💁‍'
//     },
//     {
//         id: 3,
//         gender: 'woman',
//         name: 'Josefine',
//         age: 25,
//         height: 163,
//         description: 'Verpleegkundige | Amsterdam | Festivals'
//     },
//     {
//         id: 4,
//         gender: 'woman',
//         name: 'Chantal',
//         age: 18,
//         height: 178,
//         description: 'Ik houd van terrasjes, gezelligheid, reizen en pizza'
//     },
//     {
//         id: 5,
//         gender: 'woman',
//         name: 'Anna',
//         age: 20,
//         height: 169,
//         description: 'Als je rookt, mag je lekker naar links swipen..'
//     },
//     {
//         id: 6,
//         gender: 'woman',
//         name: 'Naomy',
//         age: 29,
//         height: 185,
//         description: 'Lange reus uit Utrecht'
//     },
// ]

module.exports = mongoose.model("User", userSchema);