import mongoose from "mongoose";
const { Schema } = mongoose;
const accommodationSchemas = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bookingPricePerDay: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  hasAC: {
    type: Boolean,
    default: false,
  },
  hasPrivateParking: {
    type: Boolean,
    default: false,
  },
  hasWifi: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
export const AccommodationModel = mongoose.model("Accommodation", accommodationSchemas, "accommodation");
 
