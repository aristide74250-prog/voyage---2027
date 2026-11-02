import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[var(--container-width)] mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex flex-col leading-tight group">
          <span
            className={`transition-colors duration-300 font-serif font-medium text-2xl ${
              scrolled ? 'text-[#D4A020]' : 'text-white'
            }`}
            style={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            Tian Shan
          </span>
          <span
            className={`transition-colors duration-300 text-xs italic ${
              scrolled ? 'text-gray-500' : 'text-white/70'
            }`}
            style={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            Carnet 2027
          </span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-6">
          <a
            className={`hidden md:inline-block text-sm font-medium transition-colors hover:opacity-80 ${
              scrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            href="#top"
          >
            Accueil
          </a>
          <a
            className={`hidden md:inline-block text-sm font-medium transition-colors hover:opacity-80 ${
              scrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            href="#jours"
          >
            Itinéraire
          </a>
          <a
            className={`hidden md:inline-block text-sm font-medium transition-colors hover:opacity-80 ${
              scrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            href="#tarif"
          >
            Budget
          </a>
          <a
            className={`hidden lg:inline-block text-sm font-medium transition-colors hover:opacity-80 ${
              scrolled ? 'text-gray-700' : 'text-white/90'
            }`}
            href="#infos"
          >
            Infos pratiques
          </a>

          {/* Download HTML link */}
          <a
            href="/assets/aistudio/Tian_Shan_2027_reproduction_atis__1__4a50a65b.html"
            download="Tian_Shan_2027_Circuit_21_jours.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Télécharger le carnet HTML autonome complet"
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-300 border ${
              scrolled
                ? 'bg-amber-50 text-[#b88514] border-amber-200 hover:bg-amber-100'
                : 'bg-white/15 text-white border-white/30 hover:bg-white/25'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Télécharger HTML</span>
            <span className="sm:hidden">HTML</span>
          </a>

          <a
            href="#tarif"
            className="text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-sm"
            style={{
              backgroundColor: scrolled ? '#D4A020' : 'rgba(255,255,255,0.2)',
              color: 'white',
              backdropFilter: scrolled ? 'none' : 'blur(10px)',
              border: scrolled ? '1px solid transparent' : '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Voir le budget
          </a>
        </nav>
      </div>
    </header>
  );
};
