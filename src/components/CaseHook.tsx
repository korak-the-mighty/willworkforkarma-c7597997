interface CaseHookProps {
  problem: string;
}

const CaseHook = ({ problem }: CaseHookProps) => {
  const paragraphs = problem.split(/\n+/).filter(Boolean);

  return (
    <div className="py-20 md:py-28 space-y-12 md:space-y-16">
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed">{p}</p>
        ))}
      </div>
      <div className="aspect-[16/9] border border-white/[0.06] w-full" />
    </div>
  );
};

export default CaseHook;
