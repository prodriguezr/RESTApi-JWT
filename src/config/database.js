import mongoose from 'mongoose';
import { env } from './env';

mongoose.connect(env.MongoDBUri)
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));