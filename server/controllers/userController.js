const { handleUpload } = require("../middlewares/uploadFile");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.getAllUsers = async (req, res) => {
  try {
    const userId = req.params.userId;

    const users = await User.find({});
    const newUsers = users.filter((x) => x._id != userId);

    return res.status(200).json({ newUsers });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const username = req.query.username;
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { updatedAt, password, ...other } = user._doc;
    return res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let data = req.body;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);

      data = { ...data, profilePicture: cldRes.secure_url };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.userId === id || data.isAdmin) {
      const updatedUser = await User.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "Account deleted successfully", updatedUser });
    } else {
      return res
        .status(403)
        .json({ message: "You can only delete your account" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    return res
      .status(200)
      .json({ message: "friends fetched successfully", data: friendList });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports.follow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.following.includes(req.body.userId)) {
        await user.updateOne({ $push: { following: req.body.userId } });
        await currentUser.updateOne({ $push: { followers: req.params.id } });
        return res.status(200).json({ message: "User has been followed!" });
      } else {
        return res
          .status(403)
          .json({ message: "You already follow this user" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json({ message: "You cannot follow yourself!" });
  }
};

module.exports.unfollow = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { following: req.body.userId } });
        await currentUser.updateOne({ $pull: { followers: req.params.id } });
        return res.status(200).json({ message: "User has been unfollowed!" });
      } else {
        return res.status(403).json({ message: "You dont follow this user" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json({ message: "You cannot unfollow yourself!" });
  }
};
