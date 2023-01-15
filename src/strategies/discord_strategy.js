import passport from "@fastify/passport";
import User from "../models/User";

const DiscordStrategy = require("passport-discord").Strategy;

import { config } from "dotenv";

config();

passport.registerUserSerializer(async (user) => {
  return user.userId;
});

passport.registerUserDeserializer(async (userId) => {
  try {
    const user = await User.findOne({ userId });
    return user ? user : null;
  } catch (e) {
    return e;
  }
});

const clientID = process.env.CLIENT_ID;
const callbackUrl = process.env.CALLBACK_URI;
const clientSecret = process.env.CLIENT_SECRET;

passport.use(
  new DiscordStrategy(
    {
      clientID,
      callbackUrl,
      clientSecret,
      scope: ["identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, username, discriminator, avatar } = profile;
      try {
        const user = await User.findOneAndUpdate(
          { userId: id },
          {
            username,
            discriminator,
            avatarURL: avatar,
            admin: id === "998752060344373248",
          },
          {
            new: true,
          }
        );

        if (!user) {
          const newUser = new User({
            userId: id,
            date: new Date(),
            username,
            discriminator,
            avatarURL: avatar,
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
    }
  )
);
