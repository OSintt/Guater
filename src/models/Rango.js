import { Schema, Typesmodel } from "mongoose";

const RangoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: Number,
    description: String,
    sale: {
      type: Boolean,
      default: false,
    },
    rango_value: String,
    sale_percent: Number,
  },
  {
    versionKey: false,
  }
);

export default model("Rango", RangoSchema);
