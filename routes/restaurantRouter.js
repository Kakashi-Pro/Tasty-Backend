import express from 'express';

import { addRestaurant,GetAllRestaurant } from '../controllers/RestaurantController.js';
const router = express.Router();
  
router.post('/addRestaurant',addRestaurant);
router.get('/GetAllRestaurant',GetAllRestaurant)

export default router;  // Export the router
