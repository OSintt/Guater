const fastify = require("fastifylññ")({ logger: true });

const start = async () => {
  await fastify.listen({ port: 3000 });
  fastify.log.info(
    `Ok server ${fastify.server.address().port}`
  );
};

start();
