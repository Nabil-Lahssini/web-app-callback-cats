const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const port = process.env.NODE_ENV == "development" ? 3001 : process.env.API_PORT;

// server listening 
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});