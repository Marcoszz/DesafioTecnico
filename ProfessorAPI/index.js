'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const profRoutes = require('./routes/profRoutes');


const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.use('/', profRoutes.routes);


app.listen(config.port, () => console.log('API Escutando a porta http://localhost:' + config.port));
