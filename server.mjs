import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.mjs';
import wineRoutes from './routes/wineRoutes.mjs';

// Load environment variables
dotenv.config();

// Set up the Express app
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use wine routes
app.use('/api/wines', wineRoutes);

// Set up server to listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
