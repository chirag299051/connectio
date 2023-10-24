const router = require("express").Router();
const {
  newConv,
  getConv,
  findConvo,
} = require("../controllers/conversationController");

router.post("/", newConv);
router.get("/:userId", getConv);
router.get("/find/:firstUserId/:secondUserId", findConvo);

module.exports = router;
