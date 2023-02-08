"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _kitsControllers = require("../controllers/kits.controllers");
const _authMiddlewares = require("../middlewares/auth.middlewares");
const kitsRoutes = (fastify, opts, done)=>{
    fastify.get("/", _kitsControllers.getKits);
    fastify.put("/purchase/:kit", {
        preValidation: _authMiddlewares.isAuth
    }, _kitsControllers.purchaseKit);
    done();
};
const _default = kitsRoutes;
