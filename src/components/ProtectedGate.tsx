import { useState, useEffect, useRef } from 'react';
import { useGateContent } from '@/hooks/useGateContent';

const PIN = 'inspire';
const SESSION_PREFIX = 'gate_auth_';

interface Props {
  slug: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function ProtectedGate({ slug, onSuccess, onClose }: Props) {
  const content = useGateContent();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(`${SESSION_PREFIX}${slug}`) === 'true') {
      onSuccess();
      return;
    }
    setTimeout(() => inputRef.current?.focus(), 100);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [slug, onSuccess]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSubmit() {
    if (input.trim().toLowerCase() === PIN) {
      sessionStorage.setItem(`${SESSION_PREFIX}${slug}`, 'true');
      onSuccess();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText(content.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  function handleWhatsApp() {
    window.open(
      `https://wa.me/${content.whatsapp_number.replace(/\D/g, '')}?text=Hi%20Henrik%2C%20I%27d%20like%20to%20request%20access%20to%20your%20case%20study.`,
      '_blank'
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-sm mx-6 bg-[#01031A] border border-white/10 p-8 flex flex-col gap-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors text-sm"
          aria-label="Close"
        >
          ✕
        </button>
        <p className="text-white text-base leading-snug pr-6">
          {content.headline}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="PIN"
              className="flex-1 bg-transparent border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm outline-none focus:border-white/50 transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="px-5 py-3 bg-white text-[#01031A] text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Enter
            </button>
          </div>
          {error && (
            <p className="text-red-400/80 text-xs">Wrong PIN. Try again.</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {content.cta_label}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex-1 border border-white/20 text-white/70 text-sm py-3 hover:border-white/50 hover:text-white transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={handleCopyEmail}
              className="flex-1 border border-white/20 text-white/70 text-sm py-3 hover:border-white/50 hover:text-white transition-colors"
            >
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
