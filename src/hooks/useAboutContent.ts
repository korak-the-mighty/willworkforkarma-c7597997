const modules = import.meta.glob('/content/about.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export function useAboutContent(): { title: string; paragraphs: string[] } {
  const raw = modules['/content/about.md'] as string ?? '';

  const titleMatch = raw.match(/^---[\s\S]*?title:\s*(.+?)\s*\n[\s\S]*?---/);
  const title = titleMatch ? titleMatch[1] : 'About';

  const withoutFrontmatter = raw.replace(/^---[\s\S]*?---\n?/, '');

  const paragraphs = withoutFrontmatter
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  return { title, paragraphs };
}
