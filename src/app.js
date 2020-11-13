const fs = require('fs');
const http = require('http');
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;

const { getFileIndex, 
        getFileName, 
        getFilePath, 
        getNextLink,
        getPrevLink } = require('./utils/files');

const app = express();
const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const files = fs.readdirSync(publicPath);
    const fileIndex = getFileIndex(req.query.next);
    const filePath = getFilePath(files, fileIndex, publicPath);
    const fileName = getFileName(files, fileIndex);
    const nextLink = getNextLink(files, fileIndex);
    const prevLink = getPrevLink(fileIndex);
    
    res.render('index', {
        files,
        file: {
            name: fileName,
            path: filePath
        },
        nextLink,
        prevLink
    });
});

app.post('/', (req, res) => {
    const files = fs.readdirSync(publicPath);
    const fileIndex = getFileIndex(req.query.next);
    const filePath = getFilePath(files, fileIndex, publicPath);
    res.json(filePath);
});

http.createServer(app).listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})