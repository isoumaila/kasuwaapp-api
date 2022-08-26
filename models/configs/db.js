const mongoose = require("mongoose");
require("dotenv").config();
const dbUrlLocal = "mongodb://localhost:27017/KasuaAppDB";
const dbUrl =
    "mongodb+srv://IB:p0hGpkOV4Lml8NoM@cluster0.9cper.mongodb.net/KasuaAppDB?retryWrites=true&w=majority";
mongoose.connect(
    dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (!err)
            console.log("[kasuwa-app-api]---- connection to KasuaAppDB : success");
        else
            console.log(
                "[kasuwa-app-api]---- connection to KasuaAppDB : not success " + err
            );
    }
);