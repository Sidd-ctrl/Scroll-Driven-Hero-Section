import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="results" className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember-soft">Results</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-cream sm:text-5xl">
            Less waiting. <span className="text-ember">More pickups.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">
            Every new pickup point shortens the trip for customers and frees up the phone lines, so the
            whole team can focus on the road ahead.
          </p>
          <a
            href="#contact"
            className="mt-10 rounded-full bg-ember px-7 py-3 text-sm font-semibold text-white transition hover:bg-ember-soft hover:text-ink"
          >
            Get in touch
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
