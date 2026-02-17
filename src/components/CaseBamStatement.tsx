interface CaseBamStatementProps {
  statement: string;
}

const CaseBamStatement = ({ statement }: CaseBamStatementProps) => (
  <div className="py-20 md:py-32 text-center">
    <p className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
      {statement}
    </p>
  </div>
);

export default CaseBamStatement;
