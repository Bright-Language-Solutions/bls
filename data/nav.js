const nav = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Company Profile',   href: '/about/company-profile' },
      { label: 'Why Choose Us',     href: '/about/why-choose-us' },
      { label: 'Industries We Serve', href: '/about/industries-we-serve' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Translation',            href: '/services/translation' },
      { label: 'Interpretation',         href: '/services/interpretation' },
      { label: 'Voice-Over',             href: '/services/voice-over' },
      { label: 'Dubbing',               href: '/services/dubbing' },
      { label: 'Subtitling & Captioning', href: '/services/subtitling-captioning' },
      { label: 'Localization',           href: '/services/localization' },
      { label: 'Transcription',          href: '/services/transcription' },
      { label: 'Desktop Publishing',     href: '/services/desktop-publishing' },
      { label: 'Editing & Proofreading', href: '/services/editing-proofreading' },
      { label: 'Typesetting',            href: '/services/typesetting' },
    ],
  },
  {
    label: 'Languages',
    href: '/languages',
    children: [
      { label: 'Indian Languages',      href: '/languages/indian-languages' },
      { label: 'European Languages',    href: '/languages/european-languages' },
      { label: 'Asian Languages',       href: '/languages/asian-languages' },
      { label: 'Middle East Languages', href: '/languages/middle-east-languages' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    children: [
      { label: 'Legal',               href: '/industries/legal' },
      { label: 'Medical & Healthcare', href: '/industries/medical' },
      { label: 'Technical & Engineering', href: '/industries/technical' },
      { label: 'E-Commerce & Retail', href: '/industries/e-commerce' },
      { label: 'Gaming & Interactive Media', href: '/industries/gaming' },
      { label: 'Education & E-Learning', href: '/industries/education' },
      { label: 'Media & Entertainment', href: '/industries/media-entertainment' },
    ],
  },
  {
    label: 'Locations',
    href: '/locations',
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
  },
  {
    label: 'Testimonials',
    href: '/testimonials',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'Get Quote',
    href: '/get-quote',
  },
];

export default nav;
