// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Test API which returns "John Doe" if API call was successful
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
