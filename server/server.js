import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { parse } from 'qs';
import Testimonials from './models/Testimonials.js';
import usersRoutes from './routes/usersRoutes.js';
import destinationsRoutes from './routes/destinationsRoutes.js';
import hotelsRoutes from './routes/hotelsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import testimonialsRoutes from './routes/testimonialsRoutes.js';
import hebergementRoutes from './routes/hebergementRoutes.js';
import voyageRoutes from './routes/voyagesRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js'
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.set('query parser', (str) => parse(str));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.get('/', (req, res) => res.send('API running'));
app.use('/api', messagesRoutes);
app.use('/api', destinationsRoutes);
app.use('/api', hotelsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', hebergementRoutes);
app.use('/api', voyageRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/reservations", reservationRoutes);

app.use('/api', usersRoutes)

app.use('/api', authRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
