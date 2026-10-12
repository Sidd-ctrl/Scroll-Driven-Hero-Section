import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import CarSvg from './CarSvg.jsx';
import useHeroAnimation from '../hooks/useHeroAnimation.js';

const WORDS = ['WELCOME', 'ITZ', 'FIZZ'];

const STATS = [
  { value: 58, label: 'Pickup usage', text: 'Increase in pick up point use' },
  { value: 23, label: 'Phone calls', text: 'Decrease in customer phone calls' },
  { value: 40, label: 'Wait times', text: 'Decrease in customer wait time' },
];

export default function Hero() {
  const heroRef = useRef(null);
  useHeroAnimation(heroRef);

  return (
    <section ref={heroRef} id="top" className="hero">
      <div className="hero-top">
        <p className="hero-label">Impact report 2026</p>
        <h1 className="hero-title" aria-label="Welcome ITZ FIZZ">
          {WORDS.map((word) => (
            <span className="word" key={word} aria-hidden="true">
              {[...word].map((letter, i) => (
                <span className="letter" key={i}>
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="road">
        <div className="road-lines" />
        <div className="car-wrap">
          {/* .car-wrap is the intro target, .car is moved by the scroll scene */}
          <div className="car">
            <div className="trail" />
            <div className="car-glow" />
            <CarSvg />
          </div>
        </div>
      </div>

      <ul className="stats">
        {STATS.map((stat, i) => (
          <li className={i === 1 ? 'stat stat-solid' : 'stat'} key={stat.label}>
            <span className="stat-value">{stat.value}%</span>
            <span className="stat-label">{stat.label}</span>
            <span className="stat-text">{stat.text}</span>
            <span className="stat-bar">
              <span className="stat-fill" style={{ width: `${stat.value}%` }} />
            </span>
          </li>
        ))}
      </ul>

      <div className="scroll-cue">
        <ArrowDown size={16} aria-hidden="true" />
        <span>Scroll to drive</span>
        <span className="cue-track">
          <span className="cue-fill" />
        </span>
      </div>
    </section>
  );
}
