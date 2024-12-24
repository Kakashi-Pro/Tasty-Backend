
// routes/userRouter.js
import express from 'express';
import { createUser, getUserById, updateUser, deleteUser,login,getAllUsers } from '../controllers/usercontroller.js';  // Import controller functions

const router = express.Router();

// POST route to create a user
router.post('/adduser', createUser);  // Create a user at '/api/users'

// GET route to fetch a user by ID
router.get('/getuser/:id', getUserById);  // Fetch user by ID at '/api/users/:id'

// PUT route to update a user
router.put('/updateuser/:id', updateUser);  // Update user by ID at '/api/users/:id'

// DELETE route to delete a user
router.delete('/deleteuser/:id', deleteUser);  // Delete user by ID at '/api/users/:id'

router.post('/login',login);

router.get('/GetAllUser',getAllUsers);


export default router;  // Export the router



