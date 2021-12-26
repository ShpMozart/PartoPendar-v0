const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const path = require("path");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/User");
const AppError = require("./../utils/appError");

//add user to db
const createUser = async ({
  username,
  password,
  firstName,
  lastName,
  role,
  passwordChanged,
}) => {
  return await User.create({
    username,
    password,
    firstName,
    lastName,
    role,
    passwordChanged,
  });
};
//update user password in db
const updateUserPassword = async (user, { password, passwordChanged }) => {
  return await user.update({
    password,
    passwordChanged,
  });
};
//get user from db
const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

//sign jwt token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//save jwt in cookie and route to panel.html or password.html
const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  if (!user.dataValues.passwordChanged) {
    const showPath = path.join(__dirname + "/../public/password.html");
    res.sendFile(showPath);
  } else {
    const loader = path.join(__dirname + "/../public/loader.html");
    res.sendFile(loader);
  }
};

//register user (permission:admin)
exports.signup = catchAsync(async (req, res, next) => {
  const user = await getUser({ username: req.body.username });
  if (user) return res.status(409).json({ message: "username already exists" });

  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    createUser({
      username: req.body.username,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      passwordChanged: false,
    }).then((user) => {
      user.password = undefined;
      res.status(200).json({ user, msg: "account created successfully" });
    });
  });
});
//login user (all roles)
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    let user = await getUser({ username: username });
    if (!user) {
      return res.status(401).json({ message: "No such user found" });
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        res.status(403).json({ message: "incorrect password" });
      }
      if (result) {
        createSendToken(user, 200, req, res);
      } else {
        res.status(403).json({ message: "incorrect password" });
      }
    });
  }
});
//check if user logged in
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await User.findByPk(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});
//update user password when first time logged in
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await getUser({ username: req.user.dataValues.username });
  // 2) If so, update password
  bcrypt.hash(req.body.password, null, null, (err, hash) => {
    updateUserPassword(user, {
      password: hash,
      passwordChanged: true,
    }).then((user) => {
      createSendToken(user, 200, req, res);
    });
  });
  // User.findByIdAndUpdate will NOT work as intended!
  // 3) Log user in, send JWT
});
