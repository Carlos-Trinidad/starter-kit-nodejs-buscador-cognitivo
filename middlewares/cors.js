const cors = require('cors');

var corsOptions = {
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'access_token', 'ACCESS_TOKEN'],
    exposedHeaders: ['Content-Type', 'Authorization', 'access_token', 'ACCESS_TOKEN']
};

module.exports = cors(corsOptions);