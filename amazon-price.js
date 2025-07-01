
import cheerio from "cheerio";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url || !url.includes("amazon.co.jp")) {
    return res.status(400).json({ error: "Invalid Amazon URL" });
  }

  try {
    const html = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36",
      },
    }).then((r) => r.text());

    const $ = cheerio.load(html);
    let priceText =
      $("#priceblock_ourprice").text() ||
      $("#priceblock_dealprice").text() ||
      $("#priceblock_saleprice").text();

    if (!priceText) {
      return res.status(404).json({ error: "価格が見つかりませんでした" });
    }

    const price = priceText.replace(/[￥,円\s]/g, "").trim();
    res.status(200).json({ price });
  } catch (e) {
    res.status(500).json({ error: "Fetch error", detail: e.message });
  }
}
