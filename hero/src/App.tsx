// App.tsx
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  Home,
} from "@routes/routes";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import ScrollToTop from "@components/common/ScrollToTop";

const App: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      currentLanguage === "en" ? "ltr" : "rtl"
    );
  }, [currentLanguage]);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
            {/* Start the routes for pages */}
            <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
