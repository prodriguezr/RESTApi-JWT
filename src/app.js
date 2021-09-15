import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from '../package.json';
import { AuthRoute, ProductsRoute, UsersRoute } from './routes';
import { createRolesAndUser } from './config/init';
import helmet from 'helmet';

const app = express();

createRolesAndUser();

// Settings variables
app.set('pkg', pkg);
app.set('trust proxy', true);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

// Routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/api/products', ProductsRoute);
app.use('/api/users', UsersRoute);
app.use('/auth', AuthRoute);

export default app;
