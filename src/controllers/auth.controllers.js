import User from "../models/User";

const login = (req, rep) => {
    rep.redirect('/dashboard');
}

const me = (req, rep) => {
    rep.send(req.user);
}

const changeMcNick = async (req, rep) => {
    const { new_nick } = req.body;
    if (!new_nick) return rep.code(401).send({ status: 401, message: 'Olvidaste ingresar tu nuevo nick' });
    if (typeof new_nick !== 'string') return rep.code(400).send({ status: 400, message: 'Tipo de parámetro inválido' });
    new_nick = new_nick.trim();
    if (new_nick.length <= 1) return rep.code(409).send({ status: 409, message: 'No puedes tener un nick tan corto' });
    if (new_nick.length > 32) return rep.code(409).send({ status: 409, message: 'No puedes tener un nick tan largo' });
    const user = await User.findOneAndUpdate({ userId: req.user.userId }, {
        minecraft_username: new_nick
    });
    await user.save();
    return rep.code(201).send({ status: 201, user, new_nick });
}

export {
    me,
    login,
    changeMcNick
};