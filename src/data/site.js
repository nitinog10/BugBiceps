export const site = {
  name: 'Bugbiceps',
  tagline: 'Code Crafted Like Fine Art',
  motto: 'We Flex Code Until Bugs Break',
  domain: 'bugbiceps.in',
  url: 'https://bugbiceps.in',
  status: 'Looking for clients across globe',
  primaryEmail: 'admin@bugbiceps.in',
  projectEmail: 'nitiniszod10@gmail.com',
  phones: [
    { display: '+91 74890 78947', tel: '+917489078947' },
    { display: '+91 99819 79652', tel: '+919981979652' },
  ],
  linkedin: 'https://www.linkedin.com/company/bugbiceps/',
};

export const startProjectHref = `mailto:${site.projectEmail}?subject=${encodeURIComponent(
  'New Project Enquiry — BugBiceps'
)}`;

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
