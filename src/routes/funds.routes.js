import fastifyMongodb from "@fastify/mongodb";
import {
  createOrder,
  captureOrder,
  cancelOrder,
  getPurchases,
} from "../controllers/funds.controllers";
import { isAdmin, isAuth } from "../middlewares/auth.middlewares";

const purchaseRoutes = (fastify, opts, done) => {
  fastify.get(
    "/add-funds/:funds_added",
    {
      preValidation: isAuth,
    },
    createOrder
  );

  fastify.get('/failed', cancelOrder);
  fastify.get('/success', captureOrder);
  fastify.get('/get-purchases', {
    preValidation: [isAuth, isAdmin]
  }, getPurchases);
  done();
};

export default purchaseRoutes;
