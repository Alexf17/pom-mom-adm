import connectMongo from '@/db/mongoose';

import Product from '@/models/Product';

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

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(
        await Product.findOne({ _id: req.query.id })
          .populate('category')
          .populate('products')
      );
    } else {
      res.json(await Product.find().populate('category'));
    }
  }

  if (method === 'POST') {
    const {
      name,
      brand,
      category,
      description,
      isPopular,
      isPromoted,
      isHits,
      products,
      price,
      newPrice,
      freeDelivery,
      weight,
      image,
      features,
      holistic,
      balance,
      vendorCode,
    } = req.body;
    console.log('req.body', req.body);
    const NewProduct = await Product.create({
      name,
      brand,
      category,
      description,
      products,
      price,
      newPrice,
      isPopular,
      isPromoted,
      isHits,
      freeDelivery,
      weight,
      image,
      features,
      holistic,
      balance,
      vendorCode,
    });

    res.json(NewProduct);
  }

  if (method === 'PUT') {
    const {
      name,
      brand,
      category,
      description,
      products,
      price,
      newPrice,
      isPopular,
      isPromoted,
      isHits,
      freeDelivery,
      weight,
      image,
      features,
      holistic,
      balance,
      vendorCode,
      _id,
    } = req.body;

    const NewProduct = await Product.updateOne(
      { _id },
      {
        name,
        brand,
        category,
        description,
        products,
        price,
        newPrice,
        isPopular,
        isPromoted,
        isHits,
        freeDelivery,
        weight,
        image,
        features,
        holistic,
        balance,
        vendorCode,
      }
    );

    res.json(NewProduct);
  }

  // if (method === 'PATCH') {
  //   const { name, category, price, balance, image, _id, features } = req.body;
  //   console.log('productsToUpdate', name);
  //   const productsToUpdate = price;
  // try {
  //   for (const productToUpdate of productsToUpdate) {
  //     const { _id, balance } = productToUpdate;

  //     const updatedProduct = await Product.findOneAndUpdate(
  //       { _id },
  //       { balance }
  //     );
  //   }

  //   res.json.status = 200;
  // } catch (error) {
  //   console.error('Error updating product balance', error);
  //   res.status(500).json({ error: 'Error updating product balance.' });
  // }
  //   res.json(productsToUpdate);
  // }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query.id });
      res.json(true);
    }
  }
}
