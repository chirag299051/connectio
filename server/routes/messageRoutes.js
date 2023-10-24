const { add, get } = require("../controllers/messageController");

const router = require("express").Router();

module.exports = router;

router.post("/", add);

router.get("/:conversationId", get);
