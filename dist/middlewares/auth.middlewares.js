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
    isAuth: ()=>isAuth,
    isAdmin: ()=>isAdmin
});
const isAuth = (req, rep, done)=>{
    if (!req.user) return rep.code(401).send({
        status: 401,
        message: "Necesitas estar registrado para realizar esta acción"
    });
    return done();
};
const isAdmin = (req, rep, done)=>{
    if (!req.user.admin) return rep.code(403).send({
        status: 403,
        message: "No tienes lo permisos necesarios para realizar esta acción"
    });
    return done();
};
