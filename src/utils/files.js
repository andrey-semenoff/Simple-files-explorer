const path = require('path');

const getFileIndex = (next) => {
    if(next !== undefined && next !== null && !isNaN(next)) {
        return parseInt(next);
    }
    return 0;
}

const getFileName = (files, index) => {
    if(files.length >= index + 1){
        return files[index];
    }
    return null;
}

const getFilePath = (files, index) => {
    if(files.length >= index + 1){
        return '/' + files[index];
    }
    return null;
}

const getNextLink = (files, index) => {
    if(files.length > index + 1) {
        return '?next=' + (index + 1);
    }
    return null;
}

const getPrevLink = (index) => {
    if(index - 1 > 0) {
        return '?next=' + (index - 1);
    } else if (index - 1 === 0) {
        return '/';
    }
    return null;
}

module.exports = {
    getFileIndex,
    getFileName,
    getFilePath,
    getNextLink,
    getPrevLink
}