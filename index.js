
export default async function handler(req, res) {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "キーワードがありません" });
  }

  const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;

  res.status(200).json({
    keyword,
    message: "これはAmazon検索URLのサンプルです",
    url: url
  });
}
