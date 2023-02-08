"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _session = /*#__PURE__*/ _interopRequireDefault(require("@fastify/session"));
const _passport = /*#__PURE__*/ _interopRequireDefault(require("@fastify/passport"));
const _cookie = /*#__PURE__*/ _interopRequireDefault(require("@fastify/cookie"));
const _dotenv = require("dotenv");
const _cors = /*#__PURE__*/ _interopRequireDefault(require("@fastify/cors"));
require("./strategies/discord_strategy");
const _createData = require("./lib/createData");
Promise.resolve().then(()=>/*#__PURE__*/ _interopRequireWildcard(require("./utils/db")));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
(0, _dotenv.config)();
const fastify = require("fastify")({
    logger: true
});
//middleware
fastify.register(_cors.default, {
    origin: "http://localhost:3000",
    credentials: true
});
//auth
fastify.register(_cookie.default);
fastify.register(_session.default, {
    cookieName: "discord.oauth",
    secret: process.env.COOKIE_SECRET,
    cookie: {
        secure: false,
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false
});
fastify.register(_passport.default.initialize());
fastify.register(_passport.default.secureSession());
//register routes
fastify.register(require("./routes/auth.routes"), {
    prefix: "/api/auth"
});
fastify.register(require("./routes/rangos.routes"), {
    prefix: "/api/rangos"
});
fastify.register(require("./routes/kits.routes"), {
    prefix: "/api/kits"
});
fastify.register(require("./routes/funds.routes"), {
    prefix: "/api/purchases"
});
//start server
const start = async ()=>{
    await fastify.listen({
        port: process.env.PORT || 3001
    });
    fastify.log.info(`Servidor corriendo en el puerto ${fastify.server.address().port}`);
//createKits();
//createRangos();
};
start();
