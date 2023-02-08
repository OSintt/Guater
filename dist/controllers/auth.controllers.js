"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    me: ()=>me,
    login: ()=>login,
    changeMcNick: ()=>changeMcNick,
    ban: ()=>ban,
    getMyPurchases: ()=>getMyPurchases
});
const _dotenv = require("dotenv");
const _user = /*#__PURE__*/ _interopRequireDefault(require("../models/User"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _dotenv.config)();
const login = (req, rep)=>{
    rep.redirect(process.env.CLIENT_DOMAIN);
};
const me = async (req, rep)=>{
    const user = await req.user.populate('kits rango');
    rep.send({
        status: 200,
        user
    });
};
const getMyPurchases = async (req, rep)=>{
    const { purchases  } = await req.user.populate('purchases');
    rep.send({
        status: 200,
        purchases
    });
};
const ban = async (req, rep)=>{
    const user = await _user.default.findById(req.params.user);
    if (!user) return rep.code(404).send({
        status: 404,
        message: 'No se ha encontrado a ese usuario'
    });
    user.ban = !user.ban;
    await user.save();
    return rep.code(201).send({
        status: 201,
        user
    });
};
const changeMcNick = async (req, rep)=>{
    let { new_nick  } = req.body;
    if (!new_nick) return rep.code(401).send({
        status: 401,
        message: "Olvidaste ingresar tu nuevo nick"
    });
    if (typeof new_nick !== "string") return rep.code(400).send({
        status: 400,
        message: "Tipo de parámetro inválido"
    });
    new_nick = new_nick.trim();
    if (new_nick.length <= 1) return rep.code(409).send({
        status: 409,
        message: "No puedes tener un nick tan corto"
    });
    if (new_nick.length > 32) return rep.code(409).send({
        status: 409,
        message: "No puedes tener un nick tan largo"
    });
    const user = await _user.default.findOneAndUpdate({
        userId: req.user.userId
    }, {
        minecraft_username: new_nick
    });
    await user.save();
    return rep.code(201).send({
        status: 201,
        user,
        new_nick
    });
};
