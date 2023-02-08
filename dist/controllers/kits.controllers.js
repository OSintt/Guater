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
    getKits: ()=>getKits,
    purchaseKit: ()=>purchaseKit
});
const _kit = /*#__PURE__*/ _interopRequireDefault(require("../models/Kit"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getKits = async (req, rep)=>{
    try {
        const kits = await _kit.default.find().sort({
            price: 1
        });
        return rep.send({
            status: 200,
            kits
        });
    } catch (e) {
        return rep.code(400).send({
            status: 400,
            message: "Ocurrió un error inesperado"
        });
    }
};
const purchaseKit = async (req, rep)=>{
    const { kit  } = req.params;
    const foundKit = await _kit.default.findById(kit);
    if (!foundKit) return rep.code(404).send({
        status: 404,
        message: "El kit seleccionado no existe"
    });
    const user = req.user;
    if (user.kits.includes(foundKit._id)) return rep.code(409).send({
        status: 409,
        message: '¡Ya compraste este kit previamente!'
    });
    if (user.funds < foundKit.price) return rep.code(403).send({
        status: 403,
        message: "No tienes los fondos suficientes para comprar este kit"
    });
    user.kits.push(foundKit._id);
    await user.save();
    return rep.code(201).send({
        status: 201,
        user
    });
};
