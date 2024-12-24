import multer from "multer";
import path from 'path';
// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Specify the folder where files will be saved
    },
    filename: (req, file, cb) => { 
      // Use a unique timestamp with the file extension to avoid filename collisions
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // Create the multer instance with the storage configuration and other options
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set max file size to 5MB
    fileFilter: (req, file, cb) => {
      // Restrict file types (only images in this case)
      const fileTypes = /jpeg|jpg|png|gif/;
      const isValidMimeType = fileTypes.test(file.mimetype);
      const isValidExtension = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
      if (isValidMimeType && isValidExtension) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed.'));
    }
  });
  
  // Create a middleware function using the `upload` instance
 export const uploadImage = upload.single('image'); // 'image' is the name of the file input field in the form
  