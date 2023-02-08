import { Schema, Types, model } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    discriminator: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    mc_nick: {
        type: String,
        required: true
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
    kits: [{
        type: Types.ObjectId,
        ref: 'Kit'
    }],
    admin: {
        type: Boolean,
        default: false
    },
    funds: {
        type: Number,
        default: 0
    },
    date: Date
}, {
    versionKey: false
});

export default model('User', UserSchema);