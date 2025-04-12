const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // You can change this port if needed

const server = http.createServer((req, res) => {
    // Determine the file path based on the request URL
    let filePath = req.url === '/' ? 'whitepaper.html' : req.url;
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html'; // Default content type

    // Define MIME types for common web files
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    // Set content type based on file extension
    contentType = mimeTypes[extname] || 'application/octet-stream';

    // Construct the full path to the file
    const fullPath = path.join(__dirname, filePath);

    // Read the file
    fs.readFile(fullPath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                // File not found
                fs.readFile(path.join(__dirname, '404.html'), (err404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    if (err404) {
                        res.end('404 Not Found', 'utf-8');
                    } else {
                        res.end(content404, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        } else {
            // Success: serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 