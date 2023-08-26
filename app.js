const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  const readUsers = fs.readFileSync("./data/users.json");
  const parseUsers = JSON.parse(readUsers);
  res.json(parseUsers);
});

app.get("/credit-card", (req, res) => {
  const readCard = fs.readFileSync("./data/credit-card.json");
  const parseCard = JSON.parse(readCard);
  res.json(parseCard);
});

app.post("/users", (req, res) => {
  const data = req.body;
  console.log("Gelen kullanıcı verileri", data);

  const readUsers = fs.readFileSync("./data/users.json", "utf-8");
  const parseUsers = JSON.parse(readUsers);

  parseUsers.push(data);

  const updatedUsers = JSON.stringify(parseUsers, null, 2);
  fs.writeFileSync("./data/users.json", updatedUsers, "utf-8");

  console.log("Veri kaydetme başarılı");
  res.status(200).json({ message: "veri başarıyla kaydedildi" });
});

app.post("/credit-card", (req, res) => {
  const data = req.body;
  console.log("Gelen kart bilgileri", data);

  const readCard = fs.readFileSync("./data/credit-card.json", "utf-8");
  const parseCard = JSON.parse(readCard);
  parseCard.push(data);

  const updatedCard = JSON.stringify(parseCard, null, 2);
  fs.writeFileSync("./data/credit-card.json", updatedCard, "utf-8");

  console.log("Veri kaydetme işlemi başarılı");
  res.status(200).json({ message: "Veri başarıyla kaydedildi" });
});

app.listen(PORT, () => {
  console.log(`Express api çalışıyor:${PORT}`);
});
