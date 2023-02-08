import("./utils/db");
import session from "@fastify/session";
import passport from "@fastify/passport";
import cookie from "@fastify/cookie";
import { config } from "dotenv";
import cors from "@fastify/cors";
import "./strategies/discord_strategy";
import { createRangos, createKits } from "./lib/createData";
config();

const fastify = require("fastify")({ logger: true });

//middleware
fastify.register(cors, { origin: "http://localhost:3000", credentials: true });

//auth
fastify.register(cookie);
fastify.register(session, {
  cookieName: "discord.oauth",
  secret: process.env.COOKIE_SECRET,
  cookie: { secure: false, maxAge: 60000 * 60 * 24 },
  saveUninitialized: false,
});
fastify.register(passport.initialize());
fastify.register(passport.secureSession());

//register routes
fastify.register(require("./routes/auth.routes"), { prefix: "/api/auth" });
fastify.register(require("./routes/rangos.routes"), { prefix: "/api/rangos" });
fastify.register(require("./routes/kits.routes"), { prefix: "/api/kits" });
fastify.register(require("./routes/funds.routes"), {
  prefix: "/api/purchases",
});
//start server
const start = async () => {
  await fastify.listen({ port: process.env.PORT || 3001 });
  fastify.log.info(
    `Servidor corriendo en el puerto ${fastify.server.address().port}`
  );
  //createKits();
  //createRangos();
};

start();
