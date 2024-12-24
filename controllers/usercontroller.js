
import User from '../models/Users.js';  
import bcrypt from 'bcryptjs';


// Controller to create a new user
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10); // Salt rounds (work factor)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword  // Store the hashed password
        });

        // Save the user
        await newUser.save();

        // Return success response
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

// Controller to get a user by ID
export const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                address:user.address,
                mobileno:user.mobileno,
                password:user.password,
                city:user.city,
                createdAt: user.createdAt

            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};

// Controller to update user info (name and email for example)
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.mobileno=mobileno||user.mobileno;
        user.password=password||user.password;
        user.city=city||user.cityl;
        user.address||user.address;
        

        // Save updated user
        await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            user: {
                name: user.name,
                email: user.email,
                address:user.address,
                city:user.city,
                mobileno:user.mobileno,
                password:user.password,
                createdAt: user.createdAt

            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Find and delete user by ID
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

export const login=async (req, res)=>{
    try{
        const { email,password}  = req.body;
        if(!email||!password){
            return res.status(400).json({message:"Email is required"});
        }
        let verifyUser= await User.findOne({
            email
        });
        console.log(verifyUser);
        
        if (!verifyUser) {
            return res.status(400).json({ message: "User not found" });
          }
        
        const isPasswordValid = await bcrypt.compare(password, verifyUser.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"UserName Or Password Incorrect"});
        }
        return res.status(201).json({
            message: 'User Login successfully',
            user:{
                email
            }
        })
    }
    catch(error){
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' + error});
    }
}
// login code with Email or with Mobile No 
// export const login=async (req, res)=>{
//     try{
//         const { emailOrMobileno,password}  = req.body;
//         if(!emailOrMobileno||!password){
//             return res.status(400).json({message:"Email or Mobile number is required"});
//         }
//         let verifyUser= await User.findOne({$or:[
//             {
//                 email:emailOrMobileno
//            },
           
//             { mobileNo: emailOrMobileno }
           
//     ]});
        
//         if (!verifyUser) {
//             return res.status(400).json({ message: "User not found" });
//           }
        
//         const isPasswordValid = await bcrypt.compare(password, verifyUser.password);
//         if(isPasswordValid){
//             return res.status(400).json({message:"UserName Or Password Incorrect"});
//         }
//         return res.status(201).json({
//             message: 'User Login successfully',
//             user:{
//                 emailOrMobileno
//             }
//         })
//     }
//     catch(error){
//         console.error('Error during login:', error);
//         return res.status(500).json({ message: 'Internal Server Error' + error});
//     }
// }


export const getAllUsers= async (req,res)=>{
    try {
        // Use Mongoose's find() method to retrieve all users
        const allUsers = await User.find(); // This will get all users from the database
        if (!allUsers || allUsers.length === 0) {
          // No users found
          return res.status(404).json({ message: 'No users found' });
        }
        else{
            return res.status(201).json({
                allUsers});
        }
    
    
      } catch (error) {
          console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
      }
    };
  





