import Rango from "../models/Rango";

const getRoles = async (req, rep) => {
  const rangos = await Rango.find();
  return rep.send({ status: 200, rangos });
};

const purchaseRole = async (req, rep) => {
  const { rango } = req.params;
  const foundRango = await Rango.findById(rango);
  if (!foundRango)
    return rep
      .code(404)
      .send({ status: 404, message: "El rango seleccionado no existe" });
  const user = req.user.populate("rango");
  if (user.rango.position >= rango)
    return rep
      .code(404)
      .send({
        status: 404,
        message:
          "Estás intentando comprar un rango inferior al que tienes actualmente",
      });
  if (user.funds < foundRango.price)
    return rep
      .code(403)
      .send({
        status: 403,
        message: "No tienes los fondos suficientes para comprar este rango",
      });
  user.rango = foundRango._id;
  await user.save();
  return rep.code(201).send({ status: 201, user });
};

export { getRoles, purchaseRole };
