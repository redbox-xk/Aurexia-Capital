export type Language = 'en' | 'sq'

export interface Translations {
  // Navigation
  nav: {
    home: string
    about: string
    services: string
    markets: string
    insights: string
    clients: string
    contact: string
    login: string
    logout: string
    language: string
    company: string
  }

  // Hero Section
  hero: {
    title: string
    subtitle: string
    cta1: string
    cta2: string
    tagline: string
  }

  // Services
  services: {
    title: string
    subtitle: string
    portfolioManagement: string
    portfolioDesc: string
    riskAdvisory: string
    riskDesc: string
    taxStrategy: string
    taxDesc: string
    successionPlanning: string
    successionDesc: string
    viewAll: string
  }

  // Company Info
  company: {
    name: string
    legalName: string
    tagline: string
    mission: string
    about: string
    established: string
    assetUnderAdvisement: string
    clientCount: string
    location: string
    phone: string
    email: string
    hours: string
  }

  // Markets & Stocks
  markets: {
    title: string
    subtitle: string
    stockPrice: string
    change: string
    dayHigh: string
    dayLow: string
    volume: string
    marketCap: string
    news: string
    liveNews: string
    noNews: string
    loading: string
    error: string
    refresh: string
  }

  // Dashboard
  dashboard: {
    title: string
    welcome: string
    assetUnderAdvisement: string
    clientPartnerships: string
    established: string
    yourAdvisor: string
    scheduleConsultation: string
    firmDetails: string
    ourPhilosophy: string
  }

  // Authentication
  auth: {
    signIn: string
    email: string
    password: string
    initiateChallenge: string
    authenticated: string
    success: string
    failed: string
    testCredentials: string
    securePortal: string
  }

  // Newsletter
  newsletter: {
    title: string
    description: string
    email: string
    subscribe: string
    subscribed: string
    error: string
    unsubscribe: string
  }

  // Footer
  footer: {
    company: string
    legal: string
    privacy: string
    terms: string
    contact: string
    rights: string
  }

  // Contact
  contact: {
    title: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    send: string
    success: string
    error: string
  }

  // GDPR & Compliance
  gdpr: {
    consentTitle: string
    consentMessage: string
    essential: string
    analytics: string
    marketing: string
    thirdParty: string
    accept: string
    decline: string
    preferences: string
    privacyPolicy: string
    cookiePolicy: string
  }

  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    save: string
    delete: string
    edit: string
    close: string
    more: string
    less: string
    readMore: string
  }
}

const englishTranslations: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    markets: 'Markets',
    insights: 'Insights',
    clients: 'Clients',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    language: 'Language',
    company: 'Company',
  },

  hero: {
    title: 'Institutional Wealth Advisory',
    subtitle: 'Expert portfolio management and strategic wealth planning for institutional investors',
    cta1: 'Schedule Consultation',
    cta2: 'Explore Services',
    tagline: 'Trust, expertise, and discretion in wealth management',
  },

  services: {
    title: 'Our Services',
    subtitle: 'Comprehensive wealth management solutions tailored to institutional clients',
    portfolioManagement: 'Portfolio Management',
    portfolioDesc: 'Strategic asset allocation and ongoing portfolio optimization',
    riskAdvisory: 'Risk Advisory',
    riskDesc: 'Comprehensive risk assessment and mitigation strategies',
    taxStrategy: 'Tax Strategy',
    taxDesc: 'Efficient tax planning and optimization services',
    successionPlanning: 'Succession Planning',
    successionDesc: 'Multi-generational wealth transfer planning',
    viewAll: 'View All Services',
  },

  company: {
    name: 'Aurexia Capital',
    legalName: 'Aurexia Capital AG',
    tagline: 'Institutional Wealth Advisory',
    mission: 'To provide institutional-grade wealth advisory services with uncompromising standards of fiduciary responsibility, transparency, and discretion.',
    about: 'Aurexia Capital is a premier institutional wealth advisory firm specializing in comprehensive portfolio management, strategic wealth planning, and risk advisory for high-net-worth families and institutional investors.',
    established: '2015',
    assetUnderAdvisement: '$2.4B+',
    clientCount: '150+',
    location: 'Prishtina, Kosovo',
    phone: '+383 (0) 38 123 456',
    email: 'info@aurexiacapital.com',
    hours: 'Monday - Friday, 09:00 - 17:30 CET',
  },

  markets: {
    title: 'Markets & Insights',
    subtitle: 'Real-time market data and financial news',
    stockPrice: 'Price',
    change: 'Change',
    dayHigh: 'Day High',
    dayLow: 'Day Low',
    volume: 'Volume',
    marketCap: 'Market Cap',
    news: 'News',
    liveNews: 'Live Market News',
    noNews: 'No news available',
    loading: 'Loading market data...',
    error: 'Unable to load market data',
    refresh: 'Refresh',
  },

  dashboard: {
    title: 'Client Dashboard',
    welcome: 'Welcome',
    assetUnderAdvisement: 'Assets Under Advisement',
    clientPartnerships: 'Client Partnerships',
    established: 'Established',
    yourAdvisor: 'Your Senior Advisor',
    scheduleConsultation: 'Schedule Consultation',
    firmDetails: 'Firm Details',
    ourPhilosophy: 'Our Philosophy',
  },

  auth: {
    signIn: 'Sign In',
    email: 'Email Address',
    password: 'Password',
    initiateChallenge: 'Initiate Challenge',
    authenticated: 'Authentication Successful',
    success: 'Sign in successful',
    failed: 'Authentication failed',
    testCredentials: 'Test Credentials',
    securePortal: 'Secure Portal Access',
  },

  newsletter: {
    title: 'Stay Updated',
    description: 'Subscribe to our institutional insights and market analysis',
    email: 'Email address',
    subscribe: 'Subscribe',
    subscribed: 'Successfully subscribed',
    error: 'Subscription failed',
    unsubscribe: 'Unsubscribe',
  },

  footer: {
    company: 'Company',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact',
    rights: '© 2026 Aurexia Capital. All rights reserved.',
  },

  contact: {
    title: 'Contact Us',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    success: 'Message sent successfully',
    error: 'Failed to send message',
  },

  gdpr: {
    consentTitle: 'Cookie & Privacy Settings',
    consentMessage: 'We use cookies to enhance your experience. Choose your preferences below.',
    essential: 'Essential Cookies',
    analytics: 'Analytics',
    marketing: 'Marketing',
    thirdParty: 'Third-party Services',
    accept: 'Accept All',
    decline: 'Decline',
    preferences: 'Preferences',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
  },

  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    more: 'More',
    less: 'Less',
    readMore: 'Read More',
  },
}

const albanianTranslations: Translations = {
  nav: {
    home: 'Ballina',
    about: 'Rreth Nesh',
    services: 'Shërbime',
    markets: 'Tregjet',
    insights: 'Njohuri',
    clients: 'Klientët',
    contact: 'Kontakti',
    login: 'Hyrje',
    logout: 'Dilni',
    language: 'Gjuha',
    company: 'Kompania',
  },

  hero: {
    title: 'Këshillim Institucional për Pasuri',
    subtitle: 'Menaxhim i portofolit expert dhe planifikimi strategjik i pasurisë për investitorë institucionalë',
    cta1: 'Planifikoni Konsultim',
    cta2: 'Eksploroni Shërbime',
    tagline: 'Besim, ekspertizë dhe diskrecioni në menaxhimin e pasurisë',
  },

  services: {
    title: 'Shërbime Tona',
    subtitle: 'Zgjidhje gjithëpërfshirëse të menaxhimit të pasurisë të përshtatura për klientë institucionalë',
    portfolioManagement: 'Menaxhimi i Portofolit',
    portfolioDesc: 'Alokimi strategjik i aseteve dhe optimizimi i vazhdueshëm i portofolit',
    riskAdvisory: 'Këshillim për Rrezik',
    riskDesc: 'Vlerësim gjithëpërfshirës i rrezikut dhe strategji mitimi',
    taxStrategy: 'Strategjia Tatimore',
    taxDesc: 'Shërbime efikase të planifikimit tatimor dhe optimizimit',
    successionPlanning: 'Planifikimi i Trashëgimisë',
    successionDesc: 'Planifikimi i transferimit të pasurisë ndërmjet brezave',
    viewAll: 'Shiko të Gjitha Shërbime',
  },

  company: {
    name: 'Aurexia Capital',
    legalName: 'Aurexia Capital AG',
    tagline: 'Këshillim Institucional për Pasuri',
    mission: 'Të ofrojmë shërbime këshillimi të nivelit institucional me standarde të pakompromis të përgjegjësisë fiduciare, transparencës dhe diskrecioni.',
    about: 'Aurexia Capital është një firmë këshillimi të nivelit të lartë institucional që specializohet në menaxhimin gjithëpërfshirës të portofolit, planifikimin strategjik të pasurisë dhe këshillimin në lidhje me rrezikun për familjet me pasuri të lartë dhe investitorë institucionalë.',
    established: '2015',
    assetUnderAdvisement: '$2.4B+',
    clientCount: '150+',
    location: 'Prishtina, Kosovë',
    phone: '+383 (0) 38 123 456',
    email: 'info@aurexiacapital.com',
    hours: 'E hënë - E premte, 09:00 - 17:30 CET',
  },

  markets: {
    title: 'Tregjet dhe Njohuritë',
    subtitle: 'Të dhënat e tregut në kohë reale dhe lajmet financiare',
    stockPrice: 'Çmimi',
    change: 'Ndryshimi',
    dayHigh: 'Maksimumi i Ditës',
    dayLow: 'Minimumi i Ditës',
    volume: 'Vëllimi',
    marketCap: 'Kapitalizimi i Tregut',
    news: 'Lajme',
    liveNews: 'Lajme Direkte të Tregut',
    noNews: 'Nuk ka lajme të disponueshme',
    loading: 'Po ngarkohen të dhënat e tregut...',
    error: 'Nuk mund të ngarkohen të dhënat e tregut',
    refresh: 'Rifresko',
  },

  dashboard: {
    title: 'Paneli i Klientit',
    welcome: 'Mirëseyrdinë',
    assetUnderAdvisement: 'Asetet nën Këshillim',
    clientPartnerships: 'Partneritetet me Klientë',
    established: 'I Themeluar',
    yourAdvisor: 'Këshilltari i Juaj i Senior',
    scheduleConsultation: 'Planifikoni Konsultim',
    firmDetails: 'Detajet e Firmës',
    ourPhilosophy: 'Filozofija Jonë',
  },

  auth: {
    signIn: 'Hyni',
    email: 'Adresa e Postës Elektronike',
    password: 'Fjalëkalimi',
    initiateChallenge: 'Nisni Sfidat',
    authenticated: 'Autentifikimi i Suksesshëm',
    success: 'Hyja me sukses',
    failed: 'Autentifikimi dështoi',
    testCredentials: 'Kredencialet e Testit',
    securePortal: 'Hyrje e Sigurt në Portal',
  },

  newsletter: {
    title: 'Qëndroni të Përditësuar',
    description: 'Abonohuni në njohuritë tona institucionale dhe analizën e tregut',
    email: 'Adresa e postës elektronike',
    subscribe: 'Abonohuni',
    subscribed: 'Abonohuni me sukses',
    error: 'Abonimja dështoi',
    unsubscribe: 'Ndani abonimin',
  },

  footer: {
    company: 'Kompania',
    legal: 'Ligjore',
    privacy: 'Politika e Privatësisë',
    terms: 'Kushtet e Shërbimit',
    contact: 'Kontakti',
    rights: '© 2026 Aurexia Capital. Të gjitha të drejtat e rezervuara.',
  },

  contact: {
    title: 'Na Kontaktoni',
    name: 'Emri i Plotë',
    email: 'Adresa e Postës Elektronike',
    phone: 'Numri i Telefonit',
    subject: 'Tema',
    message: 'Mesazhi',
    send: 'Dërgo Mesazhin',
    success: 'Mesazhi u dërgua me sukses',
    error: 'Dështoi dërgimi i mesazhit',
  },

  gdpr: {
    consentTitle: 'Përdorimi i Cookie dhe Cilësimet e Privatësisë',
    consentMessage: 'Ne përdorim cookies për të përmirësuar përvojën tuaj. Zgjidhni preferencat tuaja më poshtë.',
    essential: 'Cookie Esenciale',
    analytics: 'Analitikat',
    marketing: 'Marketimi',
    thirdParty: 'Shërbime të Palëve të Treta',
    accept: 'Pranoni të Gjitha',
    decline: 'Refuzoni',
    preferences: 'Preferencat',
    privacyPolicy: 'Politika e Privatësisë',
    cookiePolicy: 'Politika e Cookie',
  },

  common: {
    loading: 'Po ngarkohet...',
    error: 'Ndodhi një gabim',
    success: 'Sukses',
    cancel: 'Anullo',
    save: 'Ruaj',
    delete: 'Fshi',
    edit: 'Redakto',
    close: 'Mbyll',
    more: 'Më Shumë',
    less: 'Më Pak',
    readMore: 'Lexo Më Shumë',
  },
}

export function getTranslation(language: Language): Translations {
  return language === 'sq' ? albanianTranslations : englishTranslations
}
