const express = require('express');
const path = require('path');

const app = express();

console.log('Setting up static file serving...');
app.use(express.static(path.join(__dirname, '..', 'dist/webdev-project')));
const indexHtml = path.join(__dirname, '..', 'dist/webdev-project/index.html');
app.use('/', (req, res) => res.sendFile(indexHtml));

const port = process.env.PORT || 8080;
console.log(`Listening on port ${port}...`);
app.listen(port);
