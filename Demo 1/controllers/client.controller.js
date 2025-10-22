const Product = require('../models/product.model');
const { Op } = require('sequelize');

// Trang chủ - hiển thị danh sách sản phẩm
exports.getHomePage = async (req, res) => {
  try {
    const search = req.query.search || '';
    const whereClause = search ? {
      name: { [Op.like]: `%${search}%` }
    } : {};

    const products = await Product.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: 20
    });

    res.render('client/home', {
      title: 'Trang chủ',
      products,
      search
    });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Lỗi tải trang chủ');
  }
};

// Trang chi tiết sản phẩm
exports.getProductDetail = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).render('error', { message: 'Không tìm thấy sản phẩm' });
    }

    res.render('client/detail', {
      title: `Chi tiết ${product.name}`,
      product
    });
    
  } catch (error) {
    console.error('Error loading product detail:', error);
    res.status(500).send('Lỗi tải chi tiết sản phẩm');
  }
};
