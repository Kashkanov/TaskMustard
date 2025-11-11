require('dotenv').config();
const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

db.connect()
    .then(obj => {
        console.log('Connected to DB');
        obj.done();
    })
    .catch(err => console.log(err));

module.exports = db;