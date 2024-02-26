import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '../../../db/mongodb-adapter';
import Credentials from 'next-auth/providers/credentials';
import connectMongo from '@/db/mongoose';
import Users from '@/models/User';
import { compare } from 'bcrypt';
import { SendGridProvider } from './sendgrid';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      async authorize(credentials, req) {
        connectMongo();

        const user = await Users.findOne({
          email: credentials.email,
        });
        if (!user) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }

        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        if (!checkPassword) {
          throw new Error("Username or Password doesn't match");
        }
        if (!user.emailVerified) {
          throw new Error('Email is not verified');
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    SendGridProvider({
      apiKey: process.env.SENDGRID_API_KEY, // Получаем API-ключ из переменной окружения
      from: process.env.EMAIL_FROM, // Адрес отправителя по умолчанию
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   const admins = process.env.ADMIN;

    //   if (!admins.includes(user.email)) {
    //     return false;
    //   }
    //   return true;
    // },
    async session({ session, token, user }) {
      return session;
    },
  },
};
export default NextAuth(authOptions);
