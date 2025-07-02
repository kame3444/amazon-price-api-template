export default async function handler(req, res) {
  const keyword = req.query.keyword || "ナイキ";
  res.status(200).json({ message: `検索キーワードは「${keyword}」です。` });
}
