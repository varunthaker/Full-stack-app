import dbConnect from "../../../db/connect";
import Place from "../../../db/model/Place";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const places = await Place.find();
    response.status(200).json(places);
  } else {
    response.status(404).json({ message: "Data not Found" });
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      console.log(placeData);
      await Place.create(placeData);
      response.status(201).json({ status: "Place created" });
    } catch (err) {
      console.log(err);
      response.status(404).json({ error: err.message });
    }
  }
}
