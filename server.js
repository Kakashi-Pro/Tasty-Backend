import express from 'express';
import cors from 'cors';  // Fixed typo from 'cros' to 'cors'
import { connectDb } from './config/ApplicationDBContext.js';  // Make sure this is the correct path
import userRouter from './routes/userRouter.js';  
import restaurantRouter from './routes/restaurantRouter.js';
import foodRouter from './routes/FoodRouter.js';


const app = express();
const port =  process.env.port||5053;

// Middleware
app.use(express.json());
app.use(cors());  // Fixed typo from 'cros' to 'cors'

// Database connection
connectDb();

// API endpoint
app.use('/api', userRouter);
app.use('/api', restaurantRouter);
app.use('/api',foodRouter)


// Define a basic route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
