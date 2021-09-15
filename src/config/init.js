import { User, Role } from '../models';
import { env } from '../config/env';

export const createRolesAndUser = async () => {
    await createRoles();

    await createAdmin();
}

const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        await Promise.all([
            new Role({ name: 'user' }).save(),
            new Role({ name: 'admin' }).save()
        ]);

        console.log('Roles created');            
    } catch (error) {
        console.error(error);
    }
}

const createAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount();

        if (count > 0) return;

        const newAdminUser = new User({
            name: 'Administrator',
            username: 'admin',
            email: env.AdminEmail,
            password: await User.encryptPassword("password")
        });

        const user = await newAdminUser.save();

        const adminRole = await Role.findOne({ name: "ADMIN", deleted: false });
        const userRole = await Role.findOne({ name: "USER", deleted: false });
        
        if (adminRole && userRole) newAdminUser.roles = [ userRole._id, adminRole._id ];   

        user.last_upd_by = user._id;

        await user.save();
        
        await Role.updateMany({}, { $set: { last_upd_by: user._id } });

        console.log('User admin created');
    
    } catch (error) {
        console.error(error);
    }
}