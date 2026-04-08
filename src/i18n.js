import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navHome: 'Home',
      navServices: 'Services',
      navBlog: 'Blog',
      navAbout: 'About',
      navAgents: 'Agents',
      navCertificates: 'Certificates',
      navContact: 'Contact',
      langSwitch: 'العربية',
      footerTagline:
        'Elevating brands through cinematic storytelling and high-performance digital media.',
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      allRights: 'All rights reserved.',
      backToTop: 'Back to top',

      heroSubtitle: 'Elevating Brands Through Visual Storytelling',
      ourExpertise: 'Our Expertise',
      selectedWorks: 'Selected Works',
      clientTestimonials: 'Client Testimonials',
      whatClientsSay: 'What our clients say about working with us',
      trustedBy: 'Trusted By',
      ourPartners: 'Our Partners',
      letsWork: "Let's Work Together",
      contactDesc:
        "Ready to elevate your brand? Get in touch and let's create something amazing.",
      contactUs: 'Contact Us',

      services: 'Services',
      portfolio: 'Portfolio',
      testimonials: 'Testimonials',
      contact: 'Contact',

      socialMedia: 'Social Media',
      socialMediaDesc:
        'Strategic management and growth hacking to build your digital community.',
      videoEditing: 'Video Editing',
      videoEditingDesc:
        'Cinematic post-production, motion graphics, and VFX that captivate.',
      contentCreation: 'Content Creation',
      contentCreationDesc:
        'High-quality visuals and storytelling tailored to your brand.',
      brandStrategy: 'Brand Strategy',
      brandStrategyDesc:
        'Comprehensive roadmaps to position your brand as a leader.',

      happyClients: 'Happy Clients',
      projectsDone: 'Projects Done',
      yearsExperience: 'Years Experience',
      viewsGenerated: 'Views Generated',
      videoProduction: 'Video Production',

      testimonial1Name: 'Ahmed Hassan',
      testimonial1Role: 'Marketing Director',
      testimonial1Company: 'TechCorp',
      testimonial1Content:
        'YMZ Media transformed our brand presence completely. Their creative vision and attention to detail exceeded all expectations.',
      testimonial2Name: 'Sarah Mohamed',
      testimonial2Role: 'CEO',
      testimonial2Company: 'StartupX',
      testimonial2Content:
        'Working with YMZ was a game-changer. They delivered outstanding video content that boosted our engagement by 300%.',
      testimonial3Name: 'Omar Khaled',
      testimonial3Role: 'Brand Manager',
      testimonial3Company: 'GlobalBrand',
      testimonial3Content:
        'Professional, creative, and incredibly responsive. YMZ Media is our go-to partner for all things digital and visual.',

      servicesSubtitle: 'Select a service to explore strategy, deliverables, and impact.',
      serviceBenefits: 'Key Benefits',
      mediaPreview: 'Media Preview',
      serviceNotFound: 'Service not found.',
      browseServices: 'Browse services',

      blogTitle: 'Blog',
      blogSubtitle: 'Insights on production, growth, and digital storytelling.',
      readArticle: 'Read Article',

      certificatesSubtitle:
        'Verified certifications from Google and YouTube that strengthen our strategy, execution, and platform expertise.',
      homeCertificatesTitle: 'Our Certifications',
      homeCertificatesSubtitle:
        'Recognized credentials that validate our practical capabilities across YouTube growth, analytics, and video advertising.',
      viewAllCertificates: 'View All Certificates',

      aboutTitle: 'About YMZ Media',
      aboutText:
        'We are a creative media studio blending cinematic craft, digital growth strategy, and measurable business outcomes.',

      agentsTitle: 'Our Agents',
      agentsText:
        'Our specialist teams handle strategy, creative production, media buying, and campaign optimization.',

      contactTitle: 'Contact',
      contactText:
        'Tell us your vision and timeline. We will build a tailored production and growth roadmap.',

      ctaPrimary: 'Start Your Project',
      ctaSecondary: 'View Services'
    }
  },
  ar: {
    translation: {
      navHome: 'الرئيسية',
      navServices: 'الخدمات',
      navBlog: 'المدونة',
      navAbout: 'من نحن',
      navAgents: 'الوكلاء',
      navCertificates: 'الشهادات',
      navContact: 'تواصل',
      langSwitch: 'English',
      footerTagline:
        'نرتقي بالعلامات التجارية عبر السرد السينمائي وحلول الإعلام الرقمي عالية الأداء.',
      quickLinks: 'روابط سريعة',
      followUs: 'تابعنا',
      allRights: 'جميع الحقوق محفوظة.',
      backToTop: 'العودة للأعلى',

      heroSubtitle: 'نرتقي بالعلامات التجارية من خلال السرد المرئي',
      ourExpertise: 'خبراتنا',
      selectedWorks: 'أعمال مختارة',
      clientTestimonials: 'آراء العملاء',
      whatClientsSay: 'ماذا يقول عملاؤنا عن العمل معنا',
      trustedBy: 'عملاؤنا',
      ourPartners: 'شركاؤنا',
      letsWork: 'لنعمل معًا',
      contactDesc: 'جاهز للارتقاء بعلامتك؟ تواصل معنا لنصنع شيئًا استثنائيًا.',
      contactUs: 'تواصل معنا',

      services: 'الخدمات',
      portfolio: 'الأعمال',
      testimonials: 'آراء العملاء',
      contact: 'تواصل',

      socialMedia: 'السوشيال ميديا',
      socialMediaDesc: 'إدارة استراتيجية ونمو سريع لبناء مجتمعك الرقمي.',
      videoEditing: 'مونتاج الفيديو',
      videoEditingDesc: 'إنتاج سينمائي وموشن جرافيك ومؤثرات بصرية مؤثرة.',
      contentCreation: 'صناعة المحتوى',
      contentCreationDesc: 'محتوى بصري وقصصي عالي الجودة مصمم لهوية علامتك.',
      brandStrategy: 'استراتيجية العلامة',
      brandStrategyDesc: 'خطط شاملة لتموضع علامتك كقائد في السوق.',

      happyClients: 'عميل سعيد',
      projectsDone: 'مشروع منجز',
      yearsExperience: 'سنوات خبرة',
      viewsGenerated: 'مشاهدة',
      videoProduction: 'إنتاج فيديو',

      testimonial1Name: 'أحمد حسن',
      testimonial1Role: 'مدير التسويق',
      testimonial1Company: 'تك كورب',
      testimonial1Content:
        'غيّرت YMZ Media حضور علامتنا بالكامل. رؤيتهم الإبداعية واهتمامهم بالتفاصيل فاق كل التوقعات.',
      testimonial2Name: 'سارة محمد',
      testimonial2Role: 'المدير التنفيذي',
      testimonial2Company: 'ستارت أب إكس',
      testimonial2Content:
        'العمل مع YMZ كان نقطة تحول حقيقية. قدموا محتوى فيديو مذهل رفع التفاعل بنسبة 300%.',
      testimonial3Name: 'عمر خالد',
      testimonial3Role: 'مدير العلامة التجارية',
      testimonial3Company: 'جلوبال براند',
      testimonial3Content:
        'محترفون ومبدعون وسريعو الاستجابة. YMZ Media شريكنا الموثوق في كل ما يتعلق بالمحتوى الرقمي.',

      servicesSubtitle: 'اختر خدمة للتعرّف على الاستراتيجية والمخرجات والأثر.',
      serviceBenefits: 'الفوائد الأساسية',
      mediaPreview: 'معاينة الوسائط',
      serviceNotFound: 'الخدمة غير موجودة.',
      browseServices: 'تصفح الخدمات',

      blogTitle: 'المدونة',
      blogSubtitle: 'رؤى حول الإنتاج والنمو والسرد الرقمي.',
      readArticle: 'اقرأ المقال',

      certificatesSubtitle:
        'شهادات موثقة من Google وYouTube تعزز خبرتنا في الاستراتيجية والتنفيذ وفهم المنصات.',
      homeCertificatesTitle: 'شهاداتنا',
      homeCertificatesSubtitle:
        'اعتمادات معتمدة تؤكد قدراتنا العملية في نمو قنوات يوتيوب والتحليلات وإعلانات الفيديو.',
      viewAllCertificates: 'عرض جميع الشهادات',

      aboutTitle: 'عن YMZ Media',
      aboutText:
        'نحن استوديو إعلامي إبداعي نمزج بين الحرفة السينمائية واستراتيجيات النمو ونتائج الأعمال القابلة للقياس.',

      agentsTitle: 'وكلاؤنا',
      agentsText:
        'فرقنا المتخصصة تدير الاستراتيجية والإنتاج الإبداعي وشراء الوسائط وتحسين الحملات.',

      contactTitle: 'تواصل',
      contactText:
        'شاركنا رؤيتك والجدول الزمني، وسنبني لك خارطة طريق مخصصة للإنتاج والنمو.',

      ctaPrimary: 'ابدأ مشروعك',
      ctaSecondary: 'استعرض الخدمات'
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
