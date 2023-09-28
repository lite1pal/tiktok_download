// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { main } from "./index";
import fs from "fs";
import path from "path";

type Data =
  | {
      data:
        | string
        | {
            url: string;
            id: string;
          }
        | undefined;
    }
  | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { inputValue } = req.body;
    const data = await main(inputValue);
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
}
