"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const PurchaseSchema = new _mongoose.Schema({
    date: Date,
    charge: Number
});
const _default = (0, _mongoose.model)('Purchase', PurchaseSchema);
