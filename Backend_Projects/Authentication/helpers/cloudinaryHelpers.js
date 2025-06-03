const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url: result.secure_url,
            publicId: result.public_id
        };

    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
};

module.exports = { uploadToCloudinary };
// This code defines a helper function to upload images to Cloudinary and returns the image URL and public ID.
