const express = require('express');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { MessageModel } = require('../../models/messages/message');

//Acceuil
/** 
 * @swagger 
 * /status: 
 *   get: 
 *     description: Get the status of the api 
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get("/status", (req, res) => {
    res.send("Bien sur API de l'application KasuaApp ! \n L'accès aux api est actuellement disponible");
});
//Get all

/** 
 * @swagger 
 * /messages: 
 *   get: 
 *     description: Get the messages 
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
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

/**
 * @swagger
 * /messages:
 *     post:
 *      parameters:
 *            - in: body
 *              name: message object   # Note the name is the same as in the path
 *              required: true
 *              schema:
 *                type: object
 *      responses:
 *          200:
 *              description: OK
 *              schema:
 *                type: object
 * */
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

/**
 * @swagger
 * /{id}:
 *   put:
 *      parameters:
 *            - in: path
 *              name: id   # Note the name is the same as in the path
 *              required: true
 *              type: string
 *              minimum: 1
 *              description: The user ID.
 *            - in: body
 *              name: message object   # Note the name is the same as in the path
 *              required: true
 *              schema:
 *                type: object
 *      responses:
 *          200:
 *              description: OK
 *              schema:
 *                type: object
 * */
router.put("/:id", (req, res) => {
    console.log(req.params.id);
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
/**
 * @swagger
 * /{id}:
 *   delete:
 *      parameters:
 *            - in: path
 *              name: id   # Note the name is the same as in the path
 *              required: true
 *              type: string
 *              minimum: 1
 *              description: The user ID.
 *      responses:
 *          200:
 *              description: OK
 * */
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


// define the first route
/** 
 * @swagger 
 * /test: 
 *   get: 
 *     description: Test des endpoint
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
router.get("/test", async function(req, res) {
    return res.json("Tous les jours !");
});




//export
module.exports = router;