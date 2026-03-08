import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Work from "./pages/Work";
import CaseABB from "./pages/CaseABB";
import CaseShare from "./pages/CaseShare";
import CaseMAN from "./pages/CaseMAN";
import CaseBMW from "./pages/CaseBMW";
import CaseDetail from "./pages/CaseDetail";
import CaseDrivelogV2 from "./pages/CaseDrivelogV2";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const applyLoaded = (img: HTMLImageElement) => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
        img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
      }
    };
    document.querySelectorAll<HTMLImageElement>('img.lazy-img').forEach(applyLoaded);
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLImageElement>('img.lazy-img:not(.loaded)').forEach(applyLoaded);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/abb-emobility" element={<CaseABB />} />
            <Route path="/work/share" element={<CaseShare />} />
            <Route path="/work/man" element={<CaseMAN />} />
            <Route path="/work/bmw" element={<CaseBMW />} />
            <Route path="/work/drivelog" element={<CaseDrivelogV2 />} />
            <Route path="/work/:slug" element={<CaseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
