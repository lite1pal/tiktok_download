import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  //   "&:not(:last-child)": {
  //     borderBottom: 0,
  //   },
  color: "white",

  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ color: "white", fontSize: "1.8rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#3E8ED0",
  borderRadius: "0.3rem",
  fontSize: "1rem",
  fontWeight: "300",

  "& .MuiAccordionSummary-content": {
    // marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  color: "black",
}));

function CustomizedAccordion({
  num,
  summary,
  content,
}: {
  num: number;
  summary: string;
  content: string;
}) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === `panel${num}`}
      onChange={handleChange(`panel${num}`)}
    >
      <AccordionSummary
        aria-controls={`panel${num}d-content`}
        id={`panel${num}d-header`}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>
        <Typography className="font-light p-4 text-sm">{content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default function CustomizedAccordions() {
  return (
    <div className="flex flex-col gap-4 mt-7">
      <CustomizedAccordion
        num={1}
        summary="How to Download video Tiktok no watermark?"
        content="

        Open Tik Tok app on your phone/or Web on your browser.
        Choose whatever video you want to download.
        Click to the Share button at the right bottom.
        Click the Copy Link button.
        Download by using your browsers: I want to keep things simple for you. No need to download or install any software. I make an application for this purpose as well but you can only install whenever you like.
        Go back to SnapTik.App and paste your download link to the field above then click to the Download button.
        Wait for our server to do its job and then, save the video to your device.
    
    "
      />

      <CustomizedAccordion
        num={2}
        summary="How to get the Tiktok video download link?"
        content="

        Open your TikTok application
        Choose the TikTok video that you want to download
        Click Share and at the Share options, find Copy Link button
        Your download URL is ready on the clipboard.
    
    For example, the link would look like this
    https://v.douyin.com/UFLNjnh/
    or
    https://www.tiktok.com/@philandmore/video/6805867805452324102
    or
    https://m.tiktok.com/v/6805867805452324102.html
    and more...
    "
      />

      <CustomizedAccordion
        num={3}
        summary="Where are Tiktok videos saved after being downloaded?"
        content="When you're downloading files, they are usually saved into whatever folder you have set as your default. Your browser normally sets this folder for you. In browser settings, you can change and choose manually the destination folder for your downloaded TikTok videos. "
      />

      <CustomizedAccordion
        num={4}
        summary="Does Snaptik.App store downloaded videos or keep a copy of videos?"
        content="SnapTik.App doesn't store videos, neither do i keep copies of downloaded videos. All videos are hosted on TikTok's servers. Also, i don't keep track of the download histories of our users, thus making using SnapTik.App totally anonymous."
      />

      <CustomizedAccordion
        num={5}
        summary="Do I need to install instructions or extensions?"
        content="No. I try to keep things easy for our users. All you need is your TikTok download video links. That's it."
      />

      <CustomizedAccordion
        num={6}
        summary="Do I have to pay to Tiktok Downloader without watermark (Snaptik)?"
        content="No, you don't have to pay for anything because our software is always free. You can support us by turning off your Ad Blocks or making donations. It supports our further development."
      />

      <CustomizedAccordion
        num={7}
        summary="Can I use this Tiktok video downloader on my Android phone?"
        content="Yes, it’s better to use SnapTik to save no-watermark TikTok videos on your Android phone. SnapTik is super FAST, 100% FREE, and getting updated frequently."
      />

      <CustomizedAccordion
        num={8}
        summary="How do I save tiktok video / download my favorite Tik Tok mp4 videos to my iPhone (IOS)?"
        content="Because of Apple's privacy policy, from IOS 12 and IPAD OS 12 and below you cannot download any videos, music or movies to your iPhone. You should update to the latest iOS to be able to use Safari to download Tiktok videos From SnapTik. If you still can't download please follow the tutorial How to download tiktok videos without watermark on iPhone"
      />

      <CustomizedAccordion
        num={9}
        summary="Is there a limit to download Tiktok videos at SnapTik?"
        content="No, you can download many of your favorite TikTok videos at SnapTik with no download limit."
      />

      <CustomizedAccordion
        num={10}
        summary="Does Snaptik support downloading multiple videos / Download all videos from a certain tiktok / Htags channel?"
        content="No, SnapTik does not support this feature yet."
      />

      <CustomizedAccordion
        num={11}
        summary="Can I download high resolution TikTok videos at SnapTik?"
        content="Yes, SnapTik is the TikTok video downloader that provides the highest resolution for you. If we find a Full HD or higher resolution of a Tiktok video, we will immediately show a high quality Download link and you can download it."
      />

      <CustomizedAccordion
        num={12}
        summary="Can I edit TikTok videos downloaded at SnapTik?"
        content="No, SnapTik is just a TikTok video downloader, not supporting video editing. Use specialized video editing software on your phone or PC"
      />

      <CustomizedAccordion
        num={13}
        summary="Does SnapTik provide tiktok mp3 download solution?"
        content="SnapTik respects the intellectual property rights of the tracks so SnapTik will not provide this solution. However, there are currently quite a few application websites that provide this Tiktok Mp3 service such as Tikmate, SaveTik.Net, SSStiktok, etc. You can download TikTok mp3 music but are not allowed to use it for commercial activities, monetize it."
      />
    </div>
  );
}
