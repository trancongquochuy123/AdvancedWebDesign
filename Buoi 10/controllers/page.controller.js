exports.home = (req, res) => {
    res.render('layout/index', { content: '../pages/home' });
};

exports.about = (req, res) => {
    res.render('layout/index', { content: '../pages/about' });
};

exports.contact = (req, res) => {
    res.render('layout/index', { content: '../pages/contact' });
};

exports.product_type = (req, res) => {
    res.render('layout/index', { content: '../pages/product_type' });
};


exports.not_found = (req, res) => {
    res.render('layout/index', { content: '../pages/404' });
}

exports.checkout = (req, res) => {
    res.render('layout/index', { content: '../pages/checkout' });
}

exports.login = (req, res) => {
    res.render('layout/index', { content: '../pages/login' });
}

exports.signup = (req, res) => {
    res.render('layout/index', { content: '../pages/signup' });
}

exports.shopping_cart = (req, res) => {
    res.render('layout/index', { content: '../pages/shopping_cart' });
}

exports.pricing = (req, res) => {
    res.render('layout/index', { content: '../pages/pricing' });
}

exports.product = (req, res) => {
    res.render('layout/index', { content: '../pages/product' });
}