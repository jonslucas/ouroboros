import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  columns: [new Schema({
    title: String,
    items: [new Schema({
      label: String,
      comments: [Schema.Types.ObjectId],
      assignedTo: Schema.Types.ObjectId,
      watchers: [Schema.Types.ObjectId],
      tags: [Strings],
    })]
  })],
});

module.exports = model('Board', boardSchema);
