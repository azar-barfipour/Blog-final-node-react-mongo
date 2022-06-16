const router = require("express").Router();
let Post = require("../models/post.model");

// Root route
router.route("/").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Route to add a new post
router.route("/posts/create").post((req, res) => {
  //Retrieve data for post
  const { title, body, image } = req.body;

  const comments = [];

  //Create a new Post and save it to DB
  const newPost = new Post({
    title,
    body,
    comments,
    image,
  });

  // Save the new post
  newPost
    .save()
    .then(() => res.json("Post Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//route to display a particular post
router.route("/:id").get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to add comments to a particular post
router.route("/posts/create/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.comments = req.body.comments;

      post
        .save()
        .then(() => res.json("Post Edited"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to edit a particular post
router.route("/edit/:id").post((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.title = req.body.title;
      post.body = req.body.body;
      post.comments = req.body.comments;

      post
        .save()
        .then(() => res.json("Post Edited"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to Delete a route
router.route("/:id").delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json("Post Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
