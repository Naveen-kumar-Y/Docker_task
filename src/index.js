const http = require('http');
const compression = require('compression');
const express = require('express');

const db = require('./persistence');
const app = express();
const swaggerDocument = require('../swagger.json');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

require('dotenv').config();

const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const getItem = require('./routes/getItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    '/api-docs',
    function (req, res, next) {
        swaggerDocument.servers[0].url = `${req.protocol}://${req.get('host')}`;
        req.swaggerDoc = swaggerDocument;
        if (process.env.NODE_ENV === 'development')
            console.log(swaggerDocument);
        next();
    },
    swaggerUI.serve,
    swaggerUI.setup(),
);

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.get('/items/:id', getItem);
app.delete('/items/:id', deleteItem);

app.get('*', (req, res) => {
    res.redirect('/api-docs');
});

let server = http.createServer(app);

db.init()
    .then(() => {})
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

// Only start listening when this file is run directly. This prevents the
// server from binding the port when tests `require` this module.
if (require.main === module) {
    const port = process.env.PORT || 3000;

    // Friendly error handler so we print a clear message when the port is taken
    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use. Set PORT or free the port and try again.`);
            process.exit(1);
        }
        console.error(err);
        process.exit(1);
    });

    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
}

module.exports = server;

