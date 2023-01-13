export const isAuth = (req, rep, done) => {
  if (!req.user)
    return rep.code(401).send({
      status: 401,
      message: "Necesitas estar registrado para realizar esta acción",
    });
  return done();
};

export const isAdmin = (req, rep, done) => {
  if (!req.user.admin)
    return rep
      .code(403)
      .send({
        status: 403,
        message: "No tienes lo permisos necesarios para realizar esta acción",
      });
  return done();
};
