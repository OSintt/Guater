import { Schema, Types, model } from "mongoose";

const RangoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: Number,
    sale: {
      type: Boolean,
      default: false,
    },
    sale_percent: Number,
    position: {
      unique: true,
      type: Number
    }
  },
  {
    versionKey: false,
  }
);

export default model("Rango", RangoSchema);
