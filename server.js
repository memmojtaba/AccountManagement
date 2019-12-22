require('dotenv').config();
const http = require('http');
const app = require('./app');


const port = process.env.PORT || 8080;
const host = process.env.EFFECTIVE_ADD || 'localhost';

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});