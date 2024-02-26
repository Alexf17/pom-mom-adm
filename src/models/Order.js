const { Schema, model, models } = require('mongoose');

const OrderSchema = new Schema(
  {
    order: Object,
    city: String,
    address: String,
    shipComp: String,
    paid: Boolean,
    client: String,
  },
  { timestamps: true }
);

export const Order = models.Order || model('Order', OrderSchema);
