import express from 'express';

import { AddItem } from "../controllers/FoodController.js";

const router = express.Router();

router.post('/AddItem',AddItem);

export default router;  // Export the router