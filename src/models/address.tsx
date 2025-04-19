import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    addressUrl: {
      type: String,
      required: true,
    },
    extractedText: {
      type: [String], 
      required: true,
    },
    addressList: {
      type: [String], 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);

export interface Address {
  addressUrl: string;
  extractedText: string[];
  addressList: string[];
  correctAddress: string;
}

export default Address;
