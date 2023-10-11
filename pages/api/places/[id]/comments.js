import dbConnect from "../../../../db/connect";
import Place from "../../../../db/model/Place";
import Comment from "../../../../db/model/Comment";

export default async function handler(request, response) {
  const { id } = request.query;
  if (!id) {
    return;
  }

  if (request.method === "POST") {
    try {
      dbConnect();
      const newComment = await Comment.create(request.body);
      await Place.findByIdAndUpdate(
        id,
        { $push: { comments: newComment._id } },
        { new: true }
      );
      response.status(200).json({ status: "comment created" });
    } catch (error) {
      response.status(404).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      const commentToDelete = await Comment.findByIdAndDelete(request.body.id);
      await Place.findByIdAndUpdate(id, {
        $pull: { comments: commentToDelete._id },
      });
      response.status(200).json({ succes: "comment successfully deleted" });
    } catch (error) {
      response.status(404).json({ error: error.message });
    }
  }
}
