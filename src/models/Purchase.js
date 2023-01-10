import { Schema, Types, model } from 'mongoose';

const PurchaseSchema = new Schema({
    date: Date,
    charge: Number,
});

export default model('Purchase', PurchaseSchema);