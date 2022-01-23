const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");
const File = require("./../models/File");
const User = require("./../models/User");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserAvatar = upload.single("avatar");
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.files.avatar.name = `${req.user._id}.jpeg`;

  await sharp(req.files.avatar.data)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/persons/${req.files.avatar.name}`);

  const user = req.user;
  const newUser = await user.update({
    image: `public/img/persons/${req.files.avatar.name}`,
  });
  next();
});
