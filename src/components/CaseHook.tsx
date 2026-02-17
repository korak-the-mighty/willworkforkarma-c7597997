interface CaseHookProps {
  problem: string;
}

const CaseHook = ({ problem }: CaseHookProps) => {
  const paragraphs = problem.split(/\n+/).filter(Boolean);

  return (
    <div className="py-16 space-y-8 md:space-y-12">
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed">{p}</p>
        ))}
      </div>
      <div className="aspect-[16/9] bg-muted w-full" />
    </div>
  );
};

export default CaseHook;
