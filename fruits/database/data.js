import 'dotenv/config';
import mysql from 'mysql2/promise';

let fruit = mysql.createFruit({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    waitForConnections: true,
    queueLimit: 0
});

export default fruit;