const kitsRoutes = [
    {
        url: "/kits",
        method: 'GET',
        handler: (request, reply) => {
            reply.send('hello worold');
        }
    }
]

export default kitsRoutes;