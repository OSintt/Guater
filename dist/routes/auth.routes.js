"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _authControllers = require("../controllers/auth.controllers");
const _authMiddlewares = require("../middlewares/auth.middlewares");
const _passport = /*#__PURE__*/ _interopRequireDefault(require("@fastify/passport"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authRoutes = (fastify, opts, done)=>{
    fastify.get("/login", {
        preValidation: _passport.default.authenticate("discord")
    }, async (req, rep)=>{});
    fastify.get("/@me", {
        preValidation: _authMiddlewares.isAuth
    }, _authControllers.me);
    fastify.get("/my-purchases", {
        preValidation: _authMiddlewares.isAuth
    }, _authControllers.getMyPurchases);
    fastify.get("/redirect", {
        preValidation: _passport.default.authenticate("discord", {
            failureRedirect: "/forbidden"
        })
    }, _authControllers.login);
    fastify.put("/change-mc", {
        preValidation: _authMiddlewares.isAuth
    }, _authControllers.changeMcNick);
    fastify.get("/logout", async (req, rep)=>{
        if (req.user) {
            req.logout();
            rep.redirect("/");
        } else {
            rep.redirect("/");
        }
    });
    done();
};
const _default = authRoutes;
