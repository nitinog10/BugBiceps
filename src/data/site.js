export const site = {
  name: 'Bugbiceps',
  tagline: 'Code Crafted Like Fine Art',
  motto: 'We Flex Code Until Bugs Break',
  domain: 'bugbiceps.in',
  url: 'https://bugbiceps.in',
  status: 'Looking for clients across globe',
  primaryEmail: 'admin@bugbiceps.in',
  secondaryEmail: 'bugbiceps@gmail.com',
  projectEmail: 'bugbiceps@gmail.com',
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
