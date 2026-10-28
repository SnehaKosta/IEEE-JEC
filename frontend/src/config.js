// One place to edit site-wide details. Leave a value empty ('') to show the "pending" state.
export const SITE = {
  college: 'Jabalpur Engineering College',
  short: 'JEC',
  location: 'Jabalpur, Madhya Pradesh, India',
  collegeUrl: 'https://jecjabalpur.ac.in',
  email: '', // e.g. 'ieee@jecjabalpur.ac.in'
  social: {
    instagram: 'https://www.instagram.com/ieee.jec/',
  },
};

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'News & Events', to: '/news' },
  { label: 'Committee', to: '/committee' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'IEEE Fellows / Faculty Mentors', to: '/mentors' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Society Chapters', to: '/chapters' },
  { label: 'Contact Us', to: '/contact' },
];

export const MOTTO = {
  sa: 'कर्म ज्यायो ह्यकर्मणः',
  roman: 'Karma Jyayo Hy Akarmanah',
  en: 'Action is superior to inaction',
};

// A new quote is shown each day.
export const QUOTES = [
  MOTTO,
  { sa: 'योगः कर्मसु कौशलम्', roman: 'Yogah Karmasu Kaushalam', en: 'Excellence in action is true yoga' },
  { sa: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः', roman: 'Udyamena Hi Sidhyanti Karyani Na Manorathaih', en: 'Tasks are accomplished through effort, not mere wishes' },
  { sa: 'विद्या ददाति विनयम्', roman: 'Vidya Dadati Vinayam', en: 'Knowledge bestows humility' },
  { sa: 'सत्यमेव जयते', roman: 'Satyameva Jayate', en: 'Truth alone triumphs' },
];

export const INTERESTS = [
  'Membership / volunteering',
  'Events & workshops',
  'Collaboration / sponsorship',
  'Society chapters',
  'Something else',
];

// Shown if the Django API is unreachable.
export const FALLBACK_CHAPTERS = [
  {
    id: 1,
    code: 'CS',
    name: 'IEEE Computer Society (CS)',
    description: 'Explore computing, software and emerging digital technologies with a worldwide community of practitioners.',
    icon: '/images/cs-logo.png',
    tags: ['Computing', 'Software', 'AI'],
    url: 'https://www.computer.org',
    featured: true
  },
  {
    id: 2,
    code: 'WIE',
    name: 'IEEE Women in Engineering (WIE)',
    description: 'Connect with a global network dedicated to inspiring and supporting women in engineering and science.',
   icon:'/images/wie-logo.png',
    tags: ['Inclusion', 'Leadership', 'Mentorship'],
    url: 'https://wie.ieee.org',
    featured: true
  },
  {
    id: 3,
    code: 'RAS',
    name: 'IEEE Robotics and Automation Society (RAS)',
    description: 'Discover intelligent systems, robotics and automation at the intersection of hardware, software and imagination.',
    icon:'/images/ras-logo.png',
    tags: ['Robotics', 'Controls', 'Automation'],
    url: 'https://www.ieee-ras.org',
    featured: true
  },
  {
    id: 4,
    code: 'SPS',
    name: 'Signal Processing',
    description: 'The IEEE Signal Processing Society covers the science and application of signals, from audio and images to data.',
    // icon:'/images/'
    tags: ['Signals', 'Imaging', 'Data'],
    url: 'https://signalprocessingsociety.org',
    featured: false
  },
  {
    id: 5,
    code: 'PELS',
    name: 'Power Electronics',
    description: 'The IEEE Power Electronics Society advances power conversion, energy systems and electric mobility.',
  //  icon :'/images/'
   tags: ['Power', 'Energy', 'Mobility'],
    url: 'https://www.ieee-pels.org',
    featured: false
  },
];
