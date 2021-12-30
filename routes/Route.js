import express from "express";
import News from "../model/news.js";

const route = express.Router();

route.get("/", async (req, res) => {
  News.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
});

route.get("/news", async (req, res) => {
  try {
    const size = Number(req.query.size);
    const skip = Number(req.query.page);
    const data = await News.find({})
      .limit(size)
      .skip(size * skip);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

route.get("/news/:id", async (req, res) => {
  console.log("Call");
  try {
    const article = await News.findById(req.params.id);
    res.send(article);
  } catch (error) {
    res.send(error);
  }
});

route.post("/", async (req, res) => {
  const { title, author, description, url, link, publisher } = req.body;
  if (!title || !author || !description || !url || !link || !publisher) {
    return res.status(419).json({
      error: "All field are required",
    });
  }

  try {
    const news = new News(req.body);
    news.save();
    res.status(201).json({ message: "User register sucessfully" });
  } catch (err) {
    console.log(err);
  }
});

export default route;
