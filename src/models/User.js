import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: { 
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 12
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    ip: {
        type: String,
        required: false
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    last_upd_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
}

userSchema.statics.validatePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}

export default model('User', userSchema);