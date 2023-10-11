import dbConnect from "../../../../db/connect";
import Place from "../../../../db/model/Place";

export default async function handler(request, response) {
  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    await dbConnect();
    const place = await Place.findById(id).populate("comments");
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    return response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    await Place.findByIdAndUpdate(id, {
      $set: request.body,
    });
    return response.status(200).json({ status: `Place ${id} updated.` });
  }

  if (request.method === "DELETE") {
    // await dbConnect()
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} succesfully deleted` });
  }
}
