import ffmpeg from "fluent-ffmpeg";
import { type NextApiRequest, type NextApiResponse } from "next";
import fs from "fs";
import { exec } from "child_process";
import { Readable } from "stream";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const parsedBody = JSON.parse(req.body);

    const videoBlob = await fetch(parsedBody.video_url).then((res) =>
      res.blob()
    );
    // const videoStream = videoBlob.stream();

    // Create a readable stream from the video blob
    const videoStream = new Readable({
      read() {
        this.push(videoBlob);
        this.push(null);
      },
    });

    // Process the video blob to deteriorate quality using FFmpeg
    ffmpeg()
      .input(videoStream)
      .videoCodec("libx264")
      .outputOptions(["-crf 30"])
      .toFormat("mp4")
      .on("end", () => {
        console.log("Video processing complete");
      })
      .on("error", (err) => {
        console.error("Error processing video:", err);
        res.status(500).json({ error: "Video processing failed" });
      })
      .pipe(res, { end: true }); // Pipe the output directly to the response

    res.setHeader("Content-Type", "video/mp4");

    // res.status(200).json({ message: "File created successfully" });
  } catch (error) {
    res.status(500).json({ message: "File creation failed" });
  }
}
