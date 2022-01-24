const { Schema, model, ObjectId } = require("mongoose");

// mongoose create id by default, so starting from email
//associate the user entity with the file entity on the last line (file: )
// this is an array where each object has the type ObjectID and and refers to the entity 'File'
const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  diskSpase: { type: Number, default: 1024 ** 3 * 10 },
  userSpace: { type: Number, default: 0 },
  avatar: { type: String },
  file: [{ type: ObjectId, ref: "File" }],
});

// exporting model User

module.exports = model("User", User);
