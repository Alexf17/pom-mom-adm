import { ObjectId } from 'mongodb';
import { Schema, model, models } from 'mongoose';

const brandSchema = new Schema(
  {
    name: String,
    manufacturerCountry: String,
    image: Array,
  },
  { versionKey: false, timestamps: true }
);

const Brand = models.Brand || model('Brand', brandSchema);

export default Brand;
