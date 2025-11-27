import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [20, "Name must be Max length is 20 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      // validate: {
      //   validator: function (v) {
      //     if (!v) return true;
      //     return validator.isStrongPassword(v, {
      //       minLength: 5,
      //       maxlength: 15,
      //       minLowercase: 1,
      //       minUppercase: 1,
      //       minNumbers: 1,
      //       minSymbols: 1,
      //     });
      //   },
      // },
    },
    googleId: {
      type: String,
      default: null,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    gender: { type: String, enum: ["male", "female"], default: "male" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password") || !user.password) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model("Users", userSchema);
