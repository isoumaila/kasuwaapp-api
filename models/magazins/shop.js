const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ShopModelSchema = new Schema({
    shopName: {
        type: String,
        require: true,
    },
    shopArticleType: {
        type: String,
        require: true,
    },
    shopPhoneNumber: {
        type: Number,
        require: true,
    },
    shopHours: {
        type: String,
        require: true,
    },
    shopMarketPlaceName: {
        type: String,
        require: true,
    },
    shopContry: {
        type: String,
        require: true,
    },
    shopCity: {
        type: String,
        require: true,
    },
    shopArticleType1: {
        type: String,
        require: true,
    },
    shopingredients: {
        type: [String],
        require: true,
    },
    shopimageUrl: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const ShopModel = mongoose.model(
    "shop",
    ShopModelSchema,
    "shop"
);

module.exports = { ShopModel };