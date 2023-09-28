function Section({ header }: { header: string }) {
  return (
    <div className="flex flex-col w-36 border text-slate-600 gap-4">
      <div className="">{header}</div>
      <div className="text-sm">Contact</div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="flex flex-col bg-slate-50 p-3 gap-3">
      <div className="flex flex-wrap lg:justify-between lg:pl-20 lg:w-9/12 text-black text-opacity-70 justify-between w-10/12">
        <div className="flex flex-col p-4 gap-4">
          <div style={{ color: "#5D6778" }} className="">
            Company
          </div>
          <div className="text-sm">Contact</div>
        </div>
        <div className="flex flex-col p-4  gap-4">
          <div style={{ color: "#5D6778" }} className="">
            Legal
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm cursor-pointer">Terms of Service</div>
            <div className="text-sm cursor-pointer">Privacy Policy</div>
          </div>
        </div>
        <div className="flex flex-col p-4  gap-4">
          <div style={{ color: "#5D6778" }} className="">
            Tools
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-sm cursor-pointer">Download video Douyin</div>
            <div className="text-sm cursor-pointer">Download Tiktok Slide</div>
            <div className="text-sm cursor-pointer">Download Tiktok Story</div>
            <div className="text-sm cursor-pointer">
              How to Download video tiktok
            </div>
          </div>
        </div>
      </div>
      <div className="text-slate-700 font-light text-center w-10/12 pb-3 m-auto">
        © 2019 - 2023 SnapTik - TikTok Video Download Version 18.4
      </div>
    </div>
  );
}
