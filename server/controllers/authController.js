const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userCheck = await User.find({ email });

    if (userCheck.length > 0) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    cryptedPassword = await new bcrypt.hash(password, 12);
    const user = await new User({
      username,
      email,
      password: cryptedPassword,
    }).save();

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Email does not exist" });

    const check = await bcrypt.compare(password, user.password);

    if (!check) return res.status(400).json({ message: "Incorrect password!" });

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// check for jwt token
module.exports.refresh = async (req, res) => {
  // ** Get token from header
  const authToken = req.headers["authorization"];

  // ** Checks if the token is valid or expired
  try {
    const decoded = jwt.verify(authToken, secret);
    if (decoded) {
      // ** If token is valid do nothing
      const userId = decoded._id;

      // ** Get user that matches id in token
      const results = await User.findById(userId);

      const user = { ...results.toObject(), password: undefined };
      // ** return 200 with user data
      const payload = { authToken, user };

      return res.status(200).json(payload);
    }

    // ** If  token found
    res.status(401).json({ message: "Invalid User" });
  } catch (err) {
    // ** If token is expired or not token found the jwt verify will throw an error
    return res.status(401).json({ message: "Invalid User" });
  }
};
