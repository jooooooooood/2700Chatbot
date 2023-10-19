const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the index.html file
        const filePath = path.join(__dirname, 'index.html');
        const stream = fs.createReadStream(filePath);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        stream.pipe(res);
    } else {
        // Handle other requests (e.g., CSS and JavaScript)
        const filePath = path.join(__dirname, req.url);
        const stream = fs.createReadStream(filePath);

        stream.on('error', () => {
            // Handle 404 errors
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        });

        res.writeHead(200, { 'Content-Type': 'text/css' });
        stream.pipe(res);
    }
});

const port = 3000; // Set the desired port number
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
