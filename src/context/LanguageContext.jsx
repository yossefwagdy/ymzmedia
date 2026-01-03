import React, { createContext, useContext, useState } from 'react';

const translations = {
    en: {
        // Header
        services: "Services",
        portfolio: "Portfolio",
        testimonials: "Testimonials",
        contact: "Contact",

        // Hero
        heroSubtitle: "Elevating Brands Through Visual Storytelling",

        // Services
        ourExpertise: "OUR EXPERTISE",
        socialMedia: "Social Media",
        socialMediaDesc: "Strategic management and growth hacking to build your digital community.",
        videoEditing: "Video Editing",
        videoEditingDesc: "Cinematic post-production, motion graphics, and VFX that captivate.",
        contentCreation: "Content Creation",
        contentCreationDesc: "High-quality visuals and storytelling tailored to your brand.",
        brandStrategy: "Brand Strategy",
        brandStrategyDesc: "Comprehensive roadmaps to position your brand as a leader.",

        // Stats
        happyClients: "Happy Clients",
        projectsDone: "Projects Done",
        yearsExperience: "Years Experience",
        viewsGenerated: "Views Generated",

        // Portfolio
        selectedWorks: "SELECTED WORKS",
        brandCampaign: "Brand Campaign",
        socialLaunch: "Social Launch",
        productReveal: "Product Reveal",
        corporateFilm: "Corporate Film",
        videoProduction: "Video Production",

        // Testimonials
        clientTestimonials: "CLIENT TESTIMONIALS",
        whatClientsSay: "What our clients say about working with us",

        // Testimonial content
        testimonial1Name: "Ahmed Hassan",
        testimonial1Role: "Marketing Director",
        testimonial1Company: "TechCorp",
        testimonial1Content: "YMZ Media transformed our brand presence completely. Their creative vision and attention to detail exceeded all expectations.",

        testimonial2Name: "Sarah Mohamed",
        testimonial2Role: "CEO",
        testimonial2Company: "StartupX",
        testimonial2Content: "Working with YMZ was a game-changer. They delivered outstanding video content that boosted our engagement by 300%.",

        testimonial3Name: "Omar Khaled",
        testimonial3Role: "Brand Manager",
        testimonial3Company: "GlobalBrand",
        testimonial3Content: "Professional, creative, and incredibly responsive. YMZ Media is our go-to partner for all things digital and visual.",

        // Partners
        trustedBy: "TRUSTED BY",
        ourPartners: "OUR PARTNERS",

        // Contact
        letsWork: "LET'S WORK TOGETHER",
        contactDesc: "Ready to elevate your brand? Get in touch and let's create something amazing.",
        contactUs: "Contact Us",

        // Footer
        allRights: "All rights reserved.",

        // Back to top
        backToTop: "Back to top",
    },
    ar: {
        // Header
        services: "خدماتنا",
        portfolio: "أعمالنا",
        testimonials: "آراء العملاء",
        contact: "تواصل معنا",

        // Hero
        heroSubtitle: "نرتقي بالعلامات التجارية من خلال السرد المرئي",

        // Services
        ourExpertise: "خبراتنا",
        socialMedia: "السوشيال ميديا",
        socialMediaDesc: "إدارة استراتيجية ونمو سريع لبناء مجتمعك الرقمي.",
        videoEditing: "مونتاج الفيديو",
        videoEditingDesc: "إنتاج سينمائي، موشن جرافيك، ومؤثرات بصرية مذهلة.",
        contentCreation: "صناعة المحتوى",
        contentCreationDesc: "صور عالية الجودة وقصص مصممة خصيصاً لعلامتك التجارية.",
        brandStrategy: "استراتيجية العلامة",
        brandStrategyDesc: "خطط شاملة لتحويل علامتك التجارية إلى رائدة في السوق.",

        // Stats
        happyClients: "عميل سعيد",
        projectsDone: "مشروع منجز",
        yearsExperience: "سنوات خبرة",
        viewsGenerated: "مشاهدة",

        // Portfolio
        selectedWorks: "أعمال مختارة",
        brandCampaign: "حملة إعلانية",
        socialLaunch: "إطلاق سوشيال",
        productReveal: "إطلاق منتج",
        corporateFilm: "فيلم مؤسسي",
        videoProduction: "إنتاج فيديو",

        // Testimonials
        clientTestimonials: "آراء العملاء",
        whatClientsSay: "ماذا يقول عملاؤنا عن العمل معنا",

        // Testimonial content
        testimonial1Name: "أحمد حسن",
        testimonial1Role: "مدير التسويق",
        testimonial1Company: "تك كورب",
        testimonial1Content: "YMZ Media غيرت حضور علامتنا التجارية بالكامل. رؤيتهم الإبداعية واهتمامهم بالتفاصيل فاق كل التوقعات.",

        testimonial2Name: "سارة محمد",
        testimonial2Role: "المدير التنفيذي",
        testimonial2Company: "ستارت أب إكس",
        testimonial2Content: "العمل مع YMZ كان نقطة تحول. قدموا محتوى فيديو مذهل زاد تفاعلنا بنسبة 300%.",

        testimonial3Name: "عمر خالد",
        testimonial3Role: "مدير العلامة التجارية",
        testimonial3Company: "جلوبال براند",
        testimonial3Content: "محترفون ومبدعون وسريعو الاستجابة. YMZ Media هم شريكنا الدائم في كل ما يتعلق بالمحتوى الرقمي.",

        // Partners
        trustedBy: "عملاؤنا",
        ourPartners: "شركاؤنا",

        // Contact
        letsWork: "لنعمل معاً",
        contactDesc: "مستعد للارتقاء بعلامتك التجارية؟ تواصل معنا ولنصنع شيئاً مذهلاً.",
        contactUs: "تواصل معنا",

        // Footer
        allRights: "جميع الحقوق محفوظة.",

        // Back to top
        backToTop: "العودة للأعلى",
    }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const isRTL = language === 'ar';

    const t = (key) => {
        const translation = translations[language]?.[key];
        return translation !== undefined ? translation : key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ language, isRTL, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        // Return default values if context not available
        return {
            language: 'en',
            isRTL: false,
            t: (key) => translations.en[key] || key,
            toggleLanguage: () => { }
        };
    }
    return context;
};

export default LanguageContext;
