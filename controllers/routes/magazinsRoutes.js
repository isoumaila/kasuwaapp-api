const express = require('express');
const routerShop = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { ShopModel } = require('../../models/magazins/shop');

//Get one

/**
 * @swagger
 * /shop/{id}:
 *   get:
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
routerShop.get('/shop/:id', (req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Identifiant inconnu : " + req.params.id);

    ShopModel.findOne({ _id: req.params.id }, (err, result) => {
        if (!err)
            res.send(JSON.stringify(result));
        else
            res.send("Error de rquestte");
    })
});

//Get all

/** 
 * @swagger 
 * /shops: 
 *   get: 
 *     description: Get the shop 
 *     responses:  
 *       200: 
 *         description: Success  
 *   
 */
routerShop.get('/shops', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    ShopModel.find((err, result) => {
        //console.log(result);
        if (!err)
            res.send(JSON.stringify(result));
        else
            res.send("Error de rquestte");
    })
});

//poste create one

/**
 * @swagger
 * /shop:
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
routerShop.post('/shop', (req, res) => {
    const newShopModel = new ShopModel({
        shopName: req.body.shopName,
        shopArticleType: req.body.shopArticleType,
        shopPhoneNumber: req.body.shopPhoneNumber,
        shopHours: req.body.shopHours,
        shopMarketPlaceName: req.body.shopMarketPlaceName,
        shopContry: req.body.shopContry,
        shopCity: req.body.shopCity,
        shopArticleType1: req.body.shopArticleType1,
        shopingredients: req.body.shopingredients,
        shopimageUrl: req.body.shopimageUrl
    });
    newShopModel.save((err, message) => {
        if (!err)
            res.send(message);
        else
            console.log("erreur lors du poste d'un nouveau MAGAZIN" + err);
    })
})

//Update one ShopModel

/**
 * @swagger
 * /shop/{id}:
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
routerShop.put("/shop/:id", (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Identifiant inconnu : " + req.params.id)

    const updateShopModel = {
        shopName: req.body.shopName,
        shopArticleType: req.body.shopArticleType,
        shopPhoneNumber: req.body.shopPhoneNumber,
        shopHours: req.body.shopHours,
        shopMarketPlaceName: req.body.shopMarketPlaceName,
        shopContry: req.body.shopContry,
        shopCity: req.body.shopCity,
        shopArticleType1: req.body.shopArticleType1,
        shopingredients: req.body.shopingredients,
        shopimageUrl: req.body.shopimageUrl
    };

    ShopModel.findOneAndUpdate(req.params.id, { $set: updateShopModel }, { new: true },
        (err, result) => {
            if (!err)
                res.send(JSON.stringify(result));
            else
                res.send("erreur lors de la mis à jour du ShopModel : " + err);
        }

    )
})


//supprimer
//Update one ShopModel
/**
 * @swagger
 * /shop/{id}:
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
routerShop.delete("/shop/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Identifiant inconnu : " + req.params.id)

    ShopModel.findByIdAndDelete(
        req.params.id,
        (err, message) => {
            if (!err)
                res.send("Suppression avec sucès");
            else
                res.send("erreur lors de la suppression du ShopModel : " + err);
        }
    )
});



//export
module.exports = routerShop;