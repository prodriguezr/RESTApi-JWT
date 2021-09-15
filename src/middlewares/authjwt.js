import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { User } from '../models';

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-auth-key'];

    if (!token) return res.status(403).json({ msg: 'Token not provided' });

    try {
        const decoded = jwt.verify(token, env.JwtKey);

        if (decoded) {
            const userFound = await User.findById(decoded.id);

            if (!userFound) return res.status(404).json({ msg: 'User not found' });
            if (userFound.deleted) return res.status(403).json({ msg: 'User has not been found or has been deleted' });
            if (!userFound.enabled) return res.status(404).json({ msg: 'User has not been enabled. Contact the Administrator' });
            
            req.uid = decoded.id;

            next();

        }

    } catch(err) {
        return res.status(403).json({ msg: `An error has ocurred: ${err}` });
    }
}