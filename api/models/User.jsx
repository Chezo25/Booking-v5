const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, default: null, required: true },
    email: { type: String, unique: true },
    password: { type: String, unique: true },

});

const UserModel = model('User', userSchema);

module.exports = UserModel;