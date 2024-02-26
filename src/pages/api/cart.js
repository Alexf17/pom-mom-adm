import connectMongo from '@/db/mongoose';
import Product from '@/models/Product';

export default async function handler(req, res) {
  try {
    await connectMongo();
  } catch (error) {
    console.error('Connection Failed', error);
    return res
      .status(500)
      .json({ error: 'Failed to connect to the database.' });
  }

  const id = req.body.id;

  res.json(await Product.find({ _id: id }));
}
