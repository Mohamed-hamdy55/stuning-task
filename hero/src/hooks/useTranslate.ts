import translationLanguages from "@utils/translationData";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

type TranslationData = typeof translationLanguages; // Infer the structure
type Language = keyof TranslationData; // "en" | "ar"
type TranslationKeys = keyof TranslationData[Language]; // Keys like "hello" | "welcome"

export function useTranslate() {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  return (key: TranslationKeys): string => {
    return translationLanguages[currentLanguage][key] || key; // Fallback to key if not found
  };
}
