import  Food  from '../models/food.js'; // Assuming you're using a Mongoose model
import {uploadImage}  from '../middleware/Multer.js';

export const AddItem = async (req, res) => {
  try {
    // Run multer file upload middleware first
    uploadImage(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload failed', error: err.message });
      }

      // Extract fields from the request body and file
      const { name, description, type, price,restaurantId } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null; // Save the file path (or null if no file)

      // Create a new menu item
      const newMenu = new Food({
        restaurantId,
        name,
        description,
        type,
        price,
        image,
      });

      // Save the new menu item
      await newMenu.save();

      // Return success response
      return res.status(201).json({
        message: 'Menu item created successfully',
        menu: {
          name: newMenu.name,
          description: newMenu.description,
          type: newMenu.type,
          price: newMenu.price,
          image: newMenu.image, // This will return the image URL or file path
          restaurantId:newMenu.restaurantId
        }
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error creating menu item', error: err.message });
  }
};





