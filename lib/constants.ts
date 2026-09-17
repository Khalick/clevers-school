// No trailing slash: call sites build URLs as `${SITE_URL}/path`, and a
// trailing slash here produced a double slash in every OG image and
// JSON-LD url. The previous value also pointed at a domain that does not
// resolve, so search engines were told the whole site lived nowhere.
export const SITE_URL = 'https://cleversschoolsresources.clevers.ac.ke';
export const SITE_NAME = 'Clevers Schools Resources';
export const SITE_DESCRIPTION = 'Access comprehensive educational materials including IGCSE past papers, Cambridge resources, Edexcel materials, and expert-curated lesson plans. Your trusted source for high-quality teaching and learning resources.';

export const KEYWORDS = [
  'Clevers schools resources vercel',
  'education resources',
  'vercel',
  'Private Candidates',
  'Adult Education',
  'IGCSE/KCSE',
  'Academic Excellence',
  'Accounting',
  'Sign Language',
  'AS/A Level',
  'ICT',
  'Art & Music',
  'Downloads',
  'school materials',
  'teaching resources',
  'IGCSE past papers',
  'Cambridge curriculum',
  'Edexcel materials',
  'lesson plans',
  'educational content',
  'Clevers Schools',
  'Kenya education',
  'online learning',
  'study materials',
  'exam preparation',
  'teacher resources',
  'student resources'
] as const;