import { Schema, Types, model } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    avatarURL: String,
    purchases: [{
        type: Types.ObjectId,
        ref: 'Purchase'
    }],
    rango: {
        type: Types.ObjectId,
        ref: 'Rangos'
    },
    minecraft_username: String,
    kit: [{
        type: Types.ObjectId,
        ref: 'Kit'
    }],
    admin: {
        type: Boolean,
        default: false
    },
    date: Date
}, {
    versionKey: false
});

export default model('User', UserSchema);