import React from "react";
import HeaderLogo from "@components/common/HeaderLogo";
import NavigationBar from "@components/common/NavigationBar";
import styles from "@styles/styles";


const Header: React.FC = () => {
  return ( 
    <header  className="bg-teal-700 sticky top-0 z-10 text-white">
      <section className={`max-w-5xl mx-auto p-4  ${styles.normalFlex} justify-between`}>
        <HeaderLogo />
        <NavigationBar />
      </section>
    </header>
   );
}
 
export default Header;