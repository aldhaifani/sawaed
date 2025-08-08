export type Locale = "en" | "ar";

export type Dictionary = {
  nav: {
    brand: string;
    home: string;
    about: string;
    contact: string;
    faq: string;
    getStarted: string;
    switchTo: string; // label for switching language
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
  };
  features: {
    showcaseTitle: string;
    showcaseDesc: string;
    guidanceTitle: string;
    guidanceDesc: string;
    matchedTitle: string;
    matchedDesc: string;
  };
  faq: {
    heading: string;
    intro: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  quotes: {
    q1: string;
    q1Author: string;
    q2: string;
    q2Author: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      brand: "Sawaed",
      home: "Home",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      getStarted: "Get Started",
      switchTo: "العربية",
    },
    hero: {
      title1: "Showcase Your Talent.",
      title2: "Shape Your Future.",
      subtitle:
        "Go beyond the traditional CV. Sawaed is your digital space to showcase your true talents, skills, and projects.",
    },
    features: {
      showcaseTitle: "Showcase Your Talent",
      showcaseDesc:
        "Create a standout digital portfolio. Add skills, upload projects, and let your achievements tell your unique story.",
      guidanceTitle: "Get Personalized Guidance",
      guidanceDesc:
        "Receive AI-powered recommendations to develop the exact skills employers need. Your personalized path to career readiness starts here.",
      matchedTitle: "Find Matched Opportunities",
      matchedDesc:
        "Discover opportunities perfectly matched to your new skills and profile. Jobs, internships, and volunteering—all in one place.",
    },
    faq: {
      heading: "Frequently Asked Questions",
      intro:
        "Find answers to common questions about how Sawaed can help you showcase your talents and develop your skills.",
      q1: "How is Sawaed different from a typical job platform?",
      a1: "Job platforms are for the final step: applying. Sawaed is for everything that comes before it. We are a showcasing and development platform. Here, you build a dynamic profile that truly represents your skills and projects, get personalized guidance to improve, and then discover a wide range of opportunities (internships, volunteering, and jobs) that match your unique, well-prepared profile.",
      q2: "Who is Sawaed for?",
      a2: "Sawaed is designed for two main groups: Omani youth (typically 16-25) looking to build their skills and showcase their talents, and all institutions in Oman (public and private) that want to discover and connect with the nation's emerging talent.",
      q3: "How does the personalized guidance work?",
      a3: "Our smart system analyzes the skills you have and the goals you set. It then identifies gaps and recommends specific courses, workshops, and activities to build the skills that are in high demand. Every skill you gain is automatically added to your profile, making it stronger and more visible to institutions.",
      q4: "How is my personal data protected?",
      a4: "Your privacy and data security are our top priority. Nawafidh is built on a secure infrastructure with strict privacy controls. You are always in control of the information you share on your public profile, and your personal contact details are only made visible to institutions when you actively apply for an opportunity.",
      q5: "What if I don't have much experience to showcase yet?",
      a5: "That's exactly why Sawaed exists! The platform is designed to help you build your experience from the ground up. You can start by adding your academic skills, participating in volunteering opportunities, or joining workshops listed on the platform. Every step you take helps build your profile over time.",
    },
    quotes: {
      q1: "It is the hands of the youth that build the nation's present and shape its future.",
      q1Author: "~ HH, Sultan Qaboos, may he rest in peace.",
      q2: "Youths are the wealth of nations and their inexhaustible resource; they are the very arms that build.",
      q2Author: "~ HM, Sultan Haitham, may God protect him.",
    },
  },
  ar: {
    nav: {
      brand: "سواعد",
      home: "الرئيسية",
      about: "من نحن",
      contact: "تواصل معنا",
      faq: "الأسئلة الشائعة",
      getStarted: "ابدأ الآن",
      switchTo: "English",
    },
    hero: {
      title1: "اعرض موهبتك.",
      title2: "وشكّل مستقبلك.",
      subtitle:
        "تجاوز السيرة الذاتية التقليدية. سواعد مساحتك الرقمية لإبراز مواهبك ومهاراتك ومشاريعك الحقيقية.",
    },
    features: {
      showcaseTitle: "اعرض موهبتك",
      showcaseDesc:
        "أنشئ ملفًا رقميًا مميزًا. أضف مهاراتك، وحمّل مشاريعك، ودع إنجازاتك تروي قصتك الفريدة.",
      guidanceTitle: "احصل على إرشاد مخصص",
      guidanceDesc:
        "استقبل توصيات مدعومة بالذكاء الاصطناعي لتطوير المهارات التي يحتاجها أصحاب العمل. ابدأ رحلتك نحو الجاهزية المهنية من هنا.",
      matchedTitle: "اكتشف الفرص المناسبة",
      matchedDesc:
        "اكتشف فرصًا متوافقة تمامًا مع مهاراتك الجديدة وملفك. وظائف، وتدريب، وتطوّع — في مكان واحد.",
    },
    faq: {
      heading: "الأسئلة الشائعة",
      intro:
        "اعثر على إجابات لأبرز الأسئلة حول كيف يمكن لسواعد مساعدتك في إبراز مواهبك وتطوير مهاراتك.",
      q1: "بماذا تختلف سواعد عن منصات الوظائف التقليدية؟",
      a1: "منصات الوظائف للخطوة الأخيرة: التقديم. أما سواعد فتهتم بكل ما قبل ذلك. نحن منصة للعرض والتطوير. هنا تُنشئ ملفًا ديناميكيًا يعبّر حقًا عن مهاراتك ومشاريعك، وتحصل على إرشاد مخصص للتحسين، ثم تكتشف مجموعة واسعة من الفرص (تدريب، تطوّع، ووظائف) المتوافقة مع ملفك القوي والمُعد جيدًا.",
      q2: "لمن صُممت سواعد؟",
      a2: "سواعد موجّهة لفئتين رئيسيتين: الشباب العُماني (عادة 16-25) الراغبين في بناء مهاراتهم وإبراز مواهبهم، وجميع المؤسسات في عُمان (العامة والخاصة) التي ترغب في اكتشاف المواهب الوطنية والتواصل معها.",
      q3: "كيف يعمل الإرشاد المخصص؟",
      a3: "يحلّل نظامنا الذكي المهارات التي تمتلكها والأهداف التي تحددها، ثم يحدد الثغرات ويوصي بدورات وورش وأنشطة محددة لبناء المهارات المطلوبة. كل مهارة تكتسبها تُضاف تلقائيًا إلى ملفك، مما يجعله أقوى وأكثر وضوحًا للمؤسسات.",
      q4: "كيف تُحمى بياناتي الشخصية؟",
      a4: "خصوصيتك وأمان بياناتك أولوية قصوى. تُبنى منصة نوافذ على بنية تحتية آمنة مع ضوابط صارمة للخصوصية. أنت دائمًا تتحكم بالمعلومات التي تشاركها في ملفك العام، وتُعرض تفاصيل الاتصال فقط عند تقدّمك فعليًا لفرصة.",
      q5: "ماذا لو لم تكن لدي خبرة كافية لأعرضها بعد؟",
      a5: "لهذا وُجدت سواعد! صُمّمت المنصة لمساعدتك على بناء خبرتك من الصفر. يمكنك البدء بإضافة مهاراتك الأكاديمية، والمشاركة في فرص التطوع، أو الانضمام إلى الورش المتاحة في المنصة. كل خطوة تخطوها تُسهم في بناء ملفك بمرور الوقت.",
    },
    quotes: {
      q1: "إن سواعد الشباب هي التي تُشيَّد حاضر الوطن وتصنع مستقبله  .",
      q1Author: "~ حضرة صاحب الجلالة السلطان قابوس بن سعيد — طيب الله ثراه",
      q2: "إن الشباب هم أمل الأمة وسواعدها، وعلينا أن نهيئ لهم كل الظروف ليكونوا عناصر فاعلة في بناء هذا الوطن.",
      q2Author: "~ حضرة صاحب الجلالة السلطان هيثم بن طارق المعظم — حفظه الله",
    },
  },
};
