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
    getRoles: ()=>getRoles,
    purchaseRole: ()=>purchaseRole
});
const _rango = /*#__PURE__*/ _interopRequireDefault(require("../models/Rango"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getRoles = async (req, rep)=>{
    const rangos = await _rango.default.find();
    return rep.send({
        status: 200,
        rangos
    });
};
const purchaseRole = async (req, rep)=>{
    const { rango  } = req.params;
    const foundRango = await _rango.default.findById(rango);
    if (!foundRango) return rep.code(404).send({
        status: 404,
        message: "El rango seleccionado no existe"
    });
    const user = await req.user.populate("rango");
    if (user.rango && user.rango.position >= rango.position) return rep.code(404).send({
        status: 404,
        message: "Estás intentando comprar un rango inferior al que tienes actualmente"
    });
    if (user.funds < foundRango.price) return rep.code(403).send({
        status: 403,
        message: "No tienes los fondos suficientes para comprar este rango"
    });
    user.rango = foundRango._id;
    await user.save();
    return rep.code(201).send({
        status: 201,
        user
    });
};
