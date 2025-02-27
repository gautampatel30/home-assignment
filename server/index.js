import express from "express";
const PORT = 59232;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/whatsapp", (req, res) => {
  res.json({
    stauts: "ok",
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
