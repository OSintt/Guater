"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _passport = /*#__PURE__*/ _interopRequireDefault(require("@fastify/passport"));
const _user = /*#__PURE__*/ _interopRequireDefault(require("../models/User"));
const _dotenv = require("dotenv");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const DiscordStrategy = require("passport-discord").Strategy;
(0, _dotenv.config)();
_passport.default.registerUserSerializer(async (user)=>{
    return user.userId;
});
_passport.default.registerUserDeserializer(async (userId)=>{
    try {
        const user = await _user.default.findOne({
            userId
        });
        return user ? user : null;
    } catch (e) {
        return e;
    }
});
const clientID = process.env.CLIENT_ID;
const callbackUrl = process.env.CALLBACK_URI;
const clientSecret = process.env.CLIENT_SECRET;
_passport.default.use(new DiscordStrategy({
    clientID,
    callbackUrl,
    clientSecret,
    scope: [
        "identify"
    ]
}, async (accessToken, refreshToken, profile, done)=>{
    const { id , username , discriminator , avatar  } = profile;
    try {
        const user = await _user.default.findOneAndUpdate({
            userId: id
        }, {
            username,
            discriminator,
            avatarURL: avatar,
            admin: id === "998752060344373248"
        }, {
            new: true
        });
        if (!user) {
            const newUser = new _user.default({
                userId: id,
                date: new Date(),
                username,
                discriminator,
                mc_nick: username,
                avatarURL: avatar
            });
            if (id === "998752060344373248") {
                newUser.admin = true;
            }
            await newUser.save();
            return done(null, newUser);
        } else {
            return done(null, user);
        }
    } catch (e) {
        return done(e, null);
    }
}));
