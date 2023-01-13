import Kit from "../models/Kit";

export const getKits = async (req, rep) => {
  try {
    const kits = await Kit.find();
    return rep.send({ status: 200, kits });
  } catch (e) {
    return rep
      .code(400)
      .send({ status: 400, message: "Ocurrió un error inesperado" });
  }
};

export const purchaseKit = async (req, res) => {
    const { kit } = req.params;
    const foundKit = await Rango.findById(kit);
    if (!foundKit)
      return rep
        .code(404)
        .send({ status: 404, message: "El kit seleccionado no existe" });
    const user = req.user.populate("kit");
    if (user.funds < foundKit.price)
      return rep
        .code(403)
        .send({
          status: 403,
          message: "No tienes los fondos suficientes para comprar este kit",
        });
    user.kits.push(foundKit._id);
    await user.save();
    return rep.code(201).send({ status: 201, user });
}