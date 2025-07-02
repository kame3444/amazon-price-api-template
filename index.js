
import { default as handler } from '../amazon-price.js';

export default async function (req, res) {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'キーワードが必要です' });
  }

  const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;
  req.query.url = url;
  return handler(req, res);
}
