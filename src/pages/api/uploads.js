import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multiparty from 'multiparty';
import { nanoid } from 'nanoid';
import fs from 'fs';
import mime from 'mime-types';
import { useState } from 'react';

export default async function Upload(req, res) {
  const form = new multiparty.Form();
  const id = nanoid();

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFileName = id + '.' + ext;

    await client.send(
      new PutObjectCommand({
        Bucket: 'pop-mom',
        Key: newFileName,
        Body: fs.readFileSync(file.path),
        ACL: 'public-read',
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `http://pop-mom.s3.amazonaws.com/${newFileName}`;
    links.push(link);
  }
  return res.json({ links });
}
// const client = new S3Client({
//   region: ' eu-north-1',
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   },
// });

// form.parse(req, (err, fields, files) => {
//   console.log('Uploading', files);
//   return files;
// });
// for (const file of files.file) {
//   const ext = file.originalFilename.split('.').pop();
//   console.log('Extension', ext);
//   await client.send(
//     new PutObjectCommand({ Bucket: 'pop-mom', Key: 'pop-mom' })
//   );
// }
// res.json('200');
// for (const file of upl.file) {
//   const ext = file.originalFilename.split('.').pop();
//   console.log('Extension', ext);
//   console.log('File', file);
//   await client.send(
//     new PutObjectCommand({ Bucket: 'pop-mom', Key: 'pop-mom' })
//   );
// }

export const config = {
  api: { bodyParser: false },
};
