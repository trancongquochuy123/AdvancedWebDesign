require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { sequelize } = require('./models/index.model');
const productRoutesFactory = require('./routes/product.route');

const app = express();
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------- Static directories -------------------- */
app.use('/uploads', express.static(path.join(process.cwd(), UPLOAD_DIR)));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* -------------------- Ensure upload dir exists -------------------- */
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/* -------------------- Multer setup -------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

/* -------------------- Routes -------------------- */
app.use('/api/products', productRoutesFactory(upload));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/* -------------------- Export -------------------- */
// ❗ Không gọi app.listen ở đây — để bin/www quản lý server.
module.exports = { app, sequelize };
