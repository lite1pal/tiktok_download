import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./intro.module.scss";
import Image from "next/image";
import toast from "react-hot-toast";
import { en } from "../../../languages/en";
import { de } from "../../../languages/de";
import { getCookie } from "cookies-next";

function LoadingSpinner() {
  return (
    <div className="absolute top-1/3 left-1/2" role="status">
      <svg
        aria-hidden="true"
        className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function Paste({ language }: { language: any }) {
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
      <div className="text-sm text-blue-700">
        {language.intro_section.paste_button}
      </div>
    </div>
  );
}

function Clear({
  language,
  setInputValue,
  inputRef,
}: {
  language: any;
  setInputValue: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
}) {
  return (
    <div
      onClick={() => {
        setInputValue("");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }}
      className={`${styles.clear_button} cursor-pointer rounded-lg m-1.5 p-1 pr-4 flex gap-1 items-center`}
    >
      <Image
        src="https://snaptik.app/static/svg/x.svg"
        alt="clipboard"
        width={20}
        height={20}
      />
      <div className="text-sm text-white">
        {language.intro_section.clear_button}
      </div>
    </div>
  );
}

export default function Intro({ language }: { language: any }) {
  // state
  const [inputValue, setInputValue] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gettingVideoBlob, setGettingVideoBlob] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob>();
  const [deterioratedVideoBlob, setDeterioratedVideoBlob] = useState<Blob>();
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [videoInfo, setVideoInfo] = useState({
    data: { url: "", url_mp3: "", id: "", desc: "", author: "" },
  });
  const [imageVideo, setImageVideo] = useState("");
  const [testBlob, setTestBlob] = useState<Blob | null>(null);

  // ref
  const videoRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // FUNCTIONS
  // captures an image from the video
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    if (videoRef.current) {
      const videoElement = videoRef.current as HTMLVideoElement;
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
    }

    // Draw the current frame of the video on the canvas
    if (videoRef.current) {
      canvas.getContext("2d")!.drawImage(videoRef.current, 0, 0);
    }

    // Convert the canvas to a data URL (base64 encoded image)
    const imageDataURL = canvas.toDataURL("image/png");

    // Now you can use 'imageDataURL' to display or save the image
    setImageVideo(imageDataURL);
  };

  // ALPHA
  // useEffect(() => {
  //   const test = async () => {
  //     const testBlob = await fetch(
  //       "https://v16m-default.akamaized.net/45f33075b492e37963d62bfa360aaf05/6515e0d3/video/tos/useast2a/tos-useast2a-ve-0068c004/osqgVuz5fBmZWi0dkIjcAAPC8NuIUkQNoykwFh/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=4252&bt=2126&bti=OHYpOTY0Zik7OzlmOm01MzE6ZC4xMDo%3D&cs=0&ds=6&ft=ArCXsBnPq8ZmowMv5Q_vjhtj_ReLrus&mime_type=video_mp4&qs=0&rc=NWllaGlkODZpOTU2ODo8OkBpMzlyZmc6ZmY7bDMzNzczM0AvNTVeYl5hNjMxLzZiLTUzYSNiczJycjRnaW5gLS1kMTZzcw%3D%3D&l=20230928142338965AD36A952E68B404CF&btag=e00088000"
  //     ).then((res) => res.blob());
  //     setTestBlob(testBlob);
  //   };
  //   test();
  // }, []);

  // keeps videoBlob updated to show an image
  useEffect(() => {
    if (videoRef.current && videoBlob) {
      // Assert the type of videoRef.current as HTMLVideoElement
      const videoElement = videoRef.current as HTMLVideoElement;

      // Set the src property on the HTMLVideoElement
      videoElement.src = window.URL.createObjectURL(videoBlob);

      setTimeout(() => {
        captureImage();
      }, 100);
    }
  }, [videoBlob]);

  // validates an input value to be URL
  function isValidURL(url: string) {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return pattern.test(url);
  }

  // clears input element's value
  useEffect(() => {
    if (inputValue === "" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [inputValue]);

  // retrieves a video blob from the provided URL
  const getVideoBlob = async () => {
    if (inputValue.length === 0) {
      toast.error("Provide a url");
      setInputValue("");
      return;
    }

    if (!isValidURL(inputValue)) {
      toast.error("Invalid URL");
      setInputValue("");
      return;
    }

    const url = new URL(inputValue);
    if (url)
      if (
        url.hostname !== "www.tiktok.com" &&
        url.hostname !== "vt.tiktok.com" &&
        url.hostname !== "vm.tiktok.com"
      ) {
        toast.error("URL must be from Tiktok");
        setInputValue("");
        return;
      }

    setDownloading(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
    setGettingVideoBlob(true);
    const response = await fetch("/api/tiktok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    });

    const data = await response.json();
    setVideoInfo(data);

    if (response.ok) {
      const url = data.data.url;
      const url_mp3 = data.data.url_mp3;
      const videoBlobResult = await fetch(url).then((res) => res.blob()); // Fetch the blob using the URL
      const audioBlobResult = await fetch(url_mp3).then((res) => res.blob());
      setVideoBlob(videoBlobResult);
      setAudioBlob(audioBlobResult);
      setGettingVideoBlob(false);

      setInputValue("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } else {
      toast.error(`Failed to retrieve video ${data.data.id}`);
      setDownloading(false);
      setInputValue("");
    }
  };

  // takes a video blob, deteriorates its quality and returns it
  const deteriorateVideoBlob = async (videoBlob: Blob) => {
    try {
      if (!videoInfo.data.url) {
        return console.error("video_url is empty");
      }

      const response = await fetch("/api/deteriorate", {
        method: "POST",
        body: JSON.stringify({ video_url: videoInfo.data.url }), // Replace with your video URL
      });

      const parsedRes = await response.json();
      console.log(parsedRes);

      // const blob = await response.blob();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // downloads a video blob from the browser
  const downloadVideoFromBrowser = () => {
    if (videoBlob) {
      const objectUrl = window.URL.createObjectURL(videoBlob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.setAttribute("download", `${videoInfo.data.id}.mp4`);
      a.click();
      window.URL.revokeObjectURL(videoInfo.data.url);
      // toast.success("Video is downloaded successfully!", { duration: 5 });
    }
  };

  const downloadDeterioratedVideoFromBrowser = () => {
    if (deterioratedVideoBlob) {
      const objectUrl = window.URL.createObjectURL(deterioratedVideoBlob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.setAttribute("download", `${videoInfo.data.id}.mp4`);
      a.click();
      window.URL.revokeObjectURL(videoInfo.data.url);
      // toast.success("Video is downloaded successfully!", { duration: 5 });
    }
  };

  // downloads a audio version of the video from the browser
  const downloadAudioFromBrowser = () => {
    if (audioBlob) {
      const objectUrl = window.URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.setAttribute("download", `${videoInfo.data.id}.mp3`);
      a.click();
      window.URL.revokeObjectURL(videoInfo.data.url);
      // toast.success("Audio is downloaded successfully!", { duration: 5 });
    }
  };

  return (
    <>
      {downloading ? (
        <div
          className={`${
            loading && "opacity-90 pointer-events-none"
          } bg-white pt-2 gap-2 border-t flex flex-col`}
        >
          {loading && <LoadingSpinner />}
          <div className="h-64 w-10/12 border m-auto text-black">ads</div>
          <div className="bg-white flex flex-col lg:flex-row w-full px-8 gap-6 lg:px-0 lg:justify-evenly">
            <div className="w-full lg:w-5/12 h-fit bg-gray-200 text-black p-1 rounded-xl flex gap-2">
              <div className="relative w-20 h-20 ml-1 my-auto border rounded-xl">
                {imageVideo && (
                  <Image
                    src={imageVideo}
                    alt="img"
                    fill
                    objectFit="cover"
                    className="rounded-xl"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 w-11/12 justify-center">
                <div className="font-medium text-sm lg:text-base">
                  {videoInfo.data.desc}
                </div>
                <div className="text-sm">{videoInfo.data.author}</div>
              </div>
            </div>
            <div className="flex flex-col px-4 lg:p-0 gap-3 text-center">
              <div
                onClick={() => {
                  downloadVideoFromBrowser();
                }}
                className="px-24 py-3 bg-blue-600 justify-center hover:bg-blue-700 cursor-pointer flex gap-1 rounded"
              >
                <Image
                  src="https://snaptik.app/static/svg/down.svg"
                  alt="download"
                  width={23}
                  height={23}
                />
                <div className={`${gettingVideoBlob && "pointer-events-none"}`}>
                  {gettingVideoBlob
                    ? "Loading"
                    : `${language.intro_section.download_button} HD`}
                </div>
              </div>
              <div
                onClick={() => {
                  downloadVideoFromBrowser();
                }}
                className="px-24 py-3 bg-blue-600 justify-center hover:bg-blue-700 cursor-pointer flex gap-1 rounded"
              >
                <Image
                  src="https://snaptik.app/static/svg/down.svg"
                  alt="download"
                  width={23}
                  height={23}
                />
                <div className={`${gettingVideoBlob && "pointer-events-none"}`}>
                  {gettingVideoBlob
                    ? "Loading"
                    : language.intro_section.download_button}
                </div>
              </div>
              <div
                onClick={() => {
                  // downloadVideoFromBrowser();
                  downloadAudioFromBrowser();
                }}
                className="px-24 py-3 bg-orange-600 justify-center hover:bg-orange-700 cursor-pointer flex gap-1 rounded"
              >
                <Image
                  src="https://snaptik.app/static/svg/down.svg"
                  alt="download"
                  width={23}
                  height={23}
                />
                <div className={`${gettingVideoBlob && "pointer-events-none"}`}>
                  {gettingVideoBlob
                    ? "Loading"
                    : `${language.intro_section.download_button} MP3`}
                </div>
              </div>
              <div
                onClick={() => {
                  downloadVideoFromBrowser();
                }}
                className="px-24 py-3 bg-green-500 hover:bg-green-600 cursor-pointer rounded"
              >
                {language.intro_section.download_button} Server 02
              </div>
              <div
                onClick={() => {
                  setVideoBlob(undefined);
                  setAudioBlob(undefined);
                  setVideoInfo({
                    data: {
                      url: "",
                      url_mp3: "",
                      id: "",
                      desc: "",
                      author: "",
                    },
                  });
                  setDownloading(false);
                  setImageVideo("");
                }}
                className="px-12 py-3 bg-black cursor-pointer rounded"
              >
                {language.intro_section.download_button} other video
              </div>
              <video
                ref={videoRef}
                controls
                autoPlay
                muted
                className="opacity-0 w-2 h-2 absolute top-0 pointer-events-none"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#195FD7" }}
          className="w-full pt-14 pb-16 px-4 lg:pt-24 items-center flex flex-col gap-6"
        >
          <div className="text-2xl font-medium lg:text-5xl">
            {language.intro_section.header}
          </div>
          <div className="lg:text-xl">
            {language.intro_section.small_header}
          </div>
          <div
            className={`${styles.input_button} flex flex-col lg:flex-row gap-2 items-center justify-center m-auto`}
          >
            <div className="rounded w-full flex bg-white">
              <input
                onChange={(e) => setInputValue(e.target.value)}
                className="rounded w-full p-3 outline-none text-black placeholder:text-slate-400"
                type="text"
                ref={inputRef}
                placeholder={language.intro_section.input_placeholder}
              />
              {inputValue.length > 0 ? (
                <Clear
                  language={language}
                  setInputValue={setInputValue}
                  inputRef={inputRef}
                />
              ) : (
                <Paste language={language} />
              )}
            </div>
            <div
              onClick={() => {
                getVideoBlob();
              }}
              className={`${styles.download_button} text-lg cursor-pointer  flex items-center justify-center gap-2 font-medium lg:w-fit w-full rounded px-5 py-2.5`}
            >
              <Image
                src="https://snaptik.app/static/svg/down.svg"
                alt="download"
                width={23}
                height={23}
              />
              <div>
                {downloading
                  ? "Loading..."
                  : language.intro_section.download_button}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
