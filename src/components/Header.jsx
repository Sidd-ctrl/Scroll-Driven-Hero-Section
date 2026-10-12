export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[76px] items-center justify-between bg-gradient-to-b from-ink/90 to-transparent px-5 sm:px-10">
      <a href="#top" className="flex items-center gap-2 text-sm font-extrabold tracking-[0.3em] text-cream">
        <span className="h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_12px_#e0550f]" />
        ITZ FIZZ
      </a>

      <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
        <a href="#results" className="transition hover:text-ember-soft">Results</a>
        <a href="#contact" className="transition hover:text-ember-soft">Contact</a>
      </nav>

      <a
        href="#contact"
        className="rounded-full border border-ember/60 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream transition hover:bg-ember hover:border-ember"
      >
        Get started
      </a>
    </header>
  );
}
