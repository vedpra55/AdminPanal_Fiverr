import dbConnect from "@/config/mongodb";
import Data from "@/models/data";

dbConnect();
export default async function handler(req, res) {
  if (req.method == "GET") {
    const data = await Data.find({});
    res.status(200).json({ data });
  }
  if (req.method === "POST") {
    const {
      addressBook,
      name,
      address,
      city,
      state,
      country,
      postalCode,
      currency,
      id,
    } = req.body;

    if (id) {
      const data = await Data.findOne({ _id: id });
      return res.status(200).json({ data });
    }

    const pc = parseInt(postalCode);

    await Data.create({
      addressBook,
      name,
      address,
      state,
      country,
      postalCode: pc,
      currency,
      city,
    });

    res.status(200).json({ data: true });
  }
  if (req.method === "PUT") {
    const {
      id,
      addressBook,
      name,
      address,
      city,
      state,
      country,
      postalCode,
      currency,
    } = req.body;

    const data = await Data.findOne({ _id: id });

    data.addressBook = addressBook || data.addressBook;
    data.name = name || data.name;
    data.address = address || data.address;
    data.city = city || data.city;
    data.state = state || data.state;
    data.country = country || data.country;
    data.postalCode = postalCode || data.postalCode;
    data.currency = currency || data.currency;

    data.save();

    res.status(200).json({ data: true });
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await Data.deleteOne({ _id: id });
    res.status(200).json({ data: "ok" });
  }
}
