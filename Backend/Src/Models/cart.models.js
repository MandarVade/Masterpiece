import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

CartSchema.pre("save", async function (next) {
  if (this.isModified("items")) {
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  next();
});

export const Cart = mongoose.model("Cart", CartSchema);
