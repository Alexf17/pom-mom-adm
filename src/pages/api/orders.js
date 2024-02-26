import connectMongo from '@/db/mongoose';
import { Order } from '@/models/Order';

export default async function handler(req, res) {
  try {
    await connectMongo();
  } catch (error) {
    console.error('Connection Failed', error);
    return res
      .status(500)
      .json({ error: 'Failed to connect to the database.' });
  }

  const response = await Order.find();

  res.json(response);
}
