const Square = require('../models/square.model');

// Trang nhập dữ liệu
exports.getForm = (req, res) => {
  res.render('index');
};

// Xử lý khi submit form
exports.postForm = async (req, res) => {
  const { canh } = req.body;
  const c = parseFloat(canh);

  // Tính chu vi & diện tích hình vuông
  const chuvi = 4 * c;
  const dientich = c * c;

  // Lưu vào database
  await Square.create({ canh: c, chuvi, dientich });

  res.redirect('/list');
};

// Hiển thị danh sách
exports.getList = async (req, res) => {
  const data = await Square.findAll({ order: [['id', 'DESC']] });
  res.render('list', { data });
};
