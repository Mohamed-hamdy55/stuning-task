import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import LanguageSelector from "@components/common/LanguageSelector";
import ThemeToggle from "@components/common/ThemeToggle";
import { HiMenu, HiX } from "react-icons/hi";
import styles from "@styles/styles";

const HeaderLogo: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const isRTL = currentLanguage === "ar";

  return (
    <>
      {/* Desktop View */}
      <div className="hidden 425px:flex justify-between items-center gap-4">
        <ThemeToggle />
        <LanguageSelector />
      </div>

      {/* Mobile Hamburger */}
      <div className={` ${styles.normalFlex} 425px:hidden`}>
        <button onClick={() => setMenuOpen(true)}>
          <HiMenu size={30} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} h-full w-1/2 z-50 bg-teal-800 text-white ${styles.normalFlex} flex-col justify-center space-y-8 shadow-lg transition-transform duration-300`}
        >
          <button
            className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}
            onClick={() => setMenuOpen(false)}
          >
            <HiX size={30} />
          </button>

          {/* Clicking any nav item closes the menu */}
          <div  className={`${styles.normalFlex} flex-col gap-6`}>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderLogo;
