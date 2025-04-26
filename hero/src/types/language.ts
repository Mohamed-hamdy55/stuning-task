export type Language = "en" | "ar";

export interface LanguageOption {
  code: Language;
  label: string;
}

export interface LanguageState {
  currentLanguage: Language; // Enforce type-safe values
}