import { User } from '../models';
import { Role } from '../models';
import { env } from '../config/env';

export const isAdmin = async (req, res, next) => {
    try {
        const userFound = await User.findById(req.uid);

        if (!userFound) return res.status(500).json({ msg: 'An error has ocurred: Contact with the Administrator' });
        if (!userFound.roles) return res.status(500).json({ msg: 'An error has ocurred: Contact with the Administrator' });

        const roles = await Role.find({ _id: { $in: userFound.roles } });

        let foundRole = false;

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "ADMIN") {
                foundRole = true;
                break;
            }
        }

        if (!foundRole) {
            console.log('Role not found');
            return res.status(403).json({ msg: 'Operation is not allowed. Contact with the Administrator' });
        }

        next();

    } catch (error) {
        return res.status(500).json({ msg: `An error has ocurred: ${error}` });
    }

}

export const isAllowedRoles = async (req, res, next) => {   
    const { roles } = req.body;
    const basicRoles = env.ROLES;
    
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!basicRoles.includes(roles[i].toLowerCase())) {
                return res.status(400).json({ msg: `Role ${roles[i]} doesn't exists` });
            }
        }
    }    
    
    next();
}