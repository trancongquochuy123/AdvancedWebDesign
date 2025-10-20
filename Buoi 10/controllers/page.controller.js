const db = require('../database/database');

exports.home = (req, res) => {
    // Lấy sản phẩm mới và top products riêng biệt
    const queryNew = 'SELECT * FROM products ORDER BY created_at DESC LIMIT 8';
    const queryTop = 'SELECT * FROM products ORDER BY promotion_price ASC LIMIT 8'; // ví dụ: top theo giá khuyến mãi
    const querySlider = 'SELECT image, name FROM products ORDER BY RANDOM() LIMIT 4'; // random 4 ảnh để hiện slider

    db.all(queryNew, [], (err, newProducts) => {
        if (err) {
            console.error('❌ SQLite error (new):', err.message);
            return res.status(500).send('Database error');
        }

        db.all(queryTop, [], (err2, topProducts) => {
            if (err2) {
                console.error('❌ SQLite error (top):', err2.message);
                return res.status(500).send('Database error');
            }
            const sliders = ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"];

            console.log("Sliders data:", sliders);

            // render ra trang home.ejs (bên trong layout/index.ejs)
            res.render('layout/index', {
                content: '../pages/home',
                newProducts,
                topProducts,
                sliders
            });
        });
    });
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