import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiVite,
  SiTailwindcss,
  SiGreensock,
  SiApple,
  SiAndroid,
  SiFirebase,
  SiGraphql,
  SiPytorch,
  SiLangchain,
  SiHuggingface,
  SiMeta,
  SiPython,
  SiTemporal,
  SiZapier,
  SiDocker,
  SiGoogle,
  SiGooglesearchconsole,
  SiGoogleanalytics,
  SiBlender,
  SiThreedotjs,
  SiWebgl,
  SiFigma,
} from 'react-icons/si';

export const services = [
  {
    id: 'web',
    icon: SiReact,
    title: 'Web Engineering',
    video: '/webd.mp4',
    description:
      'High-performance single-page and server-rendered applications with interactive 3D, physics-based smooth scrolling and conversion-optimized architecture.',
    stack: [
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Vite', Icon: SiVite },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'GSAP', Icon: SiGreensock },
    ],
  },
  {
    id: 'mobile',
    icon: SiAndroid,
    title: 'Mobile App Development',
    video: '/mobile-app-dev.mp4',
    description:
      'Pixel-perfect cross-platform apps with native fluid performance, offline-first data sync and REST/GraphQL integration.',
    stack: [
      { name: 'React Native', Icon: SiReact },
      { name: 'iOS', Icon: SiApple },
      { name: 'Android', Icon: SiAndroid },
      { name: 'Firebase', Icon: SiFirebase },
      { name: 'GraphQL', Icon: SiGraphql },
    ],
  },
  {
    id: 'ai',
    icon: SiPytorch,
    title: 'AI Systems & Fine-Tuning',
    video: '/ai-fine-tuning-and-llm.mp4',
    description:
      'Domain-specific LLM fine-tuning, Retrieval-Augmented Generation pipelines, autonomous agents and document intelligence.',
    stack: [
      { name: 'PyTorch', Icon: SiPytorch },
      { name: 'LangChain', Icon: SiLangchain },
      { name: 'Hugging Face', Icon: SiHuggingface },
      { name: 'LLaMA', Icon: SiMeta },
      { name: 'Python', Icon: SiPython },
    ],
  },
  {
    id: 'automation',
    icon: SiPython,
    title: 'Workflow Automation',
    video: '/ai-and-automation.mp4',
    description:
      'End-to-end automation of manual enterprise workflows — data extraction, notification queues and API integration pipelines.',
    stack: [
      { name: 'Python', Icon: SiPython },
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Temporal', Icon: SiTemporal },
      { name: 'Zapier', Icon: SiZapier },
      { name: 'Docker', Icon: SiDocker },
    ],
  },
  {
    id: 'seo',
    icon: SiGooglesearchconsole,
    title: 'SEO / GEO Optimization',
    video: '/seo-and-geo.mp4',
    description:
      'Technical audits, structured schema markup and page-speed work — engineered for both classic search and AI answer engines.',
    stack: [
      { name: 'Google Search', Icon: SiGoogle },
      { name: 'Search Console', Icon: SiGooglesearchconsole },
      { name: 'Analytics', Icon: SiGoogleanalytics },
      { name: 'Next.js', Icon: SiNextdotjs },
    ],
  },
  {
    id: 'brand3d',
    icon: SiBlender,
    title: 'Branding & 3D Visualization',
    video: '/blender-and-3d-modelling.mp4',
    description:
      'Interactive 3D product rendering, cinematic motion design and complete visual brand identity systems.',
    stack: [
      { name: 'Blender', Icon: SiBlender },
      { name: 'Three.js', Icon: SiThreedotjs },
      { name: 'WebGL', Icon: SiWebgl },
      { name: 'Figma', Icon: SiFigma },
    ],
  },
];
