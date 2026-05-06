import { useState, useEffect } from 'react';
import matter from 'gray-matter';

export function usePrivacyContent() {
  const [content, setContent] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    import('../../content/privacy-policy.md?raw').then((mod) => {
      const { data, content: body } = matter(mod.default);
      setContent({ title: data.title, body });
    });
  }, []);

  return content;
}
