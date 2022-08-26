//const mongoose = require("../database");
const mongoose = require('mongoose');
// create an schema
var userSchema = new mongoose.Schema({
    nom: { type: String, default: null },
    prenom: { type: String, default: null },
    mail: { type: String, unique: true },
    mdp: { type: String },
    token: { type: String },
});

var UserModel = mongoose.model('user', userSchema);

//module.exports = mongoose.model("Users", userModel);
module.exports = { UserModel };