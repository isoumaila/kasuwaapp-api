var FormData = require('form-data');
var hostProd = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/";
var hostDev = "http://localhost:777/k-api/v1/";
const axios = require('axios').default


function getHost(host) {
    if (host === "localhost:777")
        return hostDev;
    return hostProd;
}


/* GET 'home' page */
;
const boutiques = (req, res) => {
    axios
        .get(getHost(req.headers.host) + 'shops')
        .then(b => {
            //console.log(`statusCode: ${b.status}`);
            console.log(b.status);
            res.render('boutiques', { title: 'Nos boutiques', 'boutiqueList': b.data });
        })
        .catch(error => {
            console.error(error);
        });
};

const oneBoutiqueDelete = (req, res) => {

    var id = req.query.id

    axios
        .delete(getHost(req.headers.host) + 'shop/' + id)
        .then(b => {

            res.statusCode = 302;
            res.setHeader('Location', '/boutiques');
            return res.end();
        })
        .catch(error => {
            console.error(error);
        });
};

const oneBoutique = (req, res) => {

    var id = req.query.id

    axios
        .get(getHost(req.headers.host) + 'shop/' + id)
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

    axios
        .get(getHost(req.headers.host) + 'shop/' + id)
        .then(b => {
            console.log(b.status);
            res.render('boutiqueMod', { title: 'Boutique de :', 'oneBoutique': b.data });
        })
        .catch(error => {
            console.error(error);
        });
};

const oneBoutiqueModPost = (req, res) => {
    var id = req.query.id


    axios({
            method: "put",
            url: getHost(req.headers.host) + "shop/" + id,
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
    var id = req.query.id
    axios({
            method: "post",
            url: getHost(req.headers.host) + "shop",
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
    boutiquesAddGet,
    oneBoutiqueDelete
};