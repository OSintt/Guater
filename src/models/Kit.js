import { Schema, model } from 'mongoose';

const KitSchema = new Schema({
    title: {
        required: true,
        unique: true,
        type: String
    },
    description: {
        required: true,
        unique: true,
        type: String
    },
    price: Number,
    sale: {
        type: Boolean,
        default: false
    },
    sale_percent: Number,
}, {
    versionKey: false
});

export default model('Kit', KitSchema);