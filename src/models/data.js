import { Schema, models, model } from "mongoose";

const DataSchema = new Schema(
  {
    addressBook: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: Number,
    },
    currency: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Data = models?.Data || model("Data", DataSchema);

export default Data;
