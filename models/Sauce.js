const mongoose = require('mongoose');

// schéma (thing) pour la création d'une sauce

const sauceSchema = mongoose.Schema({

    userId : {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: Array, required: true},
    usersDisliked: {type: Array, required: true}
});

// export du modèle en tant que modèle mongoose
module.exports = mongoose.model('Sauces', sauceSchema);