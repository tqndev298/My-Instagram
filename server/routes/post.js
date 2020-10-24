const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = require("../models/post");

router.post("/createPost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  //   console.log(req.user);
  //   res.send("Ok");
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
