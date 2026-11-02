import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DAYS_DATA } from '../data/days';
import { MapPin, Clock, Car, Utensils, Maximize2, ExternalLink, Map, X } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

interface TimelineProps {
  onSelectPhoto: (photo: {
    url: string;
    alt: string;
    title: string;
    dayNum: string;
    country: string;
  }) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onSelectPhoto }) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeDay = DAYS_DATA[activeDayIndex] || DAYS_DATA[0];

  // Smooth programmatic scroll to day
  const handleSelectDay = useCallback((index: number) => {
    setActiveDayIndex(index);
    const day = DAYS_DATA[index];
    if (day) {
      const el = document.getElementById(day.id);
      if (el) {
        isProgrammaticScrollRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Re-enable scroll-tracking after smooth scroll completes
        scrollTimeoutRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 900);
      }
    }
  }, []);

  // Continuous viewport scroll-tracking: updates active spot in real time as user scrolls
  useEffect(() => {
    const handleScrollTracking = () => {
      if (isProgrammaticScrollRef.current) return;

      const dayCards = document.querySelectorAll<HTMLElement>('.day-card');
      if (!dayCards.length) return;

      // Focal reference line: 38% from top of viewport
      const triggerLine = window.innerHeight * 0.38;
      let activeIdx = 0;

      dayCards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          activeIdx = idx;
        }
      });

      setActiveDayIndex(prev => (prev !== activeIdx ? activeIdx : prev));
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    // Synchronize immediately on mount
    handleScrollTracking();

    return () => {
      window.removeEventListener('scroll', handleScrollTracking);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section id="jours" className="w-full py-16" style={{ background: 'linear-gradient(to bottom, rgba(249,250,251,0.5), white)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A020]">Le carnet complet</span>
            <h2
              className="text-gray-900 mt-1"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 500,
              }}
            >
              Itinéraire jour par jour
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md">
            Chaque étape est illustrée par les photos réelles des sites traversés. La carte sur la droite reste fixe et suit précisément chaque spot au fil de votre lecture.
          </p>
        </div>

        {/* 2-Column Layout: Left Days Column + Right Full-Height Sticky Column */}
        <div className="flex gap-0 lg:gap-8 xl:gap-10 relative">
          {/* Left Column: Day by Day Itinerary */}
          <div className="flex-1 min-w-0 max-w-[760px] mx-auto lg:mx-0 space-y-16">
            {DAYS_DATA.map((day, index) => {
              const isActive = index === activeDayIndex;

              return (
                <article
                  key={day.id}
                  id={day.id}
                  data-day-index={index}
                  className={`day-card scroll-mt-24 group bg-white rounded-3xl p-4 sm:p-6 shadow-sm border transition-all duration-300 ${
                    isActive
                      ? 'border-[#D4A020] ring-2 ring-[#D4A020]/25 shadow-md'
                      : 'border-gray-100 hover:shadow-md'
                  }`}
                >
                  {/* Photo showcase */}
                  <div className="space-y-3 mb-6">
                    <div
                      className="relative w-full h-[240px] sm:h-[340px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer group/img shadow-inner bg-gray-100"
                      onClick={() =>
                        onSelectPhoto({
                          url: day.image,
                          alt: day.imageAlt,
                          title: day.title,
                          dayNum: day.dayNum,
                          country: day.country,
                        })
                      }
                    >
                      <img
                        src={day.image}
                        alt={day.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity"></div>
                      
                      {/* Day Badge */}
                      <div
                        className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl text-white backdrop-blur-md shadow-md flex items-center gap-1.5"
                        style={{ backgroundColor: 'rgba(212, 160, 32, 0.95)' }}
                      >
                        <span className="text-sm font-bold tracking-wide">{day.dayNum}</span>
                        <span className="text-xs text-white/90">· {day.dateStr}</span>
                      </div>

                      {/* Expand hint */}
                      <div className="absolute bottom-4 right-4 p-2 rounded-lg bg-black/50 text-white/90 backdrop-blur-sm opacity-90 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 text-xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Agrandir</span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-16">
                        <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md truncate">
                          {day.imageAlt}
                        </p>
                      </div>
                    </div>

                    {/* Secondary Image for days with multiple highlights */}
                    {day.secondaryImage && (
                      <div className="flex items-center gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                        <div
                          className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer shadow-sm group/thumb"
                          onClick={() =>
                            onSelectPhoto({
                              url: day.secondaryImage!,
                              alt: day.secondaryImageAlt || day.imageAlt,
                              title: `${day.title} (Vue complémentaire)`,
                              dayNum: day.dayNum,
                              country: day.country,
                            })
                          }
                        >
                          <img
                            src={day.secondaryImage}
                            alt={day.secondaryImageAlt || day.imageAlt}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white">
                            <Maximize2 className="w-4 h-4 drop-shadow" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-[#b88514] uppercase tracking-wider block">
                            Également au programme
                          </span>
                          <p className="text-xs sm:text-sm text-gray-700 font-medium truncate">
                            {day.secondaryImageAlt}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Day content */}
                  <div className="px-1">
                    <h3
                      className="text-2xl md:text-3xl text-gray-900 mb-2 leading-tight"
                      style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}
                    >
                      {day.title}
                    </h3>

                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5 font-medium text-gray-700">
                        <MapPin className="w-4 h-4 text-[#D4A020]" />
                        <a
                          href={day.mapQuery}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-dotted underline-offset-2 hover:text-[#D4A020] transition-colors"
                        >
                          {day.country} · {day.dateStr}
                        </a>
                      </span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">Nuit : {day.night}</span>
                    </div>

                    {/* Travel badges */}
                    <div className="mb-5 space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#D4A020]/15 text-[#D4A020]">
                          <Car className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800">{day.travelInfo.route}</p>
                          <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500">
                            {day.travelInfo.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                {day.travelInfo.duration}
                              </span>
                            )}
                            {day.travelInfo.distance && (
                              <span className="text-gray-400">· {day.travelInfo.distance}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-base text-gray-600 leading-relaxed font-normal">
                        {day.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium bg-[#D4A020]/10 text-[#a3760e]">
                        {day.night}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                        <Utensils className="w-3 h-3 text-gray-400" />
                        {day.meal}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                        <Car className="w-3 h-3 text-gray-400" />
                        {day.vehicle}
                      </span>
                      <a
                        href={day.mapQuery}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 text-gray-400 hover:text-[#D4A020] transition-colors ml-auto"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Google Maps
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Right Column: Full-Height Container with Sticky Map */}
          <aside className="hidden lg:block w-[380px] xl:w-[440px] flex-shrink-0 self-stretch relative">
            <div className="sticky top-[88px] z-20 space-y-4 max-h-[calc(100vh-96px)] overflow-y-auto pr-1">
              <InteractiveMap
                activeDayIndex={activeDayIndex}
                onSelectDay={handleSelectDay}
                onSelectPhoto={onSelectPhoto}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Bottom Bar for Mobile / Tablet (< lg) */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="bg-gray-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4A020] animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#D4A020] uppercase tracking-wider">
                {activeDay.dayNum} / 21
              </span>
              <span className="text-gray-400 text-xs">· {activeDay.country}</span>
            </div>
            <p className="text-xs font-medium text-white truncate mt-0.5">
              {activeDay.title}
            </p>
          </div>
          <button
            onClick={() => setIsMobileMapOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D4A020] hover:bg-[#b88514] text-white text-xs font-semibold shadow-sm transition-colors flex-shrink-0"
          >
            <Map className="w-4 h-4" />
            <span>Voir le spot</span>
          </button>
        </div>
      </div>

      {/* Mobile Map Modal / Bottom Sheet */}
      {isMobileMapOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-2 sm:p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4A020]" />
                <span className="text-sm font-bold text-gray-900">Carte du circuit · {activeDay.dayNum}</span>
              </div>
              <button
                onClick={() => setIsMobileMapOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-2">
              <InteractiveMap
                activeDayIndex={activeDayIndex}
                onSelectDay={(idx) => {
                  handleSelectDay(idx);
                  setIsMobileMapOpen(false);
                }}
                onSelectPhoto={onSelectPhoto}
                compact
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
