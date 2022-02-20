const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { MessageModel } = require('../../models/messages/message');

//Acceuil
router.get("/messages", (req, res) => {
    res.send("Bien sur API de l'application KasuaApp !");
});
//Get all
router.get('/messages', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    MessageModel.find((err, result) => {
        console.log(result);
        if (!err)
            res.send(JSON.stringify(result));
        else
            res.send("Error de rquestte");
    })
});

//poste create one
router.post('/messages', (req, res) => {
    const newMessage = new MessageModel({
        auteur: req.body.auteur,
        message: req.body.message
    });
    newMessage.save((err, message) => {
        if (!err)
            res.send(message);
        else
            console.log("erreur lors du poste d'un nouveau message" + err);
    })
})

//Update one message
router.put("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Identifiant inconnu : " + req.params.id)

    const updatedMessage = {
        auteur: req.body.auteur,
        message: req.body.message
    };

    MessageModel.findByIdAndUpdate(
        req.params.id, { $set: updatedMessage }, { new: true },
        (err, message) => {
            if (!err)
                res.send(message);
            else
                res.send("erreur lors de la mis à jour du message : " + err);
        }

    )
})


//supprimer
//Update one message
router.delete("/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Identifiant inconnu : " + req.params.id)

    MessageModel.findByIdAndDelete(
        req.params.id,
        (err, message) => {
            if (!err)
                res.send("Suppression avec sucès");
            else
                res.send("erreur lors de la suppression du message : " + err);
        }
    )
});
module.exports = router;