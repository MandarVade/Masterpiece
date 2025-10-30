import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  notes: String
}, {
  timestamps: true
});

export const Order = mongoose.model("Order", OrderSchema);
