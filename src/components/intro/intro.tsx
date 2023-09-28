import { Dispatch, SetStateAction, useState } from "react";
import styles from "./intro.module.scss";
import Image from "next/image";
import toast from "react-hot-toast";

function Paste() {
  return (
    <div
      className={`${styles.paste_button} cursor-pointer rounded-lg m-1.5 p-1 pr-4 flex gap-1 items-center`}
    >
      <Image
        src="https://snaptik.app/static/svg/clipboard.svg"
        alt="clipboard"
        width={20}
        height={20}
      />
      <div className="text-sm text-blue-700">Paste</div>
    </div>
  );
}

function Clear({
  setInputValue,
}: {
  setInputValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      onClick={() => setInputValue("")}
      className={`${styles.clear_button} cursor-pointer rounded-lg m-1.5 p-1 pr-4 flex gap-1 items-center`}
    >
      <Image
        src="https://snaptik.app/static/svg/x.svg"
        alt="clipboard"
        width={20}
        height={20}
      />
      <div className="text-sm text-white">Clear</div>
    </div>
  );
}

export default function Intro() {
  const [inputValue, setInputValue] = useState("");
  const [downloading, setDownloading] = useState(false);

  const downloadVideo = async () => {
    setDownloading(true);
    if (inputValue.length === 0) {
      toast.error("Provide a url");
      setDownloading(false);
      return;
    }

    const url = new URL(inputValue);
    if (
      url.hostname !== "www.tiktok.com" &&
      url.hostname !== "vt.tiktok.com" &&
      url.hostname !== "vm.tiktok.com"
    ) {
      toast.error("URL must be from Tiktok");
      setDownloading(false);
      return;
    }
    // if (
    //   !["www.tiktok.com", "vt.tiktok.com", "vm.tiktok.com"].includes(inputValue)
    // ) {
    //   toast.error("URL must be from Tiktok");
    //   setDownloading(false);
    //   return;
    // }

    const response = await fetch("/api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    });

    const data = await response.json();

    if (response.ok) {
      const url = data.data.url;
      const videoBlob = await fetch(url).then((res) => res.blob()); // Fetch the blob using the URL

      // // converting to mp3 format
      // // Make a POST request to the Next.js API route
      // const response_audio = await fetch("/api/convert", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "video/mp4", // Set the appropriate content type for the video blob
      //   },
      //   body: videoBlob,
      // });
      // if (response_audio.ok) {
      //   // Get the audio blob from the response
      //   const audioBlob = await response.blob();
      //   // END CONVERTION

      //   const audioObjectUrl = window.URL.createObjectURL(audioBlob);
      //   const a = document.createElement("a");
      //   a.href = audioObjectUrl;
      //   a.setAttribute("download", "audio.mp3");
      //   a.click();
      //   window.URL.revokeObjectURL(url);
      // }

      const objectUrl = window.URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.setAttribute("download", `${data.data.id}.mp4`);
      a.click();
      window.URL.revokeObjectURL(url);
      setDownloading(false);
      setInputValue("");
      toast.success("Video is downloaded successfully!", { duration: 5 });
    } else {
      console.error(`Failed to download video ${data.data.id}`);
      setDownloading(false);
      setInputValue("");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#195FD7" }}
      className="w-full pt-14 pb-16 px-4 lg:pt-24 items-center flex flex-col gap-6"
    >
      <div className="text-2xl font-medium lg:text-5xl">
        TikTok Video Download
      </div>
      <div className="lg:text-xl">Without Watermark. Fast. All devices</div>
      <div
        className={`${styles.input_button} flex flex-col lg:flex-row gap-2 items-center justify-center m-auto`}
      >
        <div className="rounded w-full flex bg-white">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded w-full p-3 outline-none text-black placeholder:text-slate-400"
            type="text"
            value={inputValue}
            placeholder="Paste TikTok link here"
          />
          {inputValue.length > 0 ? (
            <Clear setInputValue={setInputValue} />
          ) : (
            <Paste />
          )}
        </div>
        <div
          onClick={() => downloadVideo()}
          className={`${styles.download_button} text-lg cursor-pointer  flex items-center justify-center gap-2 font-medium lg:w-fit w-full rounded px-5 py-2.5`}
        >
          <Image
            src="https://snaptik.app/static/svg/down.svg"
            alt="download"
            width={23}
            height={23}
          />
          <div>{downloading ? "Loading..." : "Download"}</div>
        </div>
      </div>
    </div>
  );
}
