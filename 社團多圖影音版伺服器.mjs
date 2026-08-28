import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = 8765;
const root = path.dirname(fileURLToPath(import.meta.url));
const homePage = '鶯歌國小一年級社團多圖影音版.html';
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8'
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://127.0.0.1:${port}`);
    const relativePath = decodeURIComponent(url.pathname === '/' ? homePage : url.pathname.slice(1));
    const filePath = path.resolve(root, relativePath);
    const allowedRoot = root.toLocaleLowerCase('zh-TW') + path.sep;

    if (!filePath.toLocaleLowerCase('zh-TW').startsWith(allowedRoot)) {
      response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('禁止存取');
      return;
    }

    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) throw new Error('不是檔案');
    const body = await readFile(filePath);
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    response.writeHead(200, {
      'Content-Type': contentType,
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-store'
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('找不到頁面');
  }
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') process.exit(0);
  throw error;
});

server.listen(port, '127.0.0.1');
