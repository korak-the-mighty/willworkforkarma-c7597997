import { Link } from "react-router-dom";

interface CaseWhyMeProps {
  text: string;
  nextCase?: { slug: string; title: string } | null;
}

const CaseWhyMe = ({ text, nextCase }: CaseWhyMeProps) => (
  <div className="py-16 md:py-24">
    <div className="mx-auto max-w-4xl px-6">
      <h2 className="text-xs uppercase tracking-[0.2em] opacity-60 mb-6">Why this matters</h2>
      <p className="text-lg leading-relaxed max-w-2xl">{text}</p>
      <div className="flex gap-8 mt-12 text-sm">
        {nextCase && (
          <Link
            to={`/work/${nextCase.slug}`}
            className="underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
          >
            Next: {nextCase.title}
          </Link>
        )}
        <Link
          to="/contact"
          className="underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity"
        >
          Get in touch
        </Link>
      </div>
    </div>
  </div>
);

export default CaseWhyMe;
