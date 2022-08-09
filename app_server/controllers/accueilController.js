/* GET 'home' page */
const accueil = (req, res) => {
    res.render('accueil', { title: "BIENVENUE SUR LA PAGE D'ACCUEIL DE KASUAWA APP API" });
};


module.exports = {
    accueil
};