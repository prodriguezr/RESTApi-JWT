import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { User, Role } from '../models';

export const signup = async (req, res) => {
    const { name, username, email, password, roles } = req.body;

    const newUser = new User({
        name,
        username,
        email,
        password: await User.encryptPassword(password),
        ip: req.ip
    });

    if (roles) {
        const upperRoles = roles.map(role => role.toUpperCase());

        const foundRoles = await Role.find({ name: { $in: upperRoles } });
    
        if (foundRoles)
            newUser.roles = foundRoles.map(role => role._id);
        else {
            const userRole = await Role.findOne({ name: "USER" });

            if (!userRole) return res.status(500).json({ msg: 'User role not found. Conctact with the Administrator' });

            newUser.roles = [ userRole.id ];
        }
    } else {
        const userRole = await Role.findOne({ name: "USER" });

        console.log(userRole);

        if (!userRole) return res.status(500).json({ msg: 'User role not found. Conctact with the Administrator' });

        newUser.roles = [ userRole.id ];
    }

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, env.JwtKey, {
        expiresIn: 86400 // 24 hours
    });

    res.status(201)
        .header('auth-token', token)
        .json({ 
            data: { user }, 
            msg: 'User successfully created' 
        });
}

export const signin = async (req, res) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email, deleted: false })
        .populate('roles', { _id:0, name: 1 })
        .populate('last_upd_by', { _id: 0, name: 1 });

    if (!userFound) return res.status(400).json({ msg: 'User not found or not exists' });

    const isValidPassword = await User.validatePassword(password, userFound.password);

    if (!isValidPassword) return res.status(400).json({ msg: 'Email or password are incorrect' });

    const token = jwt.sign({ id: userFound._id }, env.JwtKey, {
        expiresIn: 86400
    });

    res.status(200)
        .header('x-auth-key', token)
        .json({ data: { user: userFound }, msg: 'User successfully logged in' });
}