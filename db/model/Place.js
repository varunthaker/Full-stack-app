import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: [Schema.Types.ObjectId], ref: "comment" },
});

// const commentSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   name: { type: String, required: true },
//   comment: { type: String, required: true },
// });

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

// const Comment =
//   mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Place;
