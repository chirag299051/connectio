const {
  updateUser,
  deleteUser,
  getUser,
  follow,
  unfollow,
  getFriends,
  getAllUsers,
} = require("../controllers/userController");
const { upload } = require("../middlewares/uploadFile");
const router = require("express").Router();

router.get("/", getUser);
router.get("/:userId/users", getAllUsers);
router.put("/:userId", upload.single("profilePicture"), updateUser);
router.delete("/:id", deleteUser);
router.get("/friends/:userId", getFriends);
router.put("/:id/follow", follow);
router.put("/:id/unfollow", unfollow);

module.exports = router;
