import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Env from API - DB_HOST : ', process.env.DB_HOST);
  res.status(200).json({ name: 'John Doe' });
}
