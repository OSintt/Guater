"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const UserSchema = new _mongoose.Schema({
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
    purchases: [
        {
            type: _mongoose.Types.ObjectId,
            ref: 'Purchase'
        }
    ],
    rango: {
        type: _mongoose.Types.ObjectId,
        ref: 'Rangos'
    },
    kits: [
        {
            type: _mongoose.Types.ObjectId,
            ref: 'Kit'
        }
    ],
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
const _default = (0, _mongoose.model)('User', UserSchema);
