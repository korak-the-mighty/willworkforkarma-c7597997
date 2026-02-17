interface CaseHookProps {
  problem: string;
}

const CaseHook = ({ problem }: CaseHookProps) => {
  const paragraphs = problem.split(/\n+/).filter(Boolean);

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12 py-16">
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed">{p}</p>
        ))}
      </div>
      <div className="aspect-[4/3] bg-muted" />
    </div>
  );
};

export default CaseHook;
