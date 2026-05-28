const modules = import.meta.glob('/content/gate.md', { eager: true, as: 'raw' });

interface GateContent {
  headline: string;
  cta_label: string;
  whatsapp_number: string;
  email: string;
}

function parseFrontmatter(raw: string): GateContent {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {
    headline: 'This case is only accessible with a PIN.',
    cta_label: 'Request the PIN',
    whatsapp_number: '+4915141655661',
    email: 'henrik.lehtikangas@gmail.com',
  };
  const block = match[1];
  const get = (key: string) => {
    const m = block.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'));
    return m ? m[1].trim() : '';
  };
  return {
    headline: get('headline'),
    cta_label: get('cta_label'),
    whatsapp_number: get('whatsapp_number'),
    email: get('email'),
  };
}

export function useGateContent(): GateContent {
  const raw = Object.values(modules)[0] as string;
  return parseFrontmatter(raw);
}
