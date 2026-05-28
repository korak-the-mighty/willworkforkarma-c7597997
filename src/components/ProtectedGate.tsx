import { useState, useEffect, useRef } from 'react';
import { useGateContent } from '@/hooks/useGateContent';
import { X } from 'lucide-react';

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
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Close — matches header X position exactly */}
      <div className="fixed top-0 left-0 right-0 z-[210] flex items-center justify-end px-6 py-6 pointer-events-none">
        <button
          onClick={onClose}
          className="relative p-2 text-foreground hover:text-muted-foreground transition-colors pointer-events-auto"
          aria-label="Close"
        >
          <X size={40} />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-8 flex flex-col items-center text-center gap-10">

        {/* Headline */}
        <h2 className="font-heading text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
          {content.headline}
        </h2>

        {/* PIN input */}
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <div className="flex gap-2 w-full">
            <input
              ref={inputRef}
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="PIN"
              className="flex-1 bg-transparent border border-white/40 text-white placeholder-white/40 px-4 py-3 text-sm outline-none focus:border-white/70 transition-colors rounded-full"
            />
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-white text-[#01031A] text-sm font-medium hover:bg-white/90 transition-colors rounded-full"
            >
              Enter
            </button>
          </div>
          {error && (
            <p className="text-red-400/80 text-xs">Wrong PIN. Try again.</p>
          )}
        </div>

        {/* Request CTA */}
        <div className="flex flex-col items-center gap-5 w-full max-w-sm">
          <p className="text-white text-lg md:text-xl font-heading tracking-wide">
            {content.cta_label}
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={handleWhatsApp}
              className="flex-1 border border-white/40 text-white/80 text-sm py-4 rounded-full hover:border-white/70 hover:text-white transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={handleCopyEmail}
              className="flex-1 border border-white/40 text-white/80 text-sm py-4 rounded-full hover:border-white/70 hover:text-white transition-colors"
            >
              {copied ? 'Copied ✓' : 'Copy email'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
