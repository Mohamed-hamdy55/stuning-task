// store/languageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language, LanguageState } from "@types/language"; // <-- imported from types folder


const initialState: LanguageState = {
  currentLanguage: (localStorage.getItem("language") as Language) || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
