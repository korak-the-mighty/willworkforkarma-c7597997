const modules = import.meta.glob('/content/contact.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export function useContactContent(): {
  title: string;
  intro: string;
  email: string;
  linkedin_url: string;
  linkedin_label: string;
} {
  const raw = modules['/content/contact.md'] as string ?? '';

  const get = (field: string) => {
    const match = raw.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
    return match ? match[1].trim() : '';
  };

  return {
    title: get('title'),
    intro: get('intro'),
    email: get('email'),
    linkedin_url: get('linkedin_url'),
    linkedin_label: get('linkedin_label'),
  };
}
