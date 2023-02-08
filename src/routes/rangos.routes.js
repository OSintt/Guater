import { getRoles, purchaseRole } from "../controllers/rango.controllers";
import { isAuth } from "../middlewares/auth.middlewares";

const rangosRoutes = (fastify, opts, done) => {
  fastify.get("/", getRoles);
  fastify.put(
    "/purchase/:rango",
    {
      preValidation: isAuth,
    },
    purchaseRole
  );
  done();
};

export default rangosRoutes;