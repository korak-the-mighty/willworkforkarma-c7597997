import { useRef } from "react";
import { motion } from "framer-motion";
import domtoimage from "dom-to-image-more";

interface CaseSnapshotProps {
  title: string;
  contextLine: string;
  decisionLine: string;
  outcomeLine: string;
  images: string[];
  onClose: () => void;
}

const rows = [
  { label: "Context", key: "contextLine" as const },
  { label: "Decision", key: "decisionLine" as const },
  { label: "Outcome", key: "outcomeLine" as const },
];

const CaseSnapshot = ({
  title,
  contextLine,
  decisionLine,
  outcomeLine,
  images,
  onClose,
}: CaseSnapshotProps) => {
  const snapRef = useRef<HTMLDivElement>(null);
  const lines = { contextLine, decisionLine, outcomeLine };

  const handleDownload = async () => {
    if (!snapRef.current) return;
    try {
      const dataUrl = await domtoimage.toPng(snapRef.current, {
        quality: 1,
        bgcolor: "#0A0A0A",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = "share-snapshot.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Snapshot export failed", e);
    }
  };

  return (
    <motion.div
      key="snapshot-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-[#0A0A0A] overflow-auto"
    >
      <div ref={snapRef} className="min-h-screen p-8 md:p-16 flex flex-col bg-[#0A0A0A]">
        {/* Title */}
        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-heading text-4xl md:text-6xl font-light text-white mb-12 md:mb-16"
        >
          {title}
        </motion.h2>

        {/* Text rows */}
        <div className="space-y-8 mb-12 md:mb-16">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            >
              <p className="text-white/30 text-xs uppercase tracking-widest mb-1">
                {row.label}
              </p>
              <p className="text-white text-lg">{lines[row.key]}</p>
            </motion.div>
          ))}
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
              className="aspect-video overflow-hidden"
            >
              <img
                src={src}
                crossOrigin="anonymous"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />
      </div>

      {/* Buttons — outside snapRef so they don't appear in the exported PNG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-50"
      >
        <button
          onClick={handleDownload}
          className="border border-white/20 text-white text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-white/10 transition-colors"
        >
          Download Snapshot
        </button>
        <button
          onClick={onClose}
          className="border border-white/20 text-white/40 text-xs uppercase tracking-widest px-5 py-2.5 hover:text-white hover:border-white/40 transition-colors"
        >
          Back to Full Case
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CaseSnapshot;
