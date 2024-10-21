const DataUriParser = require("datauri/parser");
const path = require("path");

const getDataUri = (file) => {
    const parser = new DataUriParser();
    
    // Check if originalname is defined, else use a default name
    const originalName = file.originalname || 'defaultFileName' + path.extname(file.buffer); // Use buffer's extension

    const extName = path.extname(originalName).toString(); // Get the extension
    return parser.format(extName, file.buffer); // Return the Data URI
}

module.exports = getDataUri;
