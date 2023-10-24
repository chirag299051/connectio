const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  getTimeline,
  getUserPosts,
} = require("../controllers/postController");
const { upload } = require("../middlewares/uploadFile");

const router = require("express").Router();

router.post("/", upload.single("img"), createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id", getPost);
router.get("/timeline/:userId", getTimeline);
router.get("/profile/:username", getUserPosts);

module.exports = router;
