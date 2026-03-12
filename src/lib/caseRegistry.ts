import { parseCaseContent } from './parseCaseContent';
import { CaseData } from '../types/case';
// Vite statically imports all case markdown files at build time.
// The key is the file path relative to this file's location.
const rawFiles = import.meta.glob('../../content/cases/*.md', {
  as: 'raw',
  eager: true,
}) as Record<string, string>;
// Build a slug → CaseData map at module load time.
const registry: Record<string, CaseData> = {};
for (const [path, raw] of Object.entries(rawFiles)) {
  // Extract slug from path: "../../content/cases/abb-emobility.md" → "abb-emobility"
  const slug = path.split('/').pop()?.replace('.md', '') ?? '';
  if (!slug) continue;
  try {
    registry[slug] = parseCaseContent(raw);
  } catch (err) {
    console.error(`[caseRegistry] Failed to parse case "${slug}":`, err);
  }
}
// Returns parsed CaseData for a given slug, or undefined if not found / empty.
export function getCaseData(slug: string): CaseData | undefined {
  return registry[slug];
}
// Returns all parsed cases in registry order.
export function getAllCases(): CaseData[] {
  return Object.values(registry);
}
