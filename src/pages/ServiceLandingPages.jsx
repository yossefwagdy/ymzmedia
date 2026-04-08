import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const sectionHeadingStyle = (isRTL) => ({
  fontSize: '1.55rem',
  marginBottom: '0.9rem',
  color: '#00f5ff',
  fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Outfit, sans-serif',
  textAlign: isRTL ? 'right' : 'left'
});

const paragraphStyle = (isRTL) => ({
  color: '#e2e8f0',
  lineHeight: 2,
  marginBottom: '0.9rem',
  fontSize: '1.03rem',
  textAlign: isRTL ? 'right' : 'left'
});

const faqQuestionStyle = (isRTL) => ({
  color: '#ffffff',
  fontWeight: 700,
  marginBottom: '0.4rem',
  textAlign: isRTL ? 'right' : 'left'
});

const faqAnswerStyle = (isRTL) => ({
  color: '#e2e8f0',
  lineHeight: 1.9,
  textAlign: isRTL ? 'right' : 'left'
});

const videoPortfolio = [
  { titleEn: 'Al Wafir Rice Commercial', titleAr: 'إعلان رز الوفير', url: 'https://www.youtube.com/embed/86ilY-vrTXU' },
  { titleEn: '57357 Hospital Commercial', titleAr: 'إعلان مستشفى 57357', url: 'https://www.youtube.com/embed/nkKmPEnM_lk' },
  { titleEn: 'El King Series', titleAr: 'مسلسل الكينج', url: 'https://www.youtube.com/embed/LH8kruvVWhk' },
  { titleEn: 'Falcon Group Commercial', titleAr: 'إعلان فالكون جروب', url: 'https://www.youtube.com/embed/l5mkttzhk_w' },
  { titleEn: 'History Teacher', titleAr: 'معلم تاريخ', url: 'https://www.youtube.com/embed/Y-CHJSjxHXU' },
  { titleEn: 'Wedding Hall Commercial', titleAr: 'قاعة أفراح', url: 'https://www.youtube.com/embed/JjDPjF3VHt0' }
];

const videoContent = {
  en: {
    title: 'Video Production and Editing',
    intro:
      'Our video production service is built for brands that want premium visuals and measurable business results. We combine strategic scripting, cinematic direction, and conversion-focused editing to produce assets that perform across paid campaigns, social media, and sales funnels.',
    whyTitle: 'Why Video is King',
    why: [
      'Video is the most persuasive communication format in digital marketing because it blends storytelling, emotion, and proof in a single experience. In crowded markets, static messaging is often ignored, while high-quality video immediately signals credibility and captures attention in the first seconds. For B2B decision makers and consumer audiences alike, moving visuals help explain complex value faster and make your offer easier to trust.',
      'In 2026, discovery behavior is video-first. Buyers compare brands through reels, short-form ads, case-study films, and founder clips before they even visit a website. This means your visual presence is no longer optional. If your videos are inconsistent or low-quality, conversion friction increases and campaign performance declines, even when your offer is strong.',
      'Professional production also multiplies efficiency. One shoot can generate hero videos, vertical cuts, ad variations, testimonials, and website assets. Instead of creating disconnected content pieces, you build a unified media system that supports awareness, consideration, and conversion in parallel.'
    ],
    processTitle: 'Our Process',
    process: [
      'We start with strategic discovery. Our team maps your market position, target audience intent, and campaign objective so every video has a commercial role. We define the core narrative, creative tone, and platform format requirements before production begins. This pre-production stage prevents random output and ensures every shot supports a clear business goal.',
      'Next, we move into concept development and scripting. We craft hooks that earn attention quickly, structure scenes around audience psychology, and design visual transitions that maintain retention. For ad assets, we create multiple intro and CTA variants so your performance team can test and optimize without reshooting entire campaigns.',
      'Production is executed with a cinematic mindset and a performance framework. We capture primary footage, brand texture shots, and modular B-roll that allows flexible repurposing. During editing, we focus on pacing, subtitle hierarchy, brand-safe color treatment, and motion graphics that reinforce key messages without overwhelming the story.',
      'Finally, we deliver platform-optimized exports and rollout guidance. You receive assets tailored for reels, stories, feed, YouTube, landing pages, and paid campaigns. We also provide creative iteration recommendations based on watch-time signals and conversion behavior so your next campaign starts stronger than the last.'
    ],
    benefitsTitle: 'Benefits',
    benefits: [
      'Higher trust at every stage of the funnel through polished visual storytelling and proof-driven narratives.',
      'Faster content velocity by turning one strategic production into multiple high-performing formats.',
      'Lower creative fatigue in ads using modular edits, variant hooks, and message-based cutdowns.',
      'Stronger conversion performance because each video is engineered around a measurable objective, not vanity output.'
    ],
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'How long does a full video production cycle take?',
        a: 'Most projects run 2 to 5 weeks depending on scope, locations, and number of deliverables. We provide a timeline at kickoff and keep production milestones transparent.'
      },
      {
        q: 'Can you produce both cinematic brand films and short-form ads?',
        a: 'Yes. We design production plans that support both premium long-form storytelling and performance-focused short-form assets from the same shoot.'
      },
      {
        q: 'Do you handle scriptwriting and creative direction?',
        a: 'Absolutely. Strategy, scripting, art direction, filming, editing, and motion graphics are managed as one integrated process.'
      },
      {
        q: 'How do you measure success?',
        a: 'We align every asset with KPIs such as retention, completion rate, CTR, qualified leads, and conversion lift, then guide creative iteration based on data.'
      }
    ]
  },
  ar: {
    title: 'إنتاج ومونتاج الفيديو',
    intro:
      'خدمة إنتاج الفيديو لدينا مصممة للعلامات التي تريد صورة احترافية ونتائج تجارية قابلة للقياس. نحن نمزج بين الاستراتيجية والإخراج السينمائي والمونتاج الموجه للتحويل لإنتاج محتوى يعمل بفاعلية عبر الإعلانات المدفوعة والسوشيال ومسارات البيع.',
    whyTitle: 'Why Video is King',
    why: [
      'الفيديو هو أقوى صيغة إقناع في التسويق الرقمي لأنه يجمع القصة والعاطفة والدليل في تجربة واحدة. في سوق مزدحم، الرسائل الثابتة غالبًا تُتجاهل، بينما الفيديو الاحترافي يعلن المصداقية فورًا ويجذب الانتباه من أول ثوانٍ. سواء كان جمهورك شركات أو أفرادًا، المحتوى المرئي المتحرك يشرح القيمة بسرعة ويجعل قرار الشراء أكثر ثقة.',
      'في 2026 أصبح سلوك الاكتشاف قائمًا على الفيديو أولًا. العملاء يقارنون العلامات عبر الريلز والإعلانات القصيرة وفيديوهات الحالات قبل دخول الموقع. لذلك لم يعد الظهور المرئي خيارًا إضافيًا. إذا كان المحتوى المرئي غير متسق أو ضعيف الجودة ترتفع مقاومة التحويل حتى لو كان عرضك قويًا.',
      'الإنتاج الاحترافي يرفع الكفاءة كذلك. يوم تصوير واحد يمكن أن ينتج فيديو رئيسيًا ونسخًا قصيرة وإعلانات ومحتوى للموقع وشهادات عملاء. بدلاً من إنتاج مواد متفرقة، تبني نظامًا إعلاميًا موحدًا يدعم الوعي والاعتبار والتحويل في نفس الوقت.'
    ],
    processTitle: 'Our Process',
    process: [
      'نبدأ باكتشاف استراتيجي يحدد موقع علامتك ونية الجمهور وهدف الحملة، بحيث يكون لكل فيديو دور تجاري واضح. نضع الرسالة الرئيسية والنبرة الإبداعية ومتطلبات كل منصة قبل بدء التنفيذ، وهذا يقلل العشوائية ويضمن أن كل مشهد يخدم هدفًا ملموسًا.',
      'ثم ننتقل إلى تطوير الفكرة وكتابة السكريبت. نبني خطافات قوية لجذب الانتباه سريعًا، ونوزع المشاهد وفقًا لسيكولوجية المشاهدة، ونجهز انتقالات بصرية تحافظ على الاستبقاء. وفي الإعلانات نُعد نسخًا متعددة للمقدمة والـ CTA لتسهيل الاختبار والتحسين دون إعادة تصوير كاملة.',
      'في مرحلة الإنتاج ننفذ بعقلية سينمائية وإطار أدائي معًا. نصور اللقطات الأساسية ولقطات الهوية ومواد B-roll مرنة لإعادة التوظيف. وفي المونتاج نركز على الإيقاع والـ subtitles ومعالجة الألوان والموشن جرافيك لدعم الرسالة بدون تشويش.',
      'أخيرًا نسلم نسخًا مهيأة لكل منصة مع توصيات إطلاق. تحصل على ملفات مناسبة للريلز والقصص والفيد ويوتيوب وصفحات الهبوط والحملات المدفوعة، مع مقترحات تطوير مبنية على بيانات المشاهدة والتحويل للحملات القادمة.'
    ],
    benefitsTitle: 'Benefits',
    benefits: [
      'رفع الثقة في كل مراحل القمع عبر سرد بصري احترافي مدعوم بالأدلة.',
      'تسريع وتيرة النشر بتحويل إنتاج واحد إلى صيغ متعددة عالية الأداء.',
      'تقليل تشبع الجمهور الإعلاني عبر نسخ متعددة وخطافات متنوعة.',
      'تحسين التحويل لأن كل فيديو مبني على هدف قابل للقياس وليس على إنتاج شكلي.'
    ],
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'كم يستغرق مشروع إنتاج فيديو متكامل؟',
        a: 'غالبًا من أسبوعين إلى خمسة أسابيع حسب حجم المشروع وعدد المخرجات والمواقع، مع جدول واضح منذ البداية.'
      },
      {
        q: 'هل يمكن إنتاج فيديوهات سينمائية وإعلانات قصيرة معًا؟',
        a: 'نعم، نخطط التصوير ليخدم المحتوى طويل وقصير المدى في نفس الدورة الإنتاجية.'
      },
      {
        q: 'هل تقدمون الكتابة والإخراج الإبداعي؟',
        a: 'بالتأكيد. ندير الاستراتيجية والسكريبت والإخراج والتصوير والمونتاج والموشن ضمن عملية واحدة.'
      },
      {
        q: 'كيف يتم قياس النجاح؟',
        a: 'نربط كل مادة بمؤشرات مثل الاستبقاء ومعدل الإكمال وCTR وجودة العملاء المحتملين ورفع التحويل، ثم نطوّر المحتوى بناءً على البيانات.'
      }
    ]
  }
};

const socialContent = {
  en: {
    title: 'Social Media Management',
    intro:
      'Our social media management service is a growth system, not a posting service. We combine strategy, creative execution, analytics, and community positioning to help brands scale audience quality and measurable business outcomes.',
    methodologyTitle: 'Our Methodology',
    methodology: [
      'We begin with a strategic audit covering positioning, audience segments, competitor content patterns, and platform behavior. This stage reveals where attention is being lost and where growth opportunities already exist. We then build a monthly roadmap that aligns business priorities with platform-native content formats.',
      'Our content architecture is built around conversion-aware pillars: authority, proof, education, and engagement. Each pillar has specific publishing goals so the feed remains visually consistent while still driving pipeline outcomes. This removes random posting behavior and ensures each piece has a job in the funnel.',
      'Execution combines creative velocity with data discipline. We plan production batches, script short-form hooks, design captions for intent, and optimize publishing windows by platform. Community management is integrated so audience signals feed directly into the next content cycle.',
      'We run weekly performance reviews focused on retention, saves, shares, profile actions, lead signals, and campaign assist metrics. This enables rapid iteration and allows us to scale what works while cutting underperforming formats quickly.'
    ],
    guaranteeTitle: 'Why We Guarantee Growth',
    guarantee: [
      'Growth is guaranteed because our model is system-based, not luck-based. We do not rely on one viral post. We build repeatable performance through testing frameworks, creative modularity, and audience feedback loops.',
      'Our team links content to clear commercial KPIs. Instead of reporting vanity impressions only, we track behavior that matters: qualified engagement, inbound inquiries, and conversion contribution. This accountability is why clients see sustainable growth.',
      'We also protect brand consistency while scaling reach. Strong growth fails when identity is diluted; our process ensures tone, message, and visual standards remain aligned as output volume increases.'
    ],
    caseStudiesTitle: 'Case Studies / Success Stories',
    caseStudies: [
      'ElTopic Media: 250,000+ Followers & 1,000,000+ Views',
      'Tanta Elnharda: 70,000+ Followers'
    ],
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'How quickly can we see growth?',
        a: 'Most brands notice momentum in the first 4 to 8 weeks when strategy, creative cadence, and optimization loops are fully active.'
      },
      {
        q: 'Do you handle content creation as part of management?',
        a: 'Yes. We can manage the full workflow from planning and scripting to production, publishing, and reporting.'
      },
      {
        q: 'Which platforms do you manage?',
        a: 'We manage Instagram, TikTok, Facebook, LinkedIn, and YouTube, with strategy adjusted by audience and business model.'
      },
      {
        q: 'How do you report results?',
        a: 'You receive structured reporting with strategic insights, key wins, bottlenecks, and next-month action priorities.'
      }
    ]
  },
  ar: {
    title: 'إدارة السوشيال ميديا',
    intro:
      'خدمة إدارة السوشيال لدينا هي نظام نمو متكامل وليست مجرد نشر يومي. نحن نجمع بين الاستراتيجية والتنفيذ الإبداعي والتحليل وإدارة المجتمع لبناء جمهور أقوى ونتائج تجارية واضحة.',
    methodologyTitle: 'Our Methodology',
    methodology: [
      'نبدأ بمراجعة استراتيجية شاملة تشمل التموضع وتقسيم الجمهور وتحليل المنافسين وسلوك كل منصة. هذه الخطوة تكشف نقاط ضعف الانتباه وفرص النمو المتاحة. بعدها نبني خارطة شهرية تربط أولويات العمل بصيغ محتوى مناسبة لكل منصة.',
      'نقسم المحتوى إلى محاور مرتبطة بالتحويل: سلطة، إثبات، تعليم، وتفاعل. لكل محور هدف نشر واضح حتى يبقى الحساب متسقًا بصريًا وفي نفس الوقت يحقق تأثيرًا تجاريًا داخل القمع التسويقي.',
      'التنفيذ يجمع بين سرعة الإنتاج وانضباط البيانات. نخطط دفعات التصوير ونكتب خطافات قصيرة ونصمم كابشن مبنيًا على النية ونحسن توقيت النشر لكل منصة. كما ندمج إدارة المجتمع حتى تتحول إشارات الجمهور إلى تحسينات مباشرة.',
      'ننفذ مراجعات أسبوعية مركزة على الاستبقاء والحفظ والمشاركة وتفاعلات الملف الشخصي وإشارات العملاء المحتملين. هذا يسمح بتطوير سريع للمحتوى وتوسيع الصيغ الرابحة مع إيقاف العناصر الضعيفة بسرعة.'
    ],
    guaranteeTitle: 'Why We Guarantee Growth',
    guarantee: [
      'نحن نضمن النمو لأن نموذجنا مبني على نظام قابل للتكرار وليس على الحظ. لا نعتمد على بوست واحد فيروسي، بل نبني أداءً مستمرًا عبر الاختبار والتكرار وقراءة الجمهور.',
      'فريقنا يربط المحتوى بمؤشرات تجارية فعلية. بدل الاكتفاء بأرقام ظهور شكلية، نتابع التفاعل المؤهل والاستفسارات الواردة ومساهمة المحتوى في التحويل. هذه المحاسبة هي سبب النمو المستدام.',
      'كما نحافظ على هوية العلامة أثناء التوسع. النمو الحقيقي يفشل إذا ضاعت شخصية العلامة، لذلك نضمن اتساق النبرة والرسالة والهوية البصرية مع زيادة حجم الإنتاج.'
    ],
    caseStudiesTitle: 'Case Studies / Success Stories',
    caseStudies: [
      'ElTopic Media: 250,000+ Followers & 1,000,000+ Views',
      'Tanta Elnharda: 70,000+ Followers'
    ],
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'متى يمكن ملاحظة نتائج النمو؟',
        a: 'غالبًا تبدأ مؤشرات النمو الواضحة خلال 4 إلى 8 أسابيع مع اكتمال دورة الاستراتيجية والإنتاج والتحسين.'
      },
      {
        q: 'هل تتضمن الخدمة صناعة المحتوى؟',
        a: 'نعم، يمكننا إدارة المسار كاملًا من التخطيط والكتابة إلى الإنتاج والنشر والتحليل.'
      },
      {
        q: 'ما المنصات التي تديرونها؟',
        a: 'ندير إنستجرام وتيك توك وفيسبوك ولينكدإن ويوتيوب وفق استراتيجية مخصصة لكل جمهور.'
      },
      {
        q: 'كيف يتم عرض النتائج؟',
        a: 'نقدم تقارير واضحة تتضمن أهم المؤشرات والفرص والتحسينات المطلوبة وخطة الشهر التالي.'
      }
    ]
  }
};

export const VideoProductionServiceLanding = () => {
  const { language, isRTL } = useLanguage();
  const content = videoContent[language] || videoContent.en;

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <article className="glass-card" style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>
          {content.title}
        </h1>
        <p style={paragraphStyle(isRTL)}>{content.intro}</p>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.whyTitle}</h2>
        {content.why.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>
            {paragraph}
          </p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.processTitle}</h2>
        {content.process.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>
            {paragraph}
          </p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.benefitsTitle}</h2>
        <ul style={{ paddingInlineStart: '1.2rem', marginBottom: '1.2rem' }}>
          {content.benefits.map((benefit) => (
            <li key={benefit} style={{ color: '#e2e8f0', lineHeight: 1.9, marginBottom: '0.4rem' }}>
              {benefit}
            </li>
          ))}
        </ul>

        <h2 style={{ ...sectionHeadingStyle(isRTL), marginTop: '1.2rem' }}>
          {language === 'ar' ? 'نماذج من أعمالنا' : 'Portfolio Highlights'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.9rem', marginBottom: '1.4rem' }}>
          {videoPortfolio.map((item) => (
            <div key={item.url} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', overflow: 'hidden' }}>
              <iframe
                width="100%"
                height="170"
                src={item.url}
                title={language === 'ar' ? item.titleAr : item.titleEn}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <p style={{ color: '#e2e8f0', padding: '0.65rem 0.75rem', fontSize: '0.92rem', textAlign: isRTL ? 'right' : 'left' }}>
                {language === 'ar' ? item.titleAr : item.titleEn}
              </p>
            </div>
          ))}
        </div>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.faqTitle}</h2>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {content.faq.map((item) => (
            <div key={item.q} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.02)' }}>
              <p style={faqQuestionStyle(isRTL)}>{item.q}</p>
              <p style={faqAnswerStyle(isRTL)}>{item.a}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.2rem', textAlign: isRTL ? 'right' : 'left' }}>
          <Link to="/contact" style={{ display: 'inline-block', padding: '0.75rem 1.1rem', borderRadius: '999px', background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)', color: '#050510', fontWeight: 700 }}>
            {language === 'ar' ? 'ابدأ مشروع الفيديو الآن' : 'Start Your Video Project'}
          </Link>
        </div>
      </article>
    </section>
  );
};

export const SocialMediaServiceLanding = () => {
  const { language, isRTL } = useLanguage();
  const content = socialContent[language] || socialContent.en;

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <article className="glass-card" style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>
          {content.title}
        </h1>
        <p style={paragraphStyle(isRTL)}>{content.intro}</p>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.methodologyTitle}</h2>
        {content.methodology.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>
            {paragraph}
          </p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.guaranteeTitle}</h2>
        {content.guarantee.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>
            {paragraph}
          </p>
        ))}

        <h2 style={{ ...sectionHeadingStyle(isRTL), marginTop: '1rem' }}>{content.caseStudiesTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.9rem', marginBottom: '1rem' }}>
          {content.caseStudies.map((item) => (
            <div key={item} style={{ border: '1px solid rgba(0,245,255,0.25)', borderRadius: '12px', padding: '1rem', background: 'linear-gradient(145deg, rgba(0,245,255,0.12), rgba(139,92,246,0.1))' }}>
              <p style={{ color: '#ffffff', fontWeight: 800, lineHeight: 1.6, textAlign: isRTL ? 'right' : 'left' }}>{item}</p>
            </div>
          ))}
        </div>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.faqTitle}</h2>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {content.faq.map((item) => (
            <div key={item.q} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.02)' }}>
              <p style={faqQuestionStyle(isRTL)}>{item.q}</p>
              <p style={faqAnswerStyle(isRTL)}>{item.a}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.2rem', textAlign: isRTL ? 'right' : 'left' }}>
          <Link to="/contact" style={{ display: 'inline-block', padding: '0.75rem 1.1rem', borderRadius: '999px', background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)', color: '#050510', fontWeight: 700 }}>
            {language === 'ar' ? 'اطلب خطة نمو سوشيال مخصصة' : 'Request a Custom Social Growth Plan'}
          </Link>
        </div>
      </article>
    </section>
  );
};

const contentCreationLandingContent = {
  en: {
    title: 'Content Creation',
    intro:
      'Our Content Creation service is designed for B2B brands that need more than beautiful posts. You need a predictable content engine that attracts qualified audiences, communicates authority, and supports pipeline growth. At YMZ Media, we build content systems that connect strategy, production quality, and distribution behavior so every asset contributes to awareness, trust, and conversion.',
    approachTitle: 'The YMZ Approach',
    approach: [
      'We begin with a deep brand and market audit. We map your buyer personas, category language, buying objections, and competitive messaging patterns. This allows us to build content that feels specific to your market instead of generic content that gets ignored. Our team identifies which themes should educate, which should prove credibility, and which should drive direct action.',
      'Next, we build a clear editorial architecture. We define content pillars, narrative angles, visual direction, and publishing rhythm for each platform. This creates consistency while avoiding repetition. Your audience sees one coherent brand story across channels, but each piece is adapted to platform behavior and buyer intent.',
      'Production is organized as a system, not isolated requests. We script, shoot, and design in batches so one production cycle can generate short-form clips, carousels, thought-leadership posts, case-story assets, and campaign support content. This reduces cost per asset and increases creative speed without sacrificing quality.',
      'Finally, we close the loop with data-led iteration. Every month, we review performance signals including saves, completion rate, comment quality, profile actions, and lead indicators. The next content cycle is then adjusted by evidence, not assumptions, ensuring continuous quality and stronger outcomes over time.'
    ],
    featuresTitle: 'Core Features',
    features: [
      '**Strategic Content Planning:** Monthly and quarterly roadmaps that align business goals with audience intent, campaign priorities, and platform trends.',
      '**Creative Direction and Scripting:** Hook-focused scripts, narrative sequencing, and message frameworks built to maximize retention and clarity.',
      '**Multi-Format Production:** Reels, short videos, carousels, static graphics, story sets, and long-form educational content from one unified strategy.',
      '**Brand Consistency Framework:** Visual language, tone-of-voice standards, and publishing guidelines that keep every touchpoint cohesive.',
      '**Performance Optimization Loop:** Weekly and monthly reporting with actionable recommendations to improve engagement quality and conversion contribution.'
    ],
    outcomesTitle: 'What You Will Get',
    outcomes: [
      'You will get a content machine that scales with your business, not a random posting schedule. Instead of wondering what to publish each week, your team receives a clear strategic calendar with production priorities and platform-level execution plans.',
      'You will get content that improves buyer confidence. Through educational storytelling, proof-driven narratives, and consistent visual quality, your brand appears more credible and easier to trust in high-stakes B2B buying decisions.',
      'You will get measurable growth support. Our content system is built to influence funnel performance: stronger reach quality, improved engagement depth, better lead intent, and a healthier conversion environment for your sales team.'
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        q: 'How is YMZ content creation different from hiring freelancers per post?',
        a: 'Freelancers usually deliver isolated assets. We deliver a structured content system with strategy, production, and optimization integrated end-to-end.'
      },
      {
        q: 'Can you create content for technical B2B industries?',
        a: 'Yes. We specialize in translating complex services into clear, buyer-friendly narratives that preserve authority and improve comprehension.'
      },
      {
        q: 'How soon can we expect meaningful results?',
        a: 'Most brands see momentum in 6 to 10 weeks when the strategy, publishing cadence, and feedback loop are consistently executed.'
      },
      {
        q: 'Do you handle only content, or full social execution too?',
        a: 'We can provide content-only production or complete social execution including planning, publishing, community inputs, and reporting.'
      }
    ]
  },
  ar: {
    title: 'صناعة المحتوى',
    intro:
      'خدمة صناعة المحتوى لدينا موجهة للعلامات B2B التي تحتاج أكثر من منشورات جميلة. أنت تحتاج نظام محتوى قابل للتوسع يجذب جمهورًا مؤهلًا، ويعزز الثقة، ويدعم النمو التجاري. في YMZ Media نبني منظومة تربط الاستراتيجية بجودة الإنتاج وسلوك التوزيع حتى يخدم كل أصل هدفًا واضحًا في الوعي والاعتبار والتحويل.',
    approachTitle: 'The YMZ Approach',
    approach: [
      'نبدأ بتشخيص عميق للعلامة والسوق. نحلل شخصيات العملاء ولغة الفئة واعتراضات الشراء ورسائل المنافسين، ثم نبني محتوى دقيقًا ومخصصًا للسوق بدل المحتوى العام الذي لا يترك أثرًا. نحدد بوضوح أي المواضيع للتعليم، وأيها للإثبات، وأيها لدفع الإجراء.',
      'بعد ذلك نؤسس هيكلًا تحريريًا واضحًا. نحدد محاور المحتوى والزوايا السردية والاتجاه البصري وإيقاع النشر لكل منصة. هذا يحقق اتساق الهوية دون تكرار ممل، ويجعل تجربة العلامة موحدة عبر القنوات مع تخصيص ذكي لطبيعة كل منصة.',
      'الإنتاج لدينا يتم كنظام لا كطلبات متفرقة. نخطط التصوير والتصميم والكتابة على دفعات بحيث تنتج الدورة الواحدة مقاطع قصيرة وكاروسيل ومحتوى تعليمي وقصص نجاح وأصول داعمة للحملات. النتيجة هي تكلفة أقل لكل أصل وسرعة أعلى بجودة ثابتة.',
      'ثم نغلق الحلقة بالتحسين القائم على البيانات. نراجع شهريًا مؤشرات مثل الحفظ ومعدل الإكمال وجودة التعليقات وتفاعلات الملف وإشارات العملاء المحتملين. وبناءً على ذلك نعيد ضبط الدورة التالية لضمان تطوير مستمر وأداء أقوى.'
    ],
    featuresTitle: 'Core Features',
    features: [
      '**تخطيط محتوى استراتيجي:** خارطة شهرية وربع سنوية تربط أهداف العمل بنية الجمهور واتجاهات المنصات.',
      '**توجيه إبداعي وكتابة احترافية:** سكربتات قوية مبنية على الخطاف وتسلسل سردي واضح يحافظ على الانتباه.',
      '**إنتاج متعدد الصيغ:** ريلز، فيديوهات قصيرة، كاروسيل، تصاميم ثابتة، قصص، ومحتوى تعليمي طويل من استراتيجية واحدة.',
      '**إطار اتساق الهوية:** معايير بصرية ونبرة خطاب وقواعد نشر تحافظ على حضور موحد في كل نقطة تواصل.',
      '**حلقة تحسين أداء:** تقارير أسبوعية وشهرية مع توصيات عملية لتحسين جودة التفاعل ودعم التحويل.'
    ],
    outcomesTitle: 'What You Will Get',
    outcomes: [
      'ستحصل على محرك محتوى يتوسع مع نمو أعمالك بدل جدول نشر عشوائي. لن يبدأ فريقك كل أسبوع من الصفر، بل يعمل ضمن خطة واضحة بأولويات إنتاج دقيقة.',
      'ستحصل على محتوى يرفع ثقة العميل. عبر السرد التعليمي وإثبات النتائج والاتساق البصري، تصبح علامتك أكثر مصداقية وأسهل في اتخاذ قرار التعامل معها.',
      'ستحصل على دعم نمو قابل للقياس. النظام الذي نبنيه يؤثر مباشرة في جودة الوصول وعمق التفاعل ونية العميل المحتمل وبيئة التحويل لدى فريق المبيعات.'
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        q: 'ما الفرق بين YMZ وبين العمل مع مستقلين لكل منشور؟',
        a: 'المستقل غالبًا يقدم أصلًا منفردًا، بينما نحن نقدم نظامًا متكاملًا يجمع الاستراتيجية والإنتاج والتحسين بشكل مستمر.'
      },
      {
        q: 'هل يمكنكم صناعة محتوى لقطاعات B2B المعقدة؟',
        a: 'نعم، نحن متخصصون في تبسيط الخدمات المعقدة إلى رسائل واضحة تحافظ على الاحترافية وتزيد الفهم.'
      },
      {
        q: 'متى يمكن رؤية نتائج واضحة؟',
        a: 'غالبًا تظهر مؤشرات قوية خلال 6 إلى 10 أسابيع عند الالتزام بدورة التنفيذ والتحسين.'
      },
      {
        q: 'هل تقدمون صناعة محتوى فقط أم إدارة تنفيذ كاملة؟',
        a: 'نقدم الخيارين: إنتاج محتوى فقط أو تنفيذ كامل يشمل التخطيط والنشر والمتابعة والتقارير.'
      }
    ]
  }
};

const brandStrategyLandingContent = {
  en: {
    title: 'Brand Strategy',
    intro:
      'Brand Strategy is the operating system behind sustainable growth. Without strategic clarity, campaigns become expensive, messaging becomes inconsistent, and sales teams carry unnecessary friction. YMZ Media builds brand strategy for B2B companies that want stronger positioning, faster trust, and measurable commercial impact.',
    approachTitle: 'The YMZ Approach',
    approach: [
      'Our process starts with market intelligence. We assess category dynamics, competitor claims, audience beliefs, and purchase triggers. This gives us a realistic picture of where your brand can win and what narratives are already overused in your market.',
      'We then define your strategic core: positioning statement, value hierarchy, proof pillars, and differentiation matrix. This framework becomes the foundation for marketing campaigns, sales messaging, and content direction. It prevents mixed signals and allows your team to communicate with precision.',
      'Next, we translate strategy into execution architecture. We align brand voice, offer narratives, campaign themes, and channel priorities so every output reinforces the same strategic promise. Your audience should hear one coherent message across ads, website, socials, proposals, and sales calls.',
      'Finally, we implement a strategic governance model. Teams receive clear guidelines, messaging standards, and review checkpoints that protect brand integrity as you scale. This ensures the strategy remains active in daily operations, not a document that sits unused.'
    ],
    featuresTitle: 'Core Features',
    features: [
      '**Positioning and Messaging Architecture:** Clear category position, narrative territory, and communication hierarchy tailored to your buyer journey.',
      '**Audience and Offer Intelligence:** Segmentation, pain-point mapping, buying triggers, and value proposition alignment.',
      '**Differentiation Framework:** Practical proof points and strategic distinctions that separate your brand from look-alike competitors.',
      '**Brand Voice and Expression Guidelines:** Tone principles and communication rules to maintain consistency across departments.',
      '**Go-to-Market Strategy Alignment:** Strategic playbooks that connect brand direction with content, performance marketing, and sales execution.'
    ],
    outcomesTitle: 'What You Will Get',
    outcomes: [
      'You will get strategic clarity that reduces wasted spend. Campaign teams execute faster when core messaging and offer hierarchy are already defined and approved.',
      'You will get stronger buyer trust and higher conversion quality. Clear positioning helps prospects understand why your brand is the right choice, which improves lead qualification and sales efficiency.',
      'You will get a scalable brand foundation. As your business expands into new offers, channels, or markets, your strategy framework keeps communication coherent and protects long-term brand equity.'
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        q: 'Do we need brand strategy if we already run ads?',
        a: 'Yes. Ads without strategy can generate traffic, but they rarely build consistent trust or efficient conversion at scale.'
      },
      {
        q: 'How long does a brand strategy engagement take?',
        a: 'Most projects run 4 to 8 weeks based on business complexity, stakeholder availability, and implementation scope.'
      },
      {
        q: 'Can your strategy be used by our internal sales team?',
        a: 'Absolutely. We structure messaging so marketing and sales can use one language system for stronger pipeline alignment.'
      },
      {
        q: 'Will this help us compete in crowded markets?',
        a: 'That is exactly the goal. Strategy is how brands create defensible relevance when competitors offer similar services.'
      }
    ]
  },
  ar: {
    title: 'استراتيجية العلامة التجارية',
    intro:
      'استراتيجية العلامة هي نظام التشغيل الحقيقي للنمو المستدام. بدون وضوح استراتيجي تصبح الحملات أكثر كلفة والرسائل متضاربة وفريق المبيعات تحت ضغط أكبر. في YMZ Media نبني استراتيجيات للعلامات B2B التي تريد تموضعًا أقوى وثقة أسرع وتأثيرًا تجاريًا قابلًا للقياس.',
    approachTitle: 'The YMZ Approach',
    approach: [
      'نبدأ بذكاء سوقي عملي. نحلل ديناميكيات الفئة ورسائل المنافسين وقناعات الجمهور ومحفزات الشراء، لنحدد بدقة أين يمكن لعلامتك أن تتفوق وما الرسائل المستهلكة التي يجب تجنبها.',
      'ثم نحدد الجوهر الاستراتيجي للعلامة: بيان التموضع وتسلسل القيمة ومحاور الإثبات ومصفوفة التميّز. هذا الإطار يصبح قاعدة موحدة للحملات والتسويق والمبيعات، ويمنع تضارب الرسائل داخل الفريق.',
      'بعد ذلك نحول الاستراتيجية إلى بنية تنفيذ. نربط نبرة العلامة بسرد العروض ومحاور الحملات وأولوية القنوات، بحيث يعكس كل محتوى نفس الوعد الاستراتيجي عبر الإعلانات والموقع والسوشيال والعروض التجارية.',
      'أخيرًا نفعّل حوكمة استراتيجية تضمن الاستدامة. يحصل الفريق على أدلة استخدام ومعايير مراجعة ونقاط ضبط تحافظ على هوية العلامة أثناء التوسع، حتى تبقى الاستراتيجية ممارسة يومية لا ملفًا نظريًا.'
    ],
    featuresTitle: 'Core Features',
    features: [
      '**هندسة التموضع والرسائل:** تحديد موقع واضح للعلامة وتسلسل رسائل مناسب لرحلة الشراء.',
      '**تحليل الجمهور والعرض:** تقسيم الشرائح وربط ألم العميل بقيمة العرض ومحفزات القرار.',
      '**إطار التميّز التنافسي:** نقاط إثبات استراتيجية تفصل علامتك عن المنافسين المتشابهين.',
      '**دليل نبرة العلامة والتعبير:** قواعد خطاب موحدة تضمن اتساق التواصل بين الفرق.',
      '**مواءمة استراتيجية الإطلاق:** ربط توجه العلامة بالمحتوى والتسويق الأدائي وتنفيذ المبيعات.'
    ],
    outcomesTitle: 'What You Will Get',
    outcomes: [
      'ستحصل على وضوح استراتيجي يقلل الهدر الإعلاني. تنفيذ الحملات يصبح أسرع حين تكون الرسائل الأساسية وتسلسل العرض محددًا مسبقًا.',
      'ستحصل على ثقة أعلى وجودة تحويل أفضل. التموضع الواضح يجعل العميل يفهم لماذا علامتك هي الخيار الأنسب، ما يرفع كفاءة التأهيل ونسب الإغلاق.',
      'ستحصل على أساس قابل للتوسع. عند التوسع إلى عروض أو قنوات أو أسواق جديدة، يحافظ الإطار الاستراتيجي على اتساق الرسالة ويصون قيمة العلامة على المدى الطويل.'
    ],
    faqTitle: 'Frequently Asked Questions',
    faq: [
      {
        q: 'هل نحتاج استراتيجية علامة إذا كنا نشغّل إعلانات بالفعل؟',
        a: 'نعم، لأن الإعلانات بدون استراتيجية قد تجلب زيارات لكنها لا تبني ثقة متسقة ولا تحقق تحويلًا كفؤًا على المدى الطويل.'
      },
      {
        q: 'كم يستغرق مشروع الاستراتيجية؟',
        a: 'غالبًا من 4 إلى 8 أسابيع بحسب تعقيد النشاط وتوفر أصحاب القرار ونطاق التنفيذ.'
      },
      {
        q: 'هل يمكن لفريق المبيعات الداخلي استخدام مخرجات الاستراتيجية؟',
        a: 'بالتأكيد. نحن نبني نظام رسائل موحدًا يخدم التسويق والمبيعات معًا لتحسين انسجام القمع البيعي.'
      },
      {
        q: 'هل تساعدنا الاستراتيجية على المنافسة في سوق مزدحم؟',
        a: 'هذا هو الهدف الأساسي. الاستراتيجية تصنع تميزًا قابلاً للدفاع عندما تتشابه الخدمات بين المنافسين.'
      }
    ]
  }
};

const renderFeature = (feature, isRTL) => {
  const [bold, rest] = feature.split(':');
  return (
    <li key={feature} style={{ color: '#e2e8f0', lineHeight: 1.9, marginBottom: '0.45rem', textAlign: isRTL ? 'right' : 'left' }}>
      <strong style={{ color: '#ffffff' }}>{bold}:</strong>
      {rest}
    </li>
  );
};

export const ContentCreationServiceLanding = () => {
  const { language, isRTL } = useLanguage();
  const content = contentCreationLandingContent[language] || contentCreationLandingContent.en;

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <article className="glass-card" style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>{content.title}</h1>
        <p style={paragraphStyle(isRTL)}>{content.intro}</p>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.approachTitle}</h2>
        {content.approach.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>{paragraph}</p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.featuresTitle}</h2>
        <ul style={{ paddingInlineStart: '1.2rem', marginBottom: '1rem' }}>
          {content.features.map((feature) => renderFeature(feature, isRTL))}
        </ul>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.outcomesTitle}</h2>
        {content.outcomes.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>{paragraph}</p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.faqTitle}</h2>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {content.faq.map((item) => (
            <div key={item.q} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ ...faqQuestionStyle(isRTL), fontSize: '1rem' }}>{item.q}</h3>
              <p style={faqAnswerStyle(isRTL)}>{item.a}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.2rem', textAlign: isRTL ? 'right' : 'left' }}>
          <Link to="/contact" style={{ display: 'inline-block', padding: '0.75rem 1.1rem', borderRadius: '999px', background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)', color: '#050510', fontWeight: 700 }}>
            {language === 'ar' ? 'اطلب خطة محتوى متكاملة' : 'Request a Content System'}
          </Link>
        </div>
      </article>
    </section>
  );
};

export const BrandStrategyServiceLanding = () => {
  const { language, isRTL } = useLanguage();
  const content = brandStrategyLandingContent[language] || brandStrategyLandingContent.en;

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', direction: isRTL ? 'rtl' : 'ltr' }}>
      <article className="glass-card" style={{ maxWidth: '980px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', textAlign: isRTL ? 'right' : 'left' }}>{content.title}</h1>
        <p style={paragraphStyle(isRTL)}>{content.intro}</p>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.approachTitle}</h2>
        {content.approach.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>{paragraph}</p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.featuresTitle}</h2>
        <ul style={{ paddingInlineStart: '1.2rem', marginBottom: '1rem' }}>
          {content.features.map((feature) => renderFeature(feature, isRTL))}
        </ul>

        <h2 style={sectionHeadingStyle(isRTL)}>{content.outcomesTitle}</h2>
        {content.outcomes.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle(isRTL)}>{paragraph}</p>
        ))}

        <h2 style={sectionHeadingStyle(isRTL)}>{content.faqTitle}</h2>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {content.faq.map((item) => (
            <div key={item.q} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ ...faqQuestionStyle(isRTL), fontSize: '1rem' }}>{item.q}</h3>
              <p style={faqAnswerStyle(isRTL)}>{item.a}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.2rem', textAlign: isRTL ? 'right' : 'left' }}>
          <Link to="/contact" style={{ display: 'inline-block', padding: '0.75rem 1.1rem', borderRadius: '999px', background: 'linear-gradient(135deg, #00f5ff, #8b5cf6)', color: '#050510', fontWeight: 700 }}>
            {language === 'ar' ? 'احجز ورشة استراتيجية العلامة' : 'Book a Brand Strategy Session'}
          </Link>
        </div>
      </article>
    </section>
  );
};
