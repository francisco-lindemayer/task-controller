require('dotenv/config');
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');

const { errors } = require('celebrate');
require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

consign().include('src/routes').into(app);

app.use(errors());

module.exports = app;
