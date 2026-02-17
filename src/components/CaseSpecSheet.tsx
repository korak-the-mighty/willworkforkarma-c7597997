interface CaseSpecSheetProps {
  client: string;
  year: number;
  role: string;
  team: string;
  timeline: string;
  output: string;
}

const CaseSpecSheet = ({ client, year, role, team, timeline, output }: CaseSpecSheetProps) => {
  const items = [
    { label: "Client", value: client },
    { label: "Year", value: String(year) },
    { label: "Role", value: role },
    { label: "Team", value: team },
    { label: "Timeline", value: timeline },
    { label: "Output", value: output },
  ];

  return (
    <div className="border-y border-border py-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
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

export default CaseSpecSheet;
