import CustomizedAccordions from "../accordion/accordion";
import Image from "next/image";
import styles from "./content.module.scss";

export default function Content() {
  return (
    <div className={`${styles.main} flex flex-col gap-3 bg-white text-black`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="font-medium text-lg">Download SnapTik app</div>
          <div className="font-extralight">
            I now provide an app for downloading TikTok videos. It is fast,
            easy, with no watermark and HD quality
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <Image
            className="cursor-pointer"
            src="/google.png"
            alt="google"
            width={170}
            height={50}
          />
          <Image
            className="cursor-pointer"
            src="/apple.png"
            alt="apple"
            width={150}
            height={50}
          />
        </div>
      </div>
      <div className="flex flex-col pt-10">
        <div className="font-medium text-lg">
          Download TikTok videos (Musically) Without Watermark for FREE
        </div>
        <div className="font-extralight">
          SnapTik.App is one of the best TikTok Downloader available online to
          Download video tiktok without a watermark. You are not required to
          install any software on your computer or mobile phone, all that you
          need is a TikTok video link, and all the processing is done on our
          side so you can be one click away from downloading videos to your
          devices.
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-medium">Key features:</div>
        <div className="px-4 text-sm font-extralight flex flex-col gap-2.5">
          <div>
            No watermark for better quality, which most of the tools out there
            can{"'"}t.
          </div>
          <div>
            Download TikTok videos, Musically videos on any devices that you
            want: mobile, PC, or tablet. TikTok only allows users to download
            videos by its application and downloaded videos contain the
            watermark.
          </div>
          <div>
            Download by using your browsers: I want to keep things simple for
            you. No need to download or install any software. I make an
            application for this purpose as well but you can only install
            whenever you like.
          </div>
          <div>
            It{"'"}s always free. I only place some ads, which support
            maintaining our services, and further development.
          </div>
          <div>
            New SnapTik provides users with the ability to download Tiktok{"'"}s
            photo slide show as Mp4 Video format. The images and music in the
            Tiktok slide show will be automatically merged by SnapTik. In
            addition, you can also download each image in the slide show to your
            computer right away.
          </div>
        </div>
      </div>
      <CustomizedAccordions />
      <div className="font-light px-0.5 py-5">
        Note: SnapTik (Tiktok video Downloader) is not a tool of Tiktok, we have
        no relationship with Tiktok or ByteDance Ltd. We only support Tiktok
        users to download our videos on Tiktok without logo without any trouble.
        If you have problems with sites like Tikmate or SSSTiktok, try SnapTik,
        we are constantly updating to make it easy for users to download tiktok
        videos. Thank you!
      </div>
    </div>
  );
}
