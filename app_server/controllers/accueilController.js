const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');


/* GET 'home' page */
const accueil = (req, res) => {
    req.header('x-access-token', "ggggg");
    res.render('accueil', { title: "BIENVENUE SUR LA PAGE D'ACCUEIL DE KASUAWA APP API", token: "rrr" });
};

const toto = (req, res) => {
    //req.header('x-access-token', "ggggg");
    req.token = "hhhh";
    /* res.set({
         'x-access-token': "ggggg"
     })*/
};


module.exports = {
    accueil,
    toto
};