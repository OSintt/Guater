"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const KitSchema = new _mongoose.Schema({
    title: {
        required: true,
        unique: true,
        type: String
    },
    description: {
        required: true,
        unique: true,
        type: String
    },
    price: Number,
    sale: {
        type: Boolean,
        default: false
    },
    sale_percent: Number
}, {
    versionKey: false
});
const _default = (0, _mongoose.model)('Kit', KitSchema);
