export const isAuth = (req, rep, done) => {
  if (!req.user)
    return rep
      .code(401)
      .send({
        status: 401,
        message: "Necesitas estar registrado para realizar esta acción",
      });
  return done();
};
