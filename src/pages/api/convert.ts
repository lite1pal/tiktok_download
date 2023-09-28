import { type NextApiRequest, type NextApiResponse } from "next";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import path from "path"; // Import the 'path' module
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const videoBlob = req.body;
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    // Write the video blob to a file
    ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoBlob));

    // Convert the video to audio
    await ffmpeg.run("-i", "input.mp4", "output.mp3");

    // Read the resulting audio file as a blob
    const audioBlobData = ffmpeg.FS("readFile", "output.mp3");

    // Send the audio blob to the client
    res.setHeader("Content-Type", "audio/mpeg");
    res.status(200).send(audioBlobData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
