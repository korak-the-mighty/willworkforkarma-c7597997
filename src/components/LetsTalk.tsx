import { Link } from "react-router-dom";

export function LetsTalk() {
  return (
    <section className="py-16 md:py-20">
      <div className="text-center">
        <Link
          to="/about"
          className="font-heading text-2xl md:text-4xl tracking-tight text-white hover:opacity-60 transition-opacity"
        >
          Let's talk.
        </Link>
      </div>
    </section>
  );
}

export default LetsTalk;
