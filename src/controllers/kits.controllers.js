import Kit from '../models/Kit';

export const getKits = async (req, rep) => {
    try {
        const kits = await Kit.find();
        return rep.send(kits);
    } catch(e) {
        return rep.code(400).send({ status: 400, message: 'Ocurrió un error inesperado' });
    }
}
