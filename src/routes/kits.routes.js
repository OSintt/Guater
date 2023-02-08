import { getKits, purchaseKit } from "../controllers/kits.controllers";
import { isAuth } from "../middlewares/auth.middlewares";

const kitsRoutes = (fastify, opts, done) => {
  fastify.get("/", getKits);
  fastify.put(
    "/purchase/:kit",
    {
      preValidation: isAuth,
    },
    purchaseKit
  );
  done();
};

export default kitsRoutes;
