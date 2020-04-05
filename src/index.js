require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const { errors } = require('celebrate');
require('./database');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(errors());
app.listen(process.env.PORT || 3000);
