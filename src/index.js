import("./utils/db");
import session from "@fastify/session";
import passport from "@fastify/passport";
import cookie from "@fastify/cookie";
import { config } from "dotenv";
import './strategies/discord_strategy';

config();

const fastify = require("fastify")({ logger: true });

fastify.register(cookie);
fastify.register(session, {
  cookieName: "discord.oauth",
  secret: process.env.COOKIE_SECRET,
  cookie: { secure: false, maxAge: 60000 * 60 * 24, },
  saveUninitialized: false
});
fastify.register(passport.initialize());
fastify.register(passport.secureSession());

const start = async () => {
  await fastify.listen({ port: 3001 });
  fastify.log.info(
    `Servidor corriendo en el puerto ${fastify.server.address().port}`
  );
};

start();
