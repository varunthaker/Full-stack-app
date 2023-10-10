import dbConnect from "../../../../db/connect";
import Place from "../../../../db/model/Place";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    await dbConnect();
    const place = await Place.findById(id);
    // const comment = place?.comments;
    // const allCommentIds = comment?.map((comment) => comment.$oid) || [];
    // const comments = await Place.filter((comment) =>
    //   allCommentIds.includes(comment._id.$oid)
    // );
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "DELETE") {
    // await dbConnect()
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} succesfully deleted` });
  }
}
