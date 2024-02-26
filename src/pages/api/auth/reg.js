import { hash } from 'bcrypt';
import connectMongo, { mongooseConnect } from '../../../db/mongoose';
import Users from '@/models/User';

import mongoose from 'mongoose';
import clientPromise from '../../../db/mongodb-adapter';

export default async function handler(req, res) {
  // mongoose.connect(clientPromise.uri);
  // mongoose.Promise = clientPromise;

  //  await mongooseConnect();

  connectMongo().catch(error => res.json({ error: 'Connection Failed...!' }));

  if (req.method === 'POST') {
    // console.log('body', req.body);
    const { name, email, password } = req.body;

    const checkUser = await Users.findOne({ email });
    if (checkUser)
      return res.status(404).json({ message: 'User already in database' });

    const NewUser = await Users.create({
      name,
      email,
      password: await hash(password, 12),
    });

    res.status(200).json({ status: true, user: NewUser });
  }
}
