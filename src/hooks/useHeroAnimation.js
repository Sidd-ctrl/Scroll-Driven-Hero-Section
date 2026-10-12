
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

const PIN_DISTANCE = 3;
const SCRUB = 0.1;
const EDGE = 24;

export default function useHeroAnimation(heroRef) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const $ = (selector) => hero.querySelector(selector);
    const $$ = (selector) => [...hero.querySelectorAll(selector)];

    const road = $('.road');
    const car = $('.car');
    const carWrap = $('.car-wrap');
    const letters = $$('.letter');
    const stats = $$('.stat');
    const fills = $$('.stat-fill');
    const roadLines = $('.road-lines');
    const heroTop = $('.hero-top');
    const scrollCue = $('.scroll-cue');
    const cueFill = $('.cue-fill');

    if (!road || !car || !carWrap) return undefined;

    // Keep the car inside the road boundaries.
    const endX = () =>
      Math.max(
        0,
        road.clientWidth - car.offsetWidth - EDGE * 2
      );

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Intro: the car drives in horizontally instead of fading upward.
      const intro = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
      });

      intro
        .from($('.hero-label'), {
          autoAlpha: 0,
          y: 12,
          duration: 0.6,
        })
        .from(
          letters,
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.035,
          },
          '-=0.25'
        )
        .from(
          stats,
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.25'
        )
        .from(
          carWrap,
          {
            x: () => -(car.offsetWidth + EDGE),
            autoAlpha: 0,
            duration: 0.1,
            ease: 'power2.out',
            force3D: true,
          },
          '-=0.2'
        )
        .from(
          scrollCue,
          {
            autoAlpha: 0,
            y: 8,
            duration: 0.4,
          },
          '-=0.2'
        );

      // Calculate where each headline letter should light up.
      let litAt = letters.map(() => 1);

      const measureLetters = () => {
        const roadLeft = road.getBoundingClientRect().left;
        const carHalf = car.offsetWidth / 2;
        const distance = Math.max(1, endX());

        litAt = letters.map((letter) => {
          const center =
            letter.getBoundingClientRect().left +
            letter.offsetWidth / 2 -
            roadLeft;

          return gsap.utils.clamp(
            0,
            1,
            (center - EDGE - carHalf) / distance
          );
        });
      };

      // One pinned, scroll-controlled timeline.
      const scene = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: () => `+=${window.innerHeight * PIN_DISTANCE}`,
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: measureLetters,
        },
        onUpdate: () => {
          const progress = scene.progress();

          letters.forEach((letter, i) => {
            letter.classList.toggle(
              'lit',
              progress >= litAt[i]
            );
          });
        },
      });

      // Car moves independently of its entrance wrapper.
      scene.to(
        car,
        {
          x: endX,
          duration: 1,
          force3D: true,
        },
        0
      );

      // Move the road markings in sync with the car.
      if (roadLines) {
        scene.to(
          roadLines,
          {
            x: () => {
              const overflow =
                roadLines.scrollWidth - road.clientWidth;

              return -Math.max(0, overflow);
            },
            duration: 1,
          },
          0
        );
      }

      if (heroTop) {
        scene.to(
          heroTop,
          {
            y: -40,
            duration: 1,
          },
          0
        );
      }

      // Fill statistic bars progressively.
      if (fills.length) {
        scene.fromTo(
          fills,
          {
            scaleX: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            duration: 0.2,
            stagger: 0.25,
          },
          0.15
        );
      }

      // Scroll progress indicator.
      if (cueFill) {
        scene.fromTo(
          cueFill,
          {
            scaleX: 0,
            transformOrigin: 'left center',
          },
          {
            scaleX: 1,
            duration: 1,
          },
          0
        );
      }

      // Recalculate positions after initial layout.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      // Recalculate letter positions when the viewport changes.
      window.addEventListener('resize', measureLetters);

      return () => {
        window.removeEventListener('resize', measureLetters);
      };
    });

    // Reduced-motion users get the finished state without a pinned scene.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      letters.forEach((letter) => letter.classList.add('lit'));

      gsap.set(carWrap, {
        clearProps: 'opacity,visibility,transform',
      });

      gsap.set(car, {
        x: endX(),
      });

      gsap.set(fills, {
        scaleX: 1,
        transformOrigin: 'left center',
      });

      if (cueFill) {
        gsap.set(cueFill, {
          scaleX: 1,
          transformOrigin: 'left center',
        });
      }
    });

    return () => mm.revert();
  }, [heroRef]);
}
