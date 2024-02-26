import connectMongo from '@/db/mongoose';
import Category from '@/models/Category';

export default async function handler(req, res) {
  const method = req.method;

  try {
    await connectMongo();
  } catch (error) {
    console.error('Connection Failed', error);
    return res
      .status(500)
      .json({ error: 'Failed to connect to the database.' });
  }

  if (method === 'POST') {
    const { name, parentCategory, features } = req.body;
    const newCategory = await Category.create({
      title,
      parentCategory: parentCategory || undefined,
      features,
    });
    res.json(newCategory);
  }

  if (method === 'PUT') {
    const { title, parentCategory, _id, features, products } = req.body;

    const updatedCategory = await Category.updateOne(
      { _id },
      { title, products, parentCategory: parentCategory || undefined, features }
    );
    res.json(updatedCategory);
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parentCategory'));
  }

  if (method === 'DELETE') {
    const { _id } = req.query;

    await Category.deleteOne({ _id });
    res.json('deleted');
  }
}
