import React from 'react';
import { Clock, MapPin, Compass, ShieldCheck, Download, Map } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[90vh] min-h-[640px] overflow-hidden bg-gray-900">
      {/* Background Image */}
      <img
        src="/assets/aistudio/Capture_d_e_cran_2026-11-02_a__01.41.53_d3300e69.png"
        alt="Grand Lac d'Almaty et montagnes du Tian Shan"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35"></div>
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: 'radial-gradient(circle at 20% 40%, #D4A020 0%, transparent 60%)',
        }}
      ></div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2.5 mb-4">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
              <Compass className="w-3.5 h-3.5 text-[#E8C55A]" /> Aventure
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
              <Clock className="w-3.5 h-3.5 text-[#E8C55A]" /> 21 jours
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
              <MapPin className="w-3.5 h-3.5 text-[#E8C55A]" /> Kazakhstan · Kirghizistan
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8C55A]" /> Chauffeurs 4x4 & Guides locaux
            </span>
          </div>

          <h1
            className="text-white drop-shadow-xl mb-4 max-w-4xl"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              fontWeight: 500,
              lineHeight: 1.08,
            }}
          >
            Du désert de l’Ili aux yourtes de Song-Köl
          </h1>

          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6 leading-relaxed font-light">
            Vingt et un jours entre la frontière chinoise, le Tian Shan kazakh et les hauts pâturages kirghizes, pour trois voyageurs au cœur de paysages grandioses.
          </p>

          <div className="flex flex-wrap items-center gap-5 mb-8">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-3.5 border border-white/25 shadow-lg">
              <span className="text-white/70 text-xs block uppercase tracking-wider font-medium">À partir de</span>
              <span
                className="text-white block font-semibold text-3xl"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                2 193 €
              </span>
              <span className="text-white/70 text-xs">par personne, hors vols</span>
            </div>

            <div className="flex flex-col gap-1 text-white/80 text-sm">
              <span className="font-medium text-white">Départ le 5 juin 2027 · Retour le 26 juin 2027</span>
              <span>3 voyageurs · Véhicules 4x4 privatifs et guides locaux</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#jours"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition-all duration-300 hover:brightness-110 hover:scale-[1.02] shadow-xl"
              style={{ backgroundColor: 'var(--continent-primary)' }}
            >
              <Map className="w-4 h-4" />
              <span>Itinéraire & Carte interactive</span>
            </a>

            <a
              href="#tarif"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold bg-white/15 backdrop-blur-md border border-white/30 transition-all duration-300 hover:bg-white/25 hover:scale-[1.02]"
            >
              Voir le budget
            </a>

            <a
              href="/assets/aistudio/Tian_Shan_2027_reproduction_atis__1__4a50a65b.html"
              download="Tian_Shan_2027_Circuit_21_jours.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-white/95 font-medium bg-amber-500/25 hover:bg-amber-500/40 backdrop-blur-md border border-amber-300/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 text-[#E8C55A]" />
              <span>Télécharger le carnet HTML</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
