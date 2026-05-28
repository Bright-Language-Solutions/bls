const services = [
  {
    slug: 'translation',
    title: 'Translation Services',
    tagline: 'Precision-crafted translations that read like originals.',
    description:
      'Our certified translators deliver accurate, culturally nuanced translations across 100+ language pairs. Every project is handled by native-speaking subject-matter experts. We cover legal, medical, technical, financial, and general documents.',
    icon: 'Languages',
    features: [
      'Native-speaker translators for every language pair',
      'Quality-assured translation process',
      'Subject-matter specialisation (legal, medical, technical)',
      'Certified translations accepted by government bodies',
      'Strict NDA and data-security protocols',
      'Fast turnaround with no compromise on accuracy',
    ],
    relatedIndustries: ['legal', 'medical', 'technical', 'e-commerce', 'education'],
  },
  {
    slug: 'interpretation',
    title: 'Interpretation Services',
    tagline: 'Real-time language bridging for every critical conversation.',
    description:
      'We provide simultaneous and consecutive interpretation for conferences, legal proceedings, medical consultations, and business negotiations. Our interpreters are trained professionals with deep cultural competence. Available on-site, over-the-phone, and via video remote.',
    icon: 'Mic',
    features: [
      'Simultaneous and consecutive interpretation modes',
      'On-site, OPI (phone), and VRI (video) options',
      'Trained for high-stakes legal and medical settings',
      'Conference and event interpretation with equipment hire',
      'Strict confidentiality agreements',
      'Available 24/7 for urgent bookings',
    ],
    relatedIndustries: ['legal', 'medical', 'e-commerce', 'education'],
  },
  {
    slug: 'voice-over',
    title: 'Voice-Over Services',
    tagline: 'Authentic voices that bring your content to life globally.',
    description:
      'From e-learning modules to corporate explainers and advertisements, our voice-over studio delivers broadcast-quality recordings in 50+ languages. We match voice talent to your brand tone — professional, warm, energetic, or neutral. All files delivered in your preferred format.',
    icon: 'Mic2',
    features: [
      'Curated talent pool: 500+ professional voice artists',
      'Recording in broadcast-grade studio environments',
      'Delivery in WAV, MP3, AIFF, and all major formats',
      'Sync-to-video timing and lip-sync alignment',
      'Regional accent and dialect matching',
      'Rapid 48-hour turnaround for standard scripts',
    ],
    relatedIndustries: ['media-entertainment', 'e-commerce', 'education', 'gaming'],
  },
  {
    slug: 'dubbing',
    title: 'Dubbing Services',
    tagline: 'Lip-synced dubbing that feels native, not translated.',
    description:
      'Our dubbing specialists adapt dialogue timing, emotion, and cultural nuance so dubbed content feels original. We handle films, TV series, corporate videos, and streaming content across major platforms. End-to-end workflow: translation, adaptation, casting, recording, and mix-down.',
    icon: 'Film',
    features: [
      'Full lip-sync dubbing for film and television',
      'Cultural adaptation of idioms and references',
      'Professional casting and director-led sessions',
      'Integrated post-production and audio mix',
      'Support for Netflix, Amazon Prime delivery specs',
      'Available in 40+ target languages',
    ],
    relatedIndustries: ['media-entertainment', 'gaming', 'education'],
  },
  {
    slug: 'subtitling-captioning',
    title: 'Subtitling & Captioning',
    tagline: 'Perfectly timed subtitles that expand your global reach.',
    description:
      'We produce SDH captions, foreign-language subtitles, and closed captions that meet broadcast and streaming standards. Our workflow covers translation, spotting, and quality review against the latest Netflix Timed Text Style Guides. Delivered in SRT, VTT, TTML, and all major formats.',
    icon: 'Captions',
    features: [
      'Subtitle creation, translation, and synchronisation',
      'SDH (subtitles for the deaf and hard of hearing)',
      'Compliance with Netflix, BBC, and EBU guidelines',
      'SRT, VTT, TTML, EBU-STL, and custom formats',
      'Burned-in subtitles for social media content',
      'Verbatim and condensed subtitle styles',
    ],
    relatedIndustries: ['media-entertainment', 'education', 'e-commerce'],
  },
  {
    slug: 'localization',
    title: 'Localization Services',
    tagline: 'Make your product feel built for every market.',
    description:
      'Localization goes beyond translation — we adapt UI strings, date/number formats, cultural imagery, and user flows to match local expectations. Our engineering-aware localization team works with XLIFF, PO files, JSON, and major CMS platforms. We support full software, mobile app, and website localization.',
    icon: 'Globe',
    features: [
      'Software and mobile app localization (iOS, Android, web)',
      'Website and CMS localization (WordPress, Shopify, Contentful)',
      'Culturally sensitive adaptation of images and colours',
      'Locale-specific date, currency, and number formatting',
      'Linguistic QA and in-context review tools',
      'Glossary management and translation memory for consistency',
    ],
    relatedIndustries: ['e-commerce', 'gaming', 'technical', 'education'],
  },
  {
    slug: 'transcription',
    title: 'Transcription Services',
    tagline: 'Every word captured accurately, quickly, and securely.',
    description:
      'We convert audio and video recordings to accurate text transcripts in verbatim, clean-read, or intelligent verbatim formats. Ideal for legal depositions, medical dictations, interviews, podcasts, and research recordings. Turnaround as fast as 4 hours for standard audio.',
    icon: 'FileText',
    features: [
      'Verbatim, clean-read, and intelligent-verbatim formats',
      'Multi-speaker identification and timestamping',
      'Medical, legal, and academic transcription specialisms',
      'Secure file upload and HIPAA-aware handling',
      'Output in DOCX, PDF, SRT, and plain text',
      '99%+ accuracy guaranteed with human QC',
    ],
    relatedIndustries: ['legal', 'medical', 'media-entertainment', 'education'],
  },
  {
    slug: 'desktop-publishing',
    title: 'Desktop Publishing',
    tagline: 'Translated documents that look exactly as they should.',
    description:
      'Our DTP team reformats translated content to preserve the original design across InDesign, QuarkXPress, Word, and PowerPoint. We handle RTL language reflow, font substitution, and print-ready PDF export. Your brochures, manuals, and marketing collateral will look pixel-perfect in any language.',
    icon: 'Layout',
    features: [
      'Multilingual typesetting in InDesign, Word, and PowerPoint',
      'RTL layout for Arabic, Hebrew, Urdu, and Persian',
      'Font licensing and script-appropriate font selection',
      'Print-ready PDF and CMYK colour management',
      'Image text extraction and translation',
      'Pre-press quality checks and bleed/trim adjustments',
    ],
    relatedIndustries: ['e-commerce', 'technical', 'media-entertainment'],
  },
  {
    slug: 'editing-proofreading',
    title: 'Editing & Proofreading',
    tagline: 'The final polish that separates good from flawless.',
    description:
      'Our bilingual editors review translated content for linguistic accuracy, style consistency, and target-language fluency. Proofreading covers spelling, grammar, punctuation, and formatting against the source document. An essential final step before any high-visibility publication.',
    icon: 'PenLine',
    features: [
      'Monolingual and bilingual editing options',
      'Style guide and glossary adherence checks',
      'Grammar, spelling, and punctuation correction',
      'Tone and register alignment to brand voice',
      'Track-changes delivery for easy review',
      'Ideal pre-publication check for translated content',
    ],
    relatedIndustries: ['legal', 'medical', 'technical', 'education'],
  },
  {
    slug: 'typesetting',
    title: 'Typesetting Services',
    tagline: 'Multilingual typesetting crafted for precision and readability.',
    description:
      'We set text for books, journals, annual reports, and technical manuals in any language and script. Our typesetters handle complex requirements including mixed-direction text, mathematical notation, and right-to-left scripts. Output is delivered as print-ready PDFs or editable source files.',
    icon: 'Type',
    features: [
      'Book, journal, and report typesetting in 50+ languages',
      'Mixed-direction and bidirectional text support',
      'Mathematical and scientific notation typesetting',
      'ePub and accessible PDF export',
      'Style-guide-compliant chapter and index layouts',
      'Tight collaboration with DTP and editing teams',
    ],
    relatedIndustries: ['education', 'technical', 'legal'],
  },
];

export default services;
