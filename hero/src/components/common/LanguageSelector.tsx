import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@store/store";
import { setLanguage } from "@store/language/languageSlice";
import { LanguageOption } from "@types/language";

const options: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleChange = (selected: LanguageOption | null) => {
    if (selected) dispatch(setLanguage(selected.code));
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#ccc",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 0, 0.1)" : "none",
      "&:hover": { borderColor: "#888" },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "white",
      zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
      "&:active": {
        backgroundColor: "#0d9488",
      },
    }),
  };

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.code === currentLanguage)}
      onChange={handleChange}
      isSearchable={false}
      styles={customStyles}
      className="w-36 text-sm"
    />
  );
};

export default LanguageSelector;
