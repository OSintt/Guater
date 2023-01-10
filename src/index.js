const fastify = require("fastify")({ logger: true });

const start = async () => {
  await fastify.listen({ port: 3000 });
  fastify.log.info(
    `Servidor corriendo en el puerto ${fastify.server.address().port}`
  );
};

start();
