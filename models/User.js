const mongoose = require('mongoose');

// protection avec mongoose validator
const mongooseUniqueValidator = require('mongoose-unique-validator');

// schéma (thing) pour les utilisateurs

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('User', userSchema);