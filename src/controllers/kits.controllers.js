import Kit from '../models/Kit';
import boom from 'boom';

export const getKits = async (req, rep) => {
    try {
        const kits = await Kit.find();
        return rep.send(kits);
    } catch(e) {
        throw boom.boomify(err);
    }
}
