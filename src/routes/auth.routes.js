import {
  me,
  login,
  changeMcNick,
  getMyPurchases,
} from "../controllers/auth.controllers";
import { isAuth } from "../middlewares/auth.middlewares";
import passport from "@fastify/passport";

const authRoutes = (fastify, opts, done) => {
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
    "/my-purchases",
    {
      preValidation: isAuth,
    },
    getMyPurchases
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

  fastify.put(
    "/change-mc",
    {
      preValidation: isAuth,
    },
    changeMcNick
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

export default authRoutes;
