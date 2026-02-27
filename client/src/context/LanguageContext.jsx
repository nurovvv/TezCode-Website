import { createContext, useContext, useState, useCallback } from 'react';
import en from '../i18n/en.json';
import ru from '../i18n/ru.json';
import tj from '../i18n/tj.json';

const translations = { en, ru, tj };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('tezcode-lang') || 'ru';
    });

    const switchLang = useCallback((newLang) => {
        setLang(newLang);
        localStorage.setItem('tezcode-lang', newLang);
    }, []);

    const t = useCallback((key, options = {}) => {
        const keys = key.split('.');
        let value = translations[lang];

        for (const k of keys) {
            if (value === undefined || value === null) return key;
            value = value[k];
        }

        if (value === undefined || value === null) return key;

        // If it's an array/object and we didn't explicitly ask for it, 
        // return the key or a stringified version to avoid React render errors
        if (typeof value === 'object' && !options.returnObjects) {
            return key;
        }

        return value;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang: switchLang, language: lang, setLanguage: switchLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
