const express = require('express');
const router = express.Router();

const authMiddleware = require('../Middleware/Auth-middleware');
const adminMiddleware = require('../Middleware/admin-middleware');
const uploadMiddleware = require('../Middleware/upload-middleware');
const {uploadImageCtrl, fetchAllImagesCtrl, deleteImageCtrl} = require('../Controllers/image-ctrl');

// Use .single('image') because uploadMiddleware is a multer instance
router.post(
    '/upload',
    authMiddleware,
    adminMiddleware,
    uploadMiddleware.single('image'),
    uploadImageCtrl
);

router.get('/get', authMiddleware, fetchAllImagesCtrl);

// delete image route
router.delete(
    '/delete/:id',
    authMiddleware,
    adminMiddleware,
    deleteImageCtrl
);
module.exports = router;