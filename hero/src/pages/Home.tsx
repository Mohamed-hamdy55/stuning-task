import HeroSection from "@components/Hero/HeroSection";
import Header from "@components/common/Header";
import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto">
        {/* Pass the search handler to SearchComponent */}
        <HeroSection />
      </main>
    </>
  );
};

export default Home;
