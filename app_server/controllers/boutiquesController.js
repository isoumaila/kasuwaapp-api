var FormData = require('form-data');

/* GET 'home' page */
const axios = require('axios').default;
const boutiques = (req, res) => {

    var host = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/";


    axios
        .get(host + 'shops')
        .then(b => {
            //console.log(`statusCode: ${b.status}`);
            console.log(b.status);
            res.render('boutiques', { title: 'Nos boutiques', 'boutiqueList': b.data });
        })
        .catch(error => {
            console.error(error);
        });
};

const oneBoutique = (req, res) => {

    var id = req.query.id

    var host = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/";


    axios
        .get(host + 'shop/' + id)
        .then(b => {
            console.log(b.status);
            res.render('boutique', { title: 'Boutique de :', 'oneBoutique': b.data });
        })
        .catch(error => {
            console.error(error);
        });
};

const oneBoutiqueModGet = (req, res) => {

    var id = req.query.id

    var host = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/";


    axios
        .get(host + 'shop/' + id)
        .then(b => {
            console.log(b.status);
            res.render('boutiqueMod', { title: 'Boutique de :', 'oneBoutique': b.data });
        })
        .catch(error => {
            console.error(error);
        });
};

const oneBoutiqueModPost = (req, res) => {
    var host = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/shop";
    var id = req.query.id


    axios({
            method: "put",
            url: host + "/" + id,
            data: req.body
        })
        .then(b => {
            console.log(b.data);
            res.render('boutiqueMod', { title: 'Boutique de :', 'oneBoutique': b.data });
        })
        .catch(error => {
            console.error(error.code);
        });
};

const boutiquesAdd = (req, res) => {
    var host = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/shop";
    var id = req.query.id
    console.log("ajout debut");
    console.log(req.body);
    console.log("ajout fin");

    axios({
            method: "post",
            url: host,
            data: req.body
        })
        .then(b => {
            console.log(b.data);
            res.render('boutiqueAdd', { title: 'Ajouter une boutique', 'oneBoutique': b.data });
        })
        .catch(error => {
            console.error(error.code);
        });
};

const boutiquesAddGet = (req, res) => {
    var role = req.query.role
    res.render('boutiqueAdd', { title: 'Ajouter une boutique' });

};

module.exports = {
    boutiques,
    oneBoutique,
    oneBoutiqueModGet,
    oneBoutiqueModPost,
    boutiquesAdd,
    boutiquesAddGet
};