// services/fileUploadService.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Set upload directory
const uploadDir = path.join(__dirname, '../uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const saveFile = (file, documentType) => {
  return new Promise((resolve, reject) => {
    const uniqueFilename = `${documentType}-${uuidv4()}-${file.originalname}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(`/uploads/${uniqueFilename}`);
    });
  });
};

module.exports = {
  saveFile
};