const express = require('express')
const jwt = require('jsonwebtoken')

const app = express();
// app.use((req, res, next) => {
//     res.status(503).send('The website is in maintenance')
// })


app.use(express.json());


module.exports = app;
