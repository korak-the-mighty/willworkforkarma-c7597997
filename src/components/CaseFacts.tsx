import type { CaseFacts as CaseFactsType } from "@/data/cases";

interface CaseFactsProps {
  facts: CaseFactsType;
}

const CaseFacts = ({ facts }: CaseFactsProps) => {
  const items = [
    { label: "Role", value: facts.role },
    { label: "Scope", value: facts.scope },
    { label: "Team", value: facts.team },
    { label: "Timeline", value: facts.timeline },
    { label: "Output", value: facts.output },
  ];

  return (
    <div className="border-y border-border py-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
              {item.label}
            </dt>
            <dd className="text-sm">{item.value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseFacts;
