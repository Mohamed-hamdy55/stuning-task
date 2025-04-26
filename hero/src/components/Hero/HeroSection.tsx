import React, { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { toast } from "react-toastify";
import images from "@assets/index"; // or "@assets/index"
import Loading from "@components/common/Loading"
import { useSelector } from "react-redux";
import { useTranslate } from "@hooks/useTranslate";
import { RootState } from "@store/store";
import styles from "@styles/styles";

const HeroSection: React.FC = () => {
  const trans = useTranslate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headline, setHeadline] = useState<string>("");
  const [subHeadline, setSubHeadline] = useState<string>("");
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [editingField, setEditingField] = useState<"headline" | "subHeadline" | null>(null);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY, // For Vite
  });

  const buildPrompt = () => {
    if (currentLanguage === "ar") {
      return (
        "أنشئ عنوانًا رئيسيًا وعنوانًا فرعيًا حول الصواريخ بالتنسيق التالي فقط:\nheadline: ...\nsubheadline: ...\n" +
        "يجب أن يكون كل منهما بين 40 و50 حرفًا."
      );
    } else {
      return (
        "Generate a random headline and subheadline about rockets strictly formatted as:\nheadline: ...\nsubheadline: ...\n" +
        "Each should be between 40 and 50 characters."
      );
    }
  };

  const regenerateContent = async () => {
    const initHeadline: string = "No Headline Found!";
    const initSubHeadLine: string = "No subheadline found";
    try {
      setIsLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: buildPrompt() }],
          },
        ],
      });

      const output = response.text;
      const match = output?.match(/headline:\s*(.+)\s*subheadline:\s*(.+)/i);

      if (match) {
        setHeadline(match[1].trim());
        setSubHeadline(match[2].trim());
        setImageIndex((prev) => (prev + 1) % images.length);
        setIsLoading(false);
        toast.success("New content generated!");
      } else {
        throw new Error("Unexpected format");
      }
    } catch (err) {
      setHeadline(initHeadline);
      setSubHeadline(initSubHeadLine);
      setImageIndex(0);
      setIsLoading(false);

      console.error(err);
      toast.error("Failed to generate AI content");
    }
  };

  useEffect(() => {
    regenerateContent();
    // only run once when language is ready
  }, [currentLanguage]);
  
  const handleTextClick = (field: "headline" | "subHeadline") => {
    setEditingField(field);
  };

  const handleInputBlur = () => {
    setEditingField(null);
  };

  return (
    <section className={`${styles.normalFlex} flex-col-reverse justify-center sm:flex-row p-6 gap-8 mb-12 scroll-mt-20`}>
      <article className="sm:w-1/2">
        {
          !isLoading ?
          <>
            {/* Headline */}
            {editingField === "headline" ? (
              <input
                autoFocus
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                onBlur={handleInputBlur}
                className="text-4xl sm:text-5xl font-bold text-center sm:text-left w-full bg-transparent border-none focus:outline-none"
              />
            ) : (
              <h2
                className="text-4xl sm:text-5xl font-bold text-center sm:text-left cursor-pointer"
                onClick={() => handleTextClick("headline")}
              >
                {headline}
              </h2>
            )}
    
            {/* Subheadline */}
            {editingField === "subHeadline" ? (
              <textarea
                autoFocus
                value={subHeadline}
                onChange={(e) => setSubHeadline(e.target.value)}
                onBlur={handleInputBlur}
                rows={2}
                className="text-2xl mt-4 text-center sm:text-left dark:text-slate-400 w-full bg-transparent border-none focus:outline-none resize-none"
              />
            ) : (
              <p
                className="text-2xl mt-4 text-center sm:text-left dark:text-slate-400 cursor-pointer whitespace-pre-line"
                onClick={() => handleTextClick("subHeadline")}
              >
                {subHeadline}
              </p>
            )}
    
            <div className={`${styles.normalFlex} gap-4 mt-6 justify-center sm:justify-start`}>
              <button
                onClick={regenerateContent}
                className="bg-white hover:bg-gray-200 text-black font-semibold px-4 py-2 rounded shadow"
              >
                {trans("Regenerate with AI")} 🤖
              </button>
            </div>
          </>
          : <Loading />
        }
      </article>
      <img src={images[imageIndex]} alt="rocket illustration" className="w-1/2 transition-transform duration-500 hover:rotate-12" />
    </section>
  );
};

export default HeroSection;
