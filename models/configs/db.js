const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017/KasuaAppDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (!err) console.log("[kasuwa-app-api]---- connection to KasuaAppDB : success");
        else console.log("[kasuwa-app-api]---- connection to KasuaAppDB : not success" + err);
    }
)