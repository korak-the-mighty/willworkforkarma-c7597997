export interface OtherWorkItem {
  client: string;
  title: string;
  what: string;
  year: string;
  heroImage?: string;
  color: string;
}

const R2 = 'https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev';

export const otherWork: OtherWorkItem[] = [
  { client: 'BMW',               title: 'Campaign Direction',    what: 'Campaign · Creative Direction', year: '2021', heroImage: `${R2}/BMW-hero.webp`,      color: '#0a0a14' },
  { client: 'Wörner Traxler',    title: 'Digital Platform',      what: 'Digital · Platform',            year: '2022', heroImage: `${R2}/WTR-hero.webp`,       color: '#141a14' },
  { client: 'Drivelog',          title: 'Product Experience',    what: 'Product · UX',                  year: '2020', heroImage: `${R2}/drivelog-hero.webp`,  color: '#1c1a14' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2023', color: '#2a2a32' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2022', color: '#32282a' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2023', color: '#282c2a' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2021', color: '#2a2c32' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2022', color: '#32282e' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2023', color: '#2c3028' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2021', color: '#2c2c2c' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2023', color: '#2a2c28' },
  { client: 'Placeholder',       title: 'Add title',             what: 'Type · Here',                   year: '2022', color: '#282c30' },
];
