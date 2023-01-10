import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Servicio de MongoDB corriendo!'))
    .catch(e => console.log(e));