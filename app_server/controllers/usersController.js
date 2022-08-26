var FormData = require('form-data');
var hostProd = "https://kasuwaapp-api-v0.herokuapp.com/k-api/v1/";
var hostDev = "http://localhost:777/k-api/v1/";
const axios = require('axios').default

const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const registerGet = (req, res) => {
    res.render('register', { title: req.query.p1, 'oneBoutique': "" });

};

const registerPost = (req, res) => {
    console.log("EGREGREG");
    console.log(req.body);
    axios({
            method: "post",
            url: getHost(req.headers.host) + "register",
            data: req.body
        })
        .then(b => {
            console.log(b.data);
            if (b.data.mail) {
                redirect("/auth/loginget", res);
            } else {
                redirect("/auth/register?p1=" + b.data, res);
            }
        })
        .catch(error => {
            console.log("kokokoko");
            console.error(error);
        });
};
const logout = (req, res) => {

    redirect("/auth/loginget", res);
};

const loginGet = (req, res) => {
    res.render('login', { title: 'Boutique de :', 'oneBoutique': "" });

};


const loginPost = (req, res) => {

    // console.log("ICICICICI");
    //console.log(req.body);
    res.setHeader('x-access-token', "ggggg");
    const token = localStorage.getItem("ourToken");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    axios({
            method: "post",
            url: getHost(req.headers.host) + "login",
            data: req.body,
            headers: headers
        })
        .then(b => {
            console.log(b.status.code);
            //res.render('login', { title: 'Boutique de :', 'oneBoutique': "" });
            console.log("ICICICICI");
            console.log(b.data);
            console.log(b.data);
            if (b.data.mail) {
                localStorage.setItem("ourToken", b.data.token);
                res.set('x-access-token', token);
                res.redirect("/");
            } else {
                redirect("/auth/loginget", res);
            }
        })
        .catch(error => {
            console.log("kokokoko");
            console.error(error);
        });
};

function redirect(url, res) {
    //res.statusCode = 302;
    /* res.token = "ddfff";
     req.token = "ddfff";
     const token = localStorage.getItem("ourToken");
     res.setHeader('x-access-token', "ggggg");
     res.set({
         'x-access-token': "ggggg"
     });*/
    res.setHeader('Location', url);
    //res.statusCode = 302;
    res.status(302).json({ "token": 'Ha Ocurrido un error' });

}

function getHost(host) {
    if (host === "localhost:777")
        return hostDev;
    return hostProd;
}

module.exports = {
    loginPost,
    loginGet,
    logout,
    registerGet,
    registerPost
};