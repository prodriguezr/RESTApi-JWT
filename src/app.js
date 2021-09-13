import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../package.json';
import productsRoute from './routes/products.routes';

const app = express();

// Settings variables
app.set('pkg', pkg);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/products', productsRoute);


export default app;
