import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  boards: {
    type: [Schema.Types.ObjectId],
    default: [],
  }
});

module.export = model('User', userSchema);
