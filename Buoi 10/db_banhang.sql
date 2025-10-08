-- ===============================
-- DATABASE: db_banhang (SQLite)
-- ===============================

CREATE TABLE customer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gender TEXT,
    email TEXT,
    address TEXT,
    phone_number TEXT,
    note TEXT,
    created_at TEXT,
    updated_at TEXT
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    id_type INTEGER,
    description TEXT,
    unit_price REAL,
    promotion_price REAL,
    image TEXT,
    unit TEXT,
    created_at TEXT,
    updated_at TEXT
);

CREATE TABLE bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_customer INTEGER,
    date_order TEXT,
    total REAL,
    payment TEXT,
    note TEXT,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (id_customer) REFERENCES customer(id)
);

CREATE TABLE bill_detail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_bill INTEGER,
    id_product INTEGER,
    quantity INTEGER,
    unit_price REAL,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (id_bill) REFERENCES bills(id),
    FOREIGN KEY (id_product) REFERENCES products(id)
);

CREATE TABLE news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    image TEXT,
    create_at TEXT,
    update_at TEXT
);
