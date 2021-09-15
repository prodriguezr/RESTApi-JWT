import { User } from '../models';

export const userNotExists = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        
        const userFound = await User.findOne({ name, email }); 
        
        if (userFound) return res.status(200).json({ msg: 'User already exists' });

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).jsom({ msg: 'An error has ocurred' });
    }
} 

export const userExists = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        
        const userFound = await User.findOne({ name, email }); 
        
        if (!userFound) return res.status(200).json({ msg: 'User not found' });
        if (userFound.deleted) return res.status(200).json({ msg: 'User not found. Contact with the Administrator' });

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).jsom({ msg: 'An error has ocurred' });
    }
} 