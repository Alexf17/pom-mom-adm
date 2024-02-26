import { ObjectId } from 'mongodb';
import Category from './Category';
import { Schema, model, models } from 'mongoose';

const productSchema = new Schema(
  {
    name: String,
    category: { type: ObjectId, ref: 'Category' },
    brand: Object,
    balance: String,
    isPopular: Boolean,
    isPromoted: Boolean,
    isHits: Boolean,
    freeDelivery: Boolean,
    description: String,
    vendorCode: String,
    price: Number,
    newPrice: Number,
    quantity: Number,
    image: Array,
    features: Object,
    holistic: Boolean,
    products: { type: ObjectId, ref: 'Category' },
  },
  { timestamps: true, versionKey: false }
);

const Product = models.Product || model('Product', productSchema);

export default Product;
