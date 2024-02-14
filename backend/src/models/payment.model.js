import mongoose from "mongoose";

const paymentByUsersSchema = new mongoose.Schema({
  paymentBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },

  paymentAmount: {
    type: Number,
    required: true,
  },

  transactionId: {
    type: String,
    required: true,
    unique: true,
  },

  paymentMethod: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

const PaymentsByUsers = mongoose.model('PaymentsByUsers', paymentByUsersSchema);

export default PaymentsByUsers;
