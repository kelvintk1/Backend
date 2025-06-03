const image = require('../models/image');
const { uploadToCloudinary } = require('../helpers/cloudinaryHelpers'); // Use destructuring to get the function
const fs = require('fs');
const { cursorTo } = require('readline');
const cloudinary = require('cloudinary').v2;

const uploadImageCtrl = async (req, res) => {
    try {
        // Check if file is missing in req object
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload image to Cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // Store the image url and publicId in the database
        const newlyUploadedImage = new image({
            image: url,
            publicId: publicId,
            uploadedBy: req.userInfo?.id || req.userInfo?.userId || null // Support both id and userId
        });
        await newlyUploadedImage.save();

        // delete the file from local storage
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: newlyUploadedImage
        });

    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ success: false, message: 'Failed to upload image' });
    }
};

const fetchAllImagesCtrl = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 5; // Default to 5 items per page if not provided
        const skip = (page - 1) * limit; // Calculate the number of items to skip

        const sortBy = req.query.sortBy || 'createdAt'; // Default to sorting by createdAt
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1; // Default to ascending order
        const totalImages = await image.countDocuments(); // Get total number of images
        const totalPages = Math.ceil(totalImages / limit); // Calculate total pages
        
        const sortObj = {};
        sortObj[sortBy] = sortOrder; // Create sort object dynamically
        const images = await image.find({}).sort({ [sortBy]: sortOrder }).skip(skip).limit(limit);
        if (images){
        res.status(200).json({
            success: true,
            message: 'Images fetched successfully',
            currentPage: page,
            totalPages: totalPages,
            totalImages: totalImages,
            data: images
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'No images found'
        });
    }
    } catch (error) {
        console.error("Error fetching images:", error);
        return res.status(500).json({ success: false, message: 'Failed to fetch images' });
    }
};

const deleteImageCtrl = async (req, res) => {
    try {
        const getCurrentIdOfImageToDelete = req.params.id;
        const userId = req.userInfo.userId || req.userInfo.id;

        const foundImage = await image.findById(getCurrentIdOfImageToDelete);

        if (!foundImage) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        // Debugging: log both IDs
        console.log('foundImage.uploadedBy:', foundImage.uploadedBy.toString());
        console.log('userId:', userId);

        // check if this image is uploaded by the current user who is trying to delete it.
        if (foundImage.uploadedBy.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this image' });
        }
        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(foundImage.publicId);
        // Delete the image from the database
        await foundImage.deleteOne();
        res.status(200).json({ success: true, message: 'Image deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ success: false, message: 'Failed to delete image' });
    }
};

module.exports = {
    uploadImageCtrl,
    fetchAllImagesCtrl,
    deleteImageCtrl
}
