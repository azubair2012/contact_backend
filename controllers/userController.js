const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  //check if user already exists in db or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists!");
  }

  // hashing the password
  hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ email: newUser.email });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.json({ message: "Register!" });
});

//@desc LogIn a user
//@route POST /api/users/register
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mendatory!");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //Web Token Provided for 15 mins
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("User not found!");
  }
});

//@desc current user
//@route POST /api/users/currentuser
//@access public
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc Updating a user
//@route POST /api/users/update
//@access public

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

module.exports = { registerUser, loginUser, currentUser, updateUser };
