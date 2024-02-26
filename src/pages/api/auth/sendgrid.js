import nodemailer from 'nodemailer';
import EmailProvider from 'next-auth/providers/email';

const SendGridProvider = options =>
  EmailProvider({
    server: {
      host: 'smtp.sendgrid.net',
      port: 465,
      auth: {
        user: 'apikey', // Имя пользователя SendGrid API
        pass: process.env.SENDGRID_API_KEY,
      },

      tls: {
        rejectUnauthorized: false, // Отключение проверки сертификата (не рекомендуется в продакшене)
      },
    },
    from: options.from,
  });

var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // Имя пользователя SendGrid API
    pass: process.env.SENDGRID_API_KEY,
  },
});

export { SendGridProvider, transporter };
