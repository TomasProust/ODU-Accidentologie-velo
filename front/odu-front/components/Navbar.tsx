import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "./Logo";
import NavItem from "./NavItem";

interface Menu {
    text: string;
    href: string;
}

const MENU_LIST: Menu[] = [
  { text: "Accueil", href: "/" },
  { text: "À Propos", href: "/about" },
  { text: "Contact", href: "/contact" },
];

const Navbar: React.FunctionComponent = () => {
  const [navActive, setNavActive] = useState<boolean | null >(null);
  const [activeIdx, setActiveIdx] = useState<number>(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"}>
            <h1 className="logo">ODU - Accidentologie à Vélo</h1>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;