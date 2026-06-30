import React from 'react';

/**
 * Parses break markers in copy and returns React nodes with correct
 * line breaks per breakpoint.
 *
 * Markers (consumed and removed from output):
 *   \bm  - break on mobile only, collapses to a space on desktop
 *   \bd  - break on desktop only, collapses to a space on mobile
 *   \bb  - break on both mobile and desktop
 *
 * Usage: call once per breakpoint context.
 *   parseBreaks(text, 'mobile')
 *   parseBreaks(text, 'desktop')
 */
export function parseBreaks(text: string, mode: 'mobile' | 'desktop'): React.ReactNode {
  if (!text) return text;

  // Tokenize: split on any of the three markers, keep marker as delimiter
  const tokens = text.split(/(\\bm|\\bd|\\bb)/g);

  const nodes: React.ReactNode[] = [];
  let buffer = '';
  let key = 0;

  const flush = () => {
    if (buffer) {
      nodes.push(buffer);
      buffer = '';
    }
  };

  for (const token of tokens) {
    if (token === '\\bm') {
      if (mode === 'mobile') {
        flush();
        nodes.push(React.createElement('br', { key: key++ }));
      } else {
        buffer += ' ';
      }
    } else if (token === '\\bd') {
      if (mode === 'desktop') {
        flush();
        nodes.push(React.createElement('br', { key: key++ }));
      } else {
        buffer += ' ';
      }
    } else if (token === '\\bb') {
      flush();
      nodes.push(React.createElement('br', { key: key++ }));
    } else {
      buffer += token;
    }
  }
  flush();

  return nodes;
}
