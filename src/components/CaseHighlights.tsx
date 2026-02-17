interface CaseHighlightsProps {
  highlights: string[];
}

const CaseHighlights = ({ highlights }: CaseHighlightsProps) => (
  <ul className="space-y-2 py-6">
    {highlights.map((h, i) => (
      <li key={i} className="flex gap-3 text-sm leading-relaxed">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground opacity-40" />
        <span className="font-normal">{h}</span>
      </li>
    ))}
  </ul>
);

export default CaseHighlights;
