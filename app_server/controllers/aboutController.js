/* GET 'home' page */
const about = (req, res) => {
    res.render('about', { title: 'Home' });
};


module.exports = {
    about
};