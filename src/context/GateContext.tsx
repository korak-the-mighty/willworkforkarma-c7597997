import { createContext, useContext, useState, ReactNode } from 'react';
import { ProtectedGate } from '@/components/ProtectedGate';
import { useNavigate } from 'react-router-dom';

interface GateContextType {
  requestAccess: (slug: string, targetPath: string) => void;
}

const GateContext = createContext<GateContextType>({ requestAccess: () => {} });

export function useGate() {
  return useContext(GateContext);
}

export function GateProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState<{ slug: string; path: string } | null>(null);
  const navigate = useNavigate();

  function requestAccess(slug: string, targetPath: string) {
    if (sessionStorage.getItem(`gate_auth_${slug}`) === 'true') {
      navigate(targetPath);
      return;
    }
    setPending({ slug, path: targetPath });
  }

  function handleSuccess() {
    if (pending) {
      navigate(pending.path);
      setPending(null);
    }
  }

  function handleClose() {
    setPending(null);
  }

  return (
    <GateContext.Provider value={{ requestAccess }}>
      {children}
      {pending && (
        <ProtectedGate
          slug={pending.slug}
          onSuccess={handleSuccess}
          onClose={handleClose}
        />
      )}
    </GateContext.Provider>
  );
}
