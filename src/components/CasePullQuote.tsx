interface CasePullQuoteProps {
  quote: string;
}

const CasePullQuote = ({ quote }: CasePullQuoteProps) => (
  <div className="py-16 md:py-24 text-center">
    <blockquote className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tight text-foreground">
      {quote}
    </blockquote>
  </div>
);

export default CasePullQuote;
