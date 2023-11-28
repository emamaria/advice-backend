

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Advice',
        // allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    }
})


const upload = multer({ storage });

module.exports = upload;