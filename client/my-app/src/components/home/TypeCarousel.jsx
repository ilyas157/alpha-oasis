import HomeCards from './HomeCards';
import { useRef, useEffect, useState } from 'react';
function TypeCarousel({ title, items }) {
  const sliced_items = items.slice(0, 6);
  const [scrollIdx, setScrollIdx] = useState(0);
  const scrollRef = useRef();
  const visibleCards = 3; // Number of cards visible at once on desktop
  const total = items.length;
  const intervalRef = useRef();
  const mouseOverRef = useRef(false);

  // Scroll to a specific card
  const scrollTo = (idx) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[idx];
    if (card) {
      const container = scrollRef.current;
      const left = card.offsetLeft;
      container.scrollTo({ left, behavior: 'smooth' });
    }
    setScrollIdx(idx);
  };

  // Handle left/right arrow click
  const handleArrow = (dir) => {
    let next = scrollIdx + dir;
    if (next < 0) next = 0;
    if (next > total - 1) next = total - 1;
    scrollTo(next);
  };

  // Auto-scroll logic
  {
    useEffect(() => {
      if (total <= visibleCards) return;
      const startAuto = () => {
        intervalRef.current = setInterval(() => {
          if (!mouseOverRef.current) {
            setScrollIdx((prev) => {
              const next = prev + 1;
              if (next > total - visibleCards) return 0;
              return next;
            });
          }
        }, 5000);
      };
      startAuto();
      return () => clearInterval(intervalRef.current);
    }, [total, visibleCards]);
  }
  // Scroll to card when scrollIdx changes
  useEffect(() => {
    scrollTo(scrollIdx);
    // eslint-disable-next-line
  }, [scrollIdx]);

  // Snap to first card on items change
  useEffect(() => {
    setScrollIdx(0);
  }, [items]);

  // Pause auto-scroll on mouse enter
  const handleMouseEnter = () => {
    mouseOverRef.current = true;
  };
  const handleMouseLeave = () => {
    mouseOverRef.current = false;
  };

  return (
    <section className="mb-10 max-w-7xl mx-auto ">
      <h2 className="text-5xl font-semibold m-15 text-center">{title}</h2>
      <div className="relative rounded-3xl overflow-visible">
        {/* Left arrow */}
        <button
          className="absolute -left-15 top-1/2 -translate-y-1/2 z-10   bg-white rounded-full shadow-lg p-3  transition hidden lg:block "
          style={{
            pointerEvents: scrollIdx === 0 ? 'none' : 'auto',
            opacity: scrollIdx === 0 ? 0.3 : 1,
            fontSize: '2rem',
          }}
          onClick={() => handleArrow(-1)}
          aria-label="Précédent"
        >
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 19l-7-7 7-7"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {/* Carousel */}
        <div
          ref={scrollRef}
          className="pb-4  flex gap-3 overflow-x-auto  rounded-4xl scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((destination, idx) => (
            <div
              key={idx}
              className="w-[420px] max-w-2xl h-120 flex-shrink-0 snap-center   overflow-hidden  rounded-4xl shadow-lg"
            >
              <HomeCards destination={destination} />
            </div>
          ))}
        </div>
        {/* Right arrow */}
        <button
          className="absolute bg-white -right-15 top-1/2 -translate-y-1/2 z-10  rounded-full shadow-lg p-3  transition hidden lg:block "
          style={{
            pointerEvents: scrollIdx >= total - visibleCards ? 'none' : 'auto',
            opacity: scrollIdx >= total - visibleCards ? 0.3 : 1,
            fontSize: '2rem',
          }}
          onClick={() => handleArrow(1)}
          aria-label="Suivant"
        >
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <path
              d="M9 5l7 7-7 7"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {sliced_items.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              scrollIdx === idx
                ? 'bg-yellow-300 scale-125 shadow-lg'
                : 'bg-gray-300 scale-100'
            }`}
            onClick={() => scrollTo(idx)}
            aria-label={`Aller à la carte ${idx + 1}`}
            style={{ outline: 'none', border: 'none' }}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default TypeCarousel;
