import Image from "next/image";
import styles from "./navbar.module.scss";
import { Button, Menu } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { setCookie } from "cookies-next";
import { en } from "../../../languages/en";
import { de } from "../../../languages/de";
import { vi } from "../../../languages/vi";
import { it } from "../../../languages/it";
import { es } from "../../../languages/es";
import { ja } from "../../../languages/ja";
import { ru } from "../../../languages/ru";
import { fr } from "../../../languages/fr";

function MenuItem({
  text,
  handleClose,
}: {
  text: string;
  handleClose: () => void;
}) {
  return (
    <div
      onClick={handleClose}
      className="p-4 text-center transition hover:bg-slate-300 cursor-pointer text-sm"
    >
      {text}
    </div>
  );
}

function BasicMenu({
  language,
  setLanguage,
}: {
  language: any;
  setLanguage: Dispatch<SetStateAction<any>>;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (file: any, lang: any) => {
    setAnchorEl(null);
    setCookie("language", lang);
    setLanguage(file);
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="font-medium max-lg:hidden text-slate-700"
      >
        Languages
      </button>
      <div
        onClick={(e) => handleClick(e)}
        className="lg:hidden hover:bg-slate-100 cursor-pointer p-2.5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="black"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <Menu
        sx={{ outline: "none", border: "none" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem text="English" handleClose={() => handleClose(en, "en")} />
        <MenuItem text="German" handleClose={() => handleClose(de, "de")} />
        <MenuItem text="Vietnamese" handleClose={() => handleClose(vi, "vi")} />
        <MenuItem text="Italian" handleClose={() => handleClose(it, "it")} />
        <MenuItem text="Español" handleClose={() => handleClose(es, "es")} />
        <MenuItem text="Japanese" handleClose={() => handleClose(ja, "ja")} />
        <MenuItem text="Russian" handleClose={() => handleClose(ru, "ru")} />
        <MenuItem text="French" handleClose={() => handleClose(fr, "fr")} />
        {/* <MenuItem text="Русский" handleClose={handleClose} />
        <MenuItem text="Bahasa Indonesia" handleClose={handleClose} />
        <MenuItem text="Tiếng Việt" handleClose={handleClose} />
        <MenuItem text="Bahasa Malaysia" handleClose={handleClose} />
        <MenuItem text="Basa Jawa" handleClose={handleClose} />
        <MenuItem text="Čeština" handleClose={handleClose} />
        <MenuItem text="Español" handleClose={handleClose} />
        <MenuItem text="Français" handleClose={handleClose} />
        <MenuItem text="Magyar" handleClose={handleClose} />
        <MenuItem text="Nederlands" handleClose={handleClose} />
        <MenuItem text="Polish" handleClose={handleClose} />
        <MenuItem text="Nederlands" handleClose={handleClose} />
        <MenuItem text="Português" handleClose={handleClose} />
        <MenuItem text="Română" handleClose={handleClose} />
        <MenuItem text="Thailand" handleClose={handleClose} />
        <MenuItem text="Turkish (Turkey)" handleClose={handleClose} />
        <MenuItem text="Ελληνικά" handleClose={handleClose} />
        <MenuItem text="украї́нська мо́ва" handleClose={handleClose} />
        <MenuItem text="رَبِيّ" handleClose={handleClose} />
        <MenuItem text="한국어" handleClose={handleClose} />
        <MenuItem text="日本語" handleClose={handleClose} /> */}
      </Menu>
    </div>
  );
}

function IconOptions() {
  return (
    <div className="lg:hidden hover:bg-slate-100 cursor-pointer p-2.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="black"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  );
}

export default function Navbar({
  language,
  setLanguage,
}: {
  language: any;
  setLanguage: Dispatch<SetStateAction<any>>;
}) {
  return (
    <nav className={`${styles.main}`}>
      <div>
        <Image src="/logo.png" alt="logo" width={95} height={95} />
      </div>
      {/* <div className="font-medium text-slate-700 max-lg:hidden">Languages</div> */}
      <BasicMenu {...{ language, setLanguage }} />
    </nav>
  );
}
