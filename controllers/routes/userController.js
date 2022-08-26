const express = require('express');
const routerUser = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;
const { UserModel } = require('../../models/magazins/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");

routerUser.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});
// Register
routerUser.post("/register", async(req, res) => {

    // Our register logic starts here
    try {
        // Get user input
        const { nom, prenom, mail, mdp } = req.body;

        // Validate user input
        if (!(mail && mdp && nom && prenom)) {
            //res.status(400).send("All input is required");
            res.status(200).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await UserModel.findOne({ mail });
        console.log(oldUser);
        if (oldUser) {
            //return res.status(409).send("User Already Exist. Please Login");
            return res.status(200).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(mdp, 10);

        // Create user in our database
        const user = await UserModel.create({
            nom,
            prenom,
            mail: mail.toLowerCase(), // sanitize: convert email to lowercase
            mdp: encryptedPassword,
        });

        // Create token
        const token = jwt.sign({ user_id: user._id, mail },
            "" + process.env.TOKEN_KEY, {
                expiresIn: "1h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

// Login
routerUser.post("/login", async(req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { mail, mdp } = req.body;

        // Validate user input
        if (!(mail && mdp)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserModel.findOne({ mail });
        console.log(user);
        if (user && (await bcrypt.compare(mdp, user.mdp))) {
            // Create token
            const token = jwt.sign({ user_id: user._id, mail },
                "" + process.env.TOKEN_KEY, {
                    expiresIn: "1h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.set('x-access-token', token);
            res.status(200).json(user);
        }
        //res.status(400).send("Invalid Credentials");
        res.send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});

routerUser.post('/logout', auth, async(req, res) => {
    try {
        let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
        let randomIndex = Math.floor((Math.random() * 10) + 1);
        let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);

        // now just concat the hashed random number to the end of the token
        req.token = req.token + hashedRandomNumberToAppend;
        return res.status(200).json('logout');
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

module.exports = routerUser;