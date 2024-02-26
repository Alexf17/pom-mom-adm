import connectMongo from '@/db/mongoose';
import Brand from '@/models/Brand';

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
    const { name, manufacturerCountry, img } = req.body;

    const cleanedName = name.toLowerCase().replace(/\s+/g, '');
    const checkBrand = await Brand.findOne({ name: cleanedName });

    if (checkBrand) {
      return res
        .status(501)
        .json({ error: 'Brand with this name already exists.' });
    }

    const NewBrand = await Brand.create({
      name,
      manufacturerCountry,
      image: img,
    });

    res.json(NewBrand);
  }

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Brand.findOne({ _id: req.query.id }));
    } else {
      res.json(await Brand.find());
    }
  }

  if (method === 'DELETE') {
    const { _id } = req.query;
    await Brand.deleteOne({ _id });
    res.json(true);
  }

  if (method === 'PUT') {
    const { name, manufacturerCountry, img, _id } = req.body;

    await Brand.updateOne(
      { _id },
      {
        name,
        manufacturerCountry,
        image: img,
      }
    );

    res.json(true);
  }
}
