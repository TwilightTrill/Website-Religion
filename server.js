const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';

    const filePath = path.join(__dirname, decodeURIComponent(reqUrl));
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 ไม่พบหน้าที่ค้นหา</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

function startServer(port) {
    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`====================================================`);
        console.log(`  เว็บไซต์วันสำคัญทางพระพุทธศาสนา กำลังทำงาน`);
        console.log(`  เปิดที่: ${url}`);
        console.log(`  กด Ctrl + C เพื่อหยุดการทำงาน`);
        console.log(`====================================================`);
        exec(`start ${url}`);
    });
}

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`⚠️ พอร์ต ${PORT} กำลังถูกใช้งานอยู่ กำลังเปลี่ยนไปใช้พอร์ตถัดไป (${PORT + 1})...`);
        PORT += 1;
        startServer(PORT);
    } else {
        console.error('Server error:', err);
    }
});

startServer(PORT);
