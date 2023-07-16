const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  phone: {
    type: String,
    required: [true, "Phone is Required"],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
