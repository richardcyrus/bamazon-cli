/**
 * MySQL database connectivity.
 *
 * The Coding Boot Camp at UNC Charlotte.
 * (c) 2018 Richard Cyrus <richard.cyrus@rcyrus.com>
 */

require('dotenv').config();
const mysql = require('mysql');

exports.pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bamazon',
    host: 'localhost',
    port: '/tmp/mysql.sock',
    // debug: ['ComQueryPacket', 'RowDataPacket']
});

exports.fconfig = {
    font: 'Stick Letters'
};
