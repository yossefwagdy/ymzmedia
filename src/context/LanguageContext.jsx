import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const { t, i18n } = useTranslation();
    const language = i18n.language?.startsWith('ar') ? 'ar' : 'en';
    const isRTL = language === 'ar';

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [isRTL, language]);

    const toggleLanguage = () => {
        i18n.changeLanguage(language === 'en' ? 'ar' : 'en');
    };

    const value = useMemo(
        () => ({ language, isRTL, t, toggleLanguage }),
        [language, isRTL, t]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider');
    }

    return context;
};

export default LanguageContext;
