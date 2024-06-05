import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import booksRoutes from './routes/booksRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN, 
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', booksRoutes);
app.use('/api', authRoutes);

export default app;
