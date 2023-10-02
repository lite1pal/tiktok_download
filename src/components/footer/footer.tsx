import CustomFooter from "../../../footer_custom/custom";

interface Option {
  text: string;
  link: string;
}

export function Option({ text, link }: { text: string; link: string }) {
  return (
    <a href={link} className="text-sm border-0 cursor-pointer">
      {text}
    </a>
  );
}

export function Section({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-4 gap-4">
      <div style={{ color: "#5D6778" }}>{header}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <div className="flex flex-col bg-slate-50 p-3 gap-3">
      <CustomFooter />
      {/* <div className="flex flex-wrap lg:justify-between lg:pl-20 lg:w-9/12 text-black text-opacity-70 justify-between w-10/12">
        <Section header="Company">
          <Option link="" text="Contact" />
        </Section>

        <Section header="Legal">
          <Option link="" text="Terms of Service" />
          <Option link="" text="Privacy Policy" />
        </Section>

        <Section header="Tools">
          <Option link="" text="Download video Douyin" />
          <Option link="" text="Download Tiktok Slide" />
          <Option link="" text="Download Tiktok Story" />
        </Section>
      </div> */}

      <div className="text-slate-700 font-light text-center w-10/12 pb-3 m-auto">
        © 2019 - 2023 SnapTik - TikTok Video Download Version 18.4
      </div>
    </div>
  );
}
