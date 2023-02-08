"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _mongoose = /*#__PURE__*/ _interopRequireDefault(require("mongoose"));
const _dotenv = require("dotenv");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _dotenv.config)();
_mongoose.default.connect(process.env.MONGODB_URI).then(()=>console.log('Servicio de MongoDB corriendo!')).catch((e)=>console.log(e));
