import { Link } from "react-router-dom";

export function LetsTalk() {
  return (
    <section className="py-8 md:py-12">
      <div className="text-center">
        <Link
          to="/about"
          className="group relative inline-block font-heading text-2xl md:text-4xl tracking-tight text-white hover:text-[#ECA9CC] transition-colors"
        >
          <span className="hidden md:inline absolute right-full pr-2 opacity-0 group-hover:opacity-100 animate-bounce-x transition-opacity duration-200" aria-hidden="true">→</span>
          Let's talk.
        </Link>
      </div>
    </section>
  );
}

export default LetsTalk;
