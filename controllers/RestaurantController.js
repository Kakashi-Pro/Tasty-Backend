import bcrypt from 'bcryptjs';
import Restaurant from '../models/Restaurant.js';
import {uploadImage} from '../middleware/Multer.js';


export const addRestaurant= async(req,res)=> {
try{

  uploadImage(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Image upload failed', error: err.message });
        }  

 const {restaurantname, name,email,mobileno,address}=req.body;
 const image = req.file ? `uploads/${req.file.filename}` : null; // Save the file path (or null if no file)

 const existingUser = await Restaurant.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        
 const newrestaurant = new Restaurant({
    restaurantname,
    name,
    email,
    mobileno,
    address,
    image,
   

});

// Save the user
await newrestaurant.save();

// Return success response
return res.status(201).json({
    message: 'restaurant created successfully',
    user: {
        restaurantname:newrestaurant.restaurantname,
        name: newrestaurant.name,
        email: newrestaurant.email,
        mobileno:newrestaurant.mobileno,
        address:newrestaurant.address,
        image:newrestaurant.image,
        createdAt: newrestaurant.createdAt
    }
});
});
} 
catch (err) {
console.error(err);
return res.status(500).json({ message: 'Error creating user', error: err.message });
}

}

export const GetAllRestaurant=async (req,res)=>{
    try{
    const allres= await Restaurant.find();
    console.log(allres)
    if(!allres || allres.length===0){
        return res.status(400).json({
            message:"Not Found any Record"
        })
    }
    else{
        return res.status(200).json({
            allres
        }
           
        );
    }
}
catch(error){
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
}
    

}
