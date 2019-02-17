require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorHandler = require('./lib/error_handler');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use('/users', require('./routes'));

app.use(errorHandler);

app.use(function(req, res, next) {
    return res.status(404).send({ message: `Route ${req.url} not found..` });
});

const httpServer = http.createServer(app);

httpServer
    .listen(process.env.PORT || '3000')
    .on('error', error => {
    console.log(`Error in starting server: ${JSON.stringify(error)}`);
})
.on('listening', () => {
    console.log(`Server listening on PORT: ${httpServer.address().port}`);
});