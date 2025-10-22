const Product = require('../models/product.model');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Hiển thị danh sách sản phẩm với phân trang và sắp xếp
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const sortOrder = req.query.sort === 'desc' ? 'DESC' : 'ASC';
    const search = req.query.search || '';

    const whereClause = search ? {
      name: {
        [Op.like]: `%${search}%`
      }
    } : {};

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['name', sortOrder]]
    });

    res.render('admin/index', {
      title: 'Quản lý sản phẩm',
      products: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      sortOrder,
      search
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Có lỗi xảy ra khi tải danh sách sản phẩm');
  }
};

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : 'default.jpg';

    await Product.create({
      name,
      price: price || 0,
      image,
      description
    });

    res.redirect('/admin');
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Có lỗi khi thêm sản phẩm');
  }
};

// Hiển thị form sửa sản phẩm
exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }

    res.render('admin/edit', {
      title: 'Sửa sản phẩm',
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Có lỗi xảy ra');
  }
};

// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }

    const updateData = {
      name,
      price: price || 0,
      description
    };

    // Nếu có upload ảnh mới
    if (req.file) {
      // Xóa ảnh cũ (trừ default.jpg)
      if (product.image && product.image !== 'default.jpg') {
        const oldImagePath = path.join(__dirname, '../public/images', product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = req.file.filename;
    }

    await Product.update(updateData, {
      where: { id: req.params.id }
    });

    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Có lỗi khi cập nhật sản phẩm');
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).send('Không tìm thấy sản phẩm');
    }

    // Xóa ảnh (trừ default.jpg)
    if (product.image && product.image !== 'default.jpg') {
      const imagePath = path.join(__dirname, '../public/images', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.destroy({
      where: { id: req.params.id }
    });

    res.redirect('/admin');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Có lỗi khi xóa sản phẩm');
  }
};