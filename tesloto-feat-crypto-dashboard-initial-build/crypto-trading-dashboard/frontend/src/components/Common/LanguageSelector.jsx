import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: '🇺🇸 English' },
  { code: 'es', name: '🇪🇸 Español' },
  { code: 'ro', name: '🇷🇴 Română' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-dropdown-container">
        <select
            className="language-dropdown"
            onChange={changeLanguage}
            value={i18n.language.split('-')[0]} // Handle locales like en-US
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    </div>
  );
};

export default LanguageSelector;
