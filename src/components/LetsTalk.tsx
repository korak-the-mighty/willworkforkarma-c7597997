import { Link } from "react-router-dom";

export function LetsTalk() {
  return (
    <section className="py-24 md:py-32">
      <div className="text-center">
        <Link
          to="/contact"
          className="font-heading text-2xl md:text-4xl tracking-tight text-white hover:opacity-60 transition-opacity"
        >
          Let's talk.
        </Link>
      </div>
    </section>
  );
}

export default LetsTalk;
