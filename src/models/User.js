import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  pass: {
    type: String,
    required: true,
  },
  boards: {
    type: [Schema.Types.ObjectId],
  }
});

module.exports = model('User', userSchema);
