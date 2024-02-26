import { Context } from '@/components/Context/CartContext';
import connectMongo from '@/db/mongoose';
import { Order } from '@/models/Order';
import Product from '@/models/Product';
import axios from 'axios';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await connectMongo();
  try {
  } catch (error) {
    console.error('Connection Failed', error);
    return res
      .status(500)
      .json({ error: 'Failed to connect to the database.' });
  }

  const { name, city, address, shipComp, cartProducts, email } = req.body;

  const productsId = cartProducts;
  // const productsId = products.split(',');
  const uniqueId = [...new Set(productsId)];
  const productsInfo = await Product.find({ _id: uniqueId });

  if (req.method === 'POST') {
    let order = [];
    for (const id of uniqueId) {
      const productInfo = productsInfo.find(p => p._id.toString() === id);
      const quantity = productsId.filter(p => p === id)?.length || 0;
      if (quantity > productInfo.balance) {
        return res.status(400).json({
          error: `Not enough quantity available for ${productInfo.name} , maximum available ${productInfo.balance}.`,
        });
      }

      const updateBalance = await Product.findOneAndUpdate(
        { _id: productInfo._id },
        { balance: productInfo.balance - quantity }
      );

      /* TODO if status of order != successful , we need to return quantity  in product balance */

      if (quantity > 0 && productInfo) {
        order.push({
          quantity,
          price_data: {
            currency: 'UAH',
            product_data: {
              name: productInfo.name,
            },
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }

    const newOrder = await Order.create({
      order,
      name,
      city,
      address,
      shipComp,
      client: email,
      paid: false,
    });

    const result = await stripe.checkout.sessions.create({
      line_items: order,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.SUCCESS_URL + '/cart?success=true',
      cancel_url: process.env.SUCCESS_URL + '/cart?canceled=true',
      metadata: { orderId: newOrder._id.toString() },
    });

    res.json({ url: result.url });
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
