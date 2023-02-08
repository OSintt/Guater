"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _fundsControllers = require("../controllers/funds.controllers");
const _authMiddlewares = require("../middlewares/auth.middlewares");
const purchaseRoutes = (fastify, opts, done)=>{
    fastify.get("/add-funds/:funds_added", {
        preValidation: _authMiddlewares.isAuth
    }, _fundsControllers.createOrder);
    fastify.get('/failed', _fundsControllers.cancelOrder);
    fastify.get('/success', _fundsControllers.captureOrder);
    fastify.get('/get-purchases', {
        preValidation: [
            _authMiddlewares.isAuth,
            _authMiddlewares.isAdmin
        ]
    }, _fundsControllers.getPurchases);
    done();
};
const _default = purchaseRoutes;
