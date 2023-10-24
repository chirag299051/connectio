const { register, login, refresh } = require("../controllers/authController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", refresh);

module.exports = router;
