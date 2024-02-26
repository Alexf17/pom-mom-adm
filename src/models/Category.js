import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const categorySchema = new Schema(
  {
    title: String,
    parentCategory: { type: ObjectId, ref: 'Category' },
    products: String,
    features: Array,
  },
  { versionKey: false }
);

const Category = models.Category || model('Category', categorySchema);

export default Category;
