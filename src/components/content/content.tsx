import CustomizedAccordions from "../accordion/accordion";
import Image from "next/image";
import styles from "./content.module.scss";
import { en } from "../../../languages/en";
import { de } from "../../../languages/de";

export default function Content({ language }: { language: any }) {
  // const language = language === "en" ? en : de;
  return (
    <div className={`${styles.main} flex flex-col gap-3 bg-white text-black`}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="font-medium text-lg">
            {language.content.first_section.header}
          </div>
          <div className="font-extralight">
            {language.content.first_section.paragraph}
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
          {language.content.second_section.header}
        </div>
        <div className="font-extralight">
          {language.content.second_section.paragraph}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="font-medium">
          {language.content.key_features.header}
        </div>
        <div className="px-4 text-sm font-extralight flex flex-col gap-2.5">
          <div>{language.content.key_features.features.first}</div>
          <div>{language.content.key_features.features.second}</div>
          <div>{language.content.key_features.features.third}</div>
          <div>{language.content.key_features.features.forth}</div>
          <div>{language.content.key_features.features.fifth}</div>
        </div>
      </div>
      <CustomizedAccordions {...{ language }} />
      <div className="font-light px-0.5 py-5">
        {language.content.note_above_footer}
      </div>
    </div>
  );
}
