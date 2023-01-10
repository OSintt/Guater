import { me, login } from "../controllers/auth.controllers";
import { isAuth } from "../middlewares/auth.middlewares";
import passport from "@fastify/passport";

module.exports = function (fastify, opts, done) {
  fastify.get(
    "/login",
    { preValidation: passport.authenticate("discord") },
    async (req, rep) => {}
  );

  fastify.get(
    "/@me",
    {
      preValidation: isAuth,
    },
    me
  );

  fastify.get(
    "/redirect",
    {
      preValidation: passport.authenticate("discord", {
        failureRedirect: "/forbidden",
        successRedirect: "/dashboard",
      }),
    },
    login
  );

  fastify.get("/logout", async (req, rep) => {
    if (req.user) {
      req.logout();
      rep.redirect("/");
    } else {
      rep.redirect("/");
    }
  });

  done();
};
