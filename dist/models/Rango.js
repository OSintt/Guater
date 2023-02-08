"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const RangoSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: Number,
    sale: {
        type: Boolean,
        default: false
    },
    sale_percent: Number,
    position: {
        unique: true,
        type: Number
    }
}, {
    versionKey: false
});
const _default = (0, _mongoose.model)("Rango", RangoSchema);
