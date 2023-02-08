"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _rangoControllers = require("../controllers/rango.controllers");
const _authMiddlewares = require("../middlewares/auth.middlewares");
const rangosRoutes = (fastify, opts, done)=>{
    fastify.get("/", _rangoControllers.getRoles);
    fastify.put("/purchase/:rango", {
        preValidation: _authMiddlewares.isAuth
    }, _rangoControllers.purchaseRole);
    done();
};
const _default = rangosRoutes;
