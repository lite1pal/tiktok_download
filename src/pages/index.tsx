import Navbar from "@/components/navbar/navbar";
import Intro from "@/components/intro/intro";
import Footer from "../components/footer/footer";
import Content from "@/components/content/content";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import { en } from "../../languages/en";
import { de } from "../../languages/de";
import { vi } from "../../languages/vi";
import { it } from "../../languages/it";
import { es } from "../../languages/es";
import { ja } from "../../languages/ja";
import { ru } from "../../languages/ru";
import { fr } from "../../languages/fr";
import { encode } from "punycode";

export default function Home() {
  const [language, setLanguage] = useState<any>({
    intro_section: {
      header: "",
      small_header: "",
      input_placeholder: "",
      paste_button: "",
      clear_button: "",
      download_button: "",
    },
    content: {
      first_section: {
        header: "",
        paragraph: "",
      },
      second_section: {
        header: "",
        paragraph: "",
      },
      key_features: {
        header: "",
        features: {
          first: "",
          second: "",
          third: "",
          forth: "",
          fifth: "",
        },
      },
      questions: {
        first: {
          question: "",
          answer: "",
        },
        second: {
          question: "",
          answer: "",
        },
        third: {
          question: "",
          answer: "",
        },
        fourth: {
          question: "",
          answer: "",
        },
        fifth: {
          question: "",
          answer: "",
        },
        sixth: {
          question: "",
          answer: "",
        },
        seventh: {
          question: "",
          answer: "",
        },
        eighth: {
          question: "",
          answer: "",
        },
        ninth: {
          question: "",
          answer: "",
        },
        tenth: {
          question: "",
          answer: "",
        },
        eleventh: {
          question: "",
          answer: "",
        },
        twelfth: {
          question: "",
          answer: "",
        },
        thirteenth: {
          question: "",
          answer: "",
        },
      },
      note_above_footer: "",
    },
  });

  useEffect(() => {
    const curLanguage = getCookie("language") as unknown as string;
    if (!curLanguage) {
      setCookie("language", "en");
      setLanguage(en);
    } else if (curLanguage === "en") {
      setLanguage(en);
    } else if (curLanguage === "de") {
      setLanguage(de);
    } else if (curLanguage === "vi") {
      setLanguage(vi);
    } else if (curLanguage === "it") {
      setLanguage(it);
    } else if (curLanguage === "ja") {
      setLanguage(ja);
    } else if (curLanguage === "es") {
      setLanguage(es);
    } else if (curLanguage === "ru") {
      setLanguage(ru);
    } else if (curLanguage === "fr") {
      setLanguage(fr);
    }
  }, [language]);
  return (
    <div className="flex flex-col">
      <Navbar {...{ language, setLanguage }} />
      <Intro {...{ language }} />
      <Content {...{ language }} />
      <Footer />
    </div>
  );
}
