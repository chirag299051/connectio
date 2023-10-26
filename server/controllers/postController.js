const { handleUpload } = require("../middlewares/uploadFile");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports.createPost = async (req, res) => {
  const body = req.body;
  try {
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      const result = await Post.create({ ...body, img: cldRes.secure_url });

      res.status(200).json({ result });
    } else {
      const result = Post.create(body);
      res.status(200).json({ result });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Post updated successfully" });
    } else {
      res.status(403).json({ message: "You can only update your post" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await Post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "The post has been liked" });
    } else {
      await Post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "The post has been disliked" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ message: "Post fetched successfully", post });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getTimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const posts = await Post.find({ userId: currentUser._id });
    let friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json([...posts, ...friendPosts.flat(1)]);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUserPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};
