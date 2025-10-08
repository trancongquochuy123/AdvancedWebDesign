exports.home = (req, res) => {  
    res.render('pages/index', { content: '../partials/home' });  
};  

exports.about = (req, res) => {  
    res.render('pages/index', { content: '../partials/about' });  
};  

exports.contact = (req, res) => {  
    res.render('pages/index', { content: '../partials/contact' });  
};  