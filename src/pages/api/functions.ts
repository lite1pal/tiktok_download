import fetch from "node-fetch";
import chalk from "chalk";
import inquirer from "inquirer";
import { exit } from "process";
import { Headers } from "node-fetch";

//adding useragent to avoid ip bans
const headers = new Headers();
headers.append(
  "User-Agent",
  "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet"
);
const headersWm = new Headers();
headersWm.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
);

const getChoice = () =>
  new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Choose a option",
          choices: [
            "Mass Download (Username)",
            "Mass Download with (txt)",
            "Single Download (URL)",
          ],
        },
        {
          type: "list",
          name: "type",
          message: "Choose a option",
          choices: ["With Watermark", "Without Watermark"],
        },
      ])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

const getInput = (message: any) =>
  new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "input",
          message: message,
        },
      ])
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

const generateUrlProfile = (username: any) => {
  var baseUrl = "https://www.tiktok.com/";
  if (username.includes("@")) {
    baseUrl = `${baseUrl}${username}`;
  } else {
    baseUrl = `${baseUrl}@${username}`;
  }
  return baseUrl;
};

// const downloadMediaFromList = async (item: any) => {
//   const folder = "downloads/";
//   if (!fs.existsSync(folder)) {
//     fs.mkdirSync(folder, { recursive: true });
//   }

//   const fileName = `${item.id}.mp4`;
//   const downloadFile = await fetch(item.url);

//   if (!downloadFile.ok) {
//     throw new Error(
//       `Failed to fetch ${item.url}, status: ${downloadFile.status}`
//     );
//   }

//   const fileStream = fs.createWriteStream(folder + fileName);
//   downloadFile.body?.pipe(fileStream);

//   return new Promise((resolve, reject) => {
//     fileStream.on("finish", () => {
//       fileStream.close();
//       console.log(`${fileName} downloaded`);
//       resolve();
//     });

//     fileStream.on("error", (err) => {
//       console.error(`Error downloading ${fileName}:`, err);
//       reject(err);
//     });
//   });
// };

const getVideoWM = async (url: any) => {
  const idVideo = await getIdVideo(url);
  const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
  const request = await fetch(API_URL, {
    method: "GET",
    headers: headers,
  });
  const body = await request.text();
  try {
    var res = JSON.parse(body);
    // console.log(res);
  } catch (err) {
    console.error("Error:", err);
    console.error("Response body:", body);
  }
  const urlMedia = res.aweme_list[0].video.download_addr.url_list[0];
  const data = {
    url: urlMedia,
    id: idVideo,
  };
  return data;
};

const getVideoNoWM = async (url: any) => {
  const idVideo = await getIdVideo(url);
  const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
  const request = await fetch(API_URL, {
    method: "GET",
    headers: headers,
  });
  const body = await request.text();
  try {
    var res = JSON.parse(body);
  } catch (err) {
    console.error("Error:", err);
    console.error("Response body:", body);
  }

  console.log(res.aweme_list[0].desc);
  console.log(res.aweme_list[0].author.nickname);
  const urlMedia = res.aweme_list[0].video.play_addr.url_list[0];
  const data = {
    url: urlMedia,
    url_mp3: res.aweme_list[0].added_sound_music_info.play_url.uri,
    id: idVideo,
    desc: res.aweme_list[0].desc,
    author: res.aweme_list[0].author.nickname,
  };
  console.log(res.aweme_list[0]);
  return data;
};

// const getListVideoByUsername = async (username: any) => {
//   var baseUrl = await generateUrlProfile(username);
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   page.setUserAgent(
//     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36"
//   );
//   await page.goto(baseUrl);
//   var listVideo = [];
//   console.log(chalk.green("[*] Getting list video from: " + username));
//   var loop = true;
//   while (loop) {
//     listVideo = await page.evaluate(() => {
//       const listVideo = Array.from(
//         document.querySelectorAll(".tiktok-1s72ajp-DivWrapper > a")
//       );
//       return listVideo.map((item) => item.getAttribute("href"));
//     });
//     console.log(chalk.green(`[*] ${listVideo.length} video found`));
//     previousHeight = await page.evaluate("document.body.scrollHeight");
//     await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
//     await page
//       .waitForFunction(`document.body.scrollHeight > ${previousHeight}`, {
//         timeout: 10000,
//       })
//       .catch(() => {
//         console.log(chalk.red("[X] No more video found"));
//         console.log(chalk.green(`[*] Total video found: ${listVideo.length}`));
//         loop = false;
//       });
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
//   await browser.close();
//   return listVideo;
// };

const getRedirectUrl = async (url: any) => {
  if (url.includes("vm.tiktok.com") || url.includes("vt.tiktok.com")) {
    url = await fetch(url, {
      redirect: "follow",
      follow: 10,
    });
    url = url.url;
    console.log(chalk.green("[*] Redirecting to: " + url));
  }
  return url;
};

const getIdVideo = (url: any) => {
  const matching = url.includes("/video/");
  if (!matching) {
    console.log(chalk.red("[X] Error: URL not found"));
    exit();
  }
  const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
  return idVideo.length > 19
    ? idVideo.substring(0, idVideo.indexOf("?"))
    : idVideo;
};

export const main = async (url: any) => {
  try {
    var listVideo = [];
    var listMedia: any = [];

    const redirectUrl = await getRedirectUrl(url);
    listVideo.push(redirectUrl);

    console.log(chalk.green(`[!] Found ${listVideo.length} video`));

    for (var i = 0; i < listVideo.length; i++) {
      console.log(
        chalk.green(`[*] Downloading video ${i + 1} of ${listVideo.length}`)
      );
      console.log(chalk.green(`[*] URL: ${listVideo[i]}`));
      var data = await getVideoNoWM(listVideo[i]);

      return data;
    }

    // downloadMediaFromList(data)
    //   .then(() => {
    //     console.log(chalk.green("[+] Downloaded successfully"));
    //     return chalk.green("[+] Downloaded successfully");
    //   })
    //   .catch((err) => {
    //     console.log(chalk.red("[X] Error: " + err));
    //     return chalk.red("[X] Error: " + err);
    //   });
  } catch (err) {
    return "Error occured downloading the Tiktok video";
  }
};
