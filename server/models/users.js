const mongoose = require('mongoose')
const Joi = require('@hapi/joi');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""},
    email: {type: String, default: ""},
    userName: {type: String, default: ""},
    password: {type: String, default: ""},
    coin: {type: Number, default: 0}
});

const schema = Joi.object().keys({
    firstname: Joi.string().alphanum().min(2).max(10).required(),
    lastname: Joi.string().alphanum().min(2).max(10).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainSegments: 2 }).required()
}).with('firstname', 'lastname')

const dataMigrate = [];

userSchema.statics.getMigrateData = function () {
    return dataMigrate;
}

userSchema.statics.validate = function (data) {

    const result = Joi.validate(data, schema, {abortEarly: false})

    if(result.error !== null) {
        return result.error
    }
    else {
        return null
    }
}

module.exports = mongoose.model('User', userSchema)