interface CaseOutcomeProps {
  outcomes: string[];
  closing?: string;
}

const CaseOutcome = ({ outcomes, closing }: CaseOutcomeProps) => (
  <div className="py-12">
    <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Outcomes</h2>
    <ul className="space-y-3">
      {outcomes.map((o, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground opacity-40" />
          <span>{o}</span>
        </li>
      ))}
    </ul>
    {closing && (
      <p className="mt-8 text-muted-foreground leading-relaxed">{closing}</p>
    )}
  </div>
);

export default CaseOutcome;
