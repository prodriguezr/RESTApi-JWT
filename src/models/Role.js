import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
    name: { 
        type: String,
        unique: true,
        uppercase: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    last_upd_by: {
        type: Schema.Types.ObjectId,
        required: false,
    }
}, {
    timestamps: true,
    versionKey: false,
    toObject: {
        transform: function (doc, ret) {
            delete ret.deleted;
            delete ret.last_upd_by;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
      },
      toJSON: {
        transform: function (doc, ret) {
            delete ret.deleted;
            delete ret.last_upd_by;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
      }

});

export default model('Role', roleSchema);