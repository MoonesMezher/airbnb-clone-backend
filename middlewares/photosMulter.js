const multer = require('multer');

const photosMulter = multer({dest: "uploads"})

module.exports = photosMulter