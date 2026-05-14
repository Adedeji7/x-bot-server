app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.options("/tweet", cors());
const express = require("express");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");

const app = express();
app.use(cors());
app.use(express.json());

const client = new TwitterApi({
  appKey: "bpwrhbC8QFqW78c8aRMeRMZ18",
  appSecret: "rN0dx8uOFwNKCbwk38YgmwTcPBfYGl6a5rtM8R1bG7sTA5jNQh",
  accessToken: "1522548812425875462-qqzroS9JQeHhaVaiYFBBVlx7rqJZ2e",
  accessSecret: "RYlfQlT5Iygj0erot6K2qPpEEN2lpgeiMtzpUmAJyLB9s",
});

app.post("/tweet", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    const result = await client.v2.tweet(text);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => res.send("X Bot Server running!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
