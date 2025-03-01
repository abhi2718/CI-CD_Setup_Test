const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  address: { type: String, required: true },
});

const CompanySchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: LocationSchema, required: true },
});

const UserSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  registered: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  eyeColor: { type: String, required: true },
  favoriteFruit: { type: String, required: true },
  company: { type: CompanySchema, required: true },
  tags: { type: [String], default: [] },
  ratings: { type: [Number], default: [] },
}, {
  timestamps:true
});
UserSchema.index({
  name: "text",
  "company.email": "text",
});
const User = mongoose.model("User", UserSchema);

module.exports = User;

