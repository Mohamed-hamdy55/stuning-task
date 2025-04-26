import { useTranslate } from "@hooks/useTranslate";
import React from "react";

const HeaderLogo: React.FC = () => {
    const trans = useTranslate();
    return ( 
        <section>
            <h1 className="text-3xl font-medium">
              <a href="#hero">🚀{trans("Logo")}</a>
            </h1>
        </section>
     );
}
 
export default HeaderLogo;
