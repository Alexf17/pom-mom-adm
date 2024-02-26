import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    emailVerified: String,
  },
  {
    versionKey: false,
    defaults: {
      emailVerified: 'false',
    },
  }
);

// const Users = model('user', userSchema);
const Users = models.user || model('user', userSchema);

export default Users;
