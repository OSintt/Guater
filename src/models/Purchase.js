import { Schema, Typesmodel } from 'mongooose';

const PurchaseSchema = new Schema({
    date: Date,
    charge: Number,
    name: Text,
});

export default model('Purchase', PurchaseSchema);