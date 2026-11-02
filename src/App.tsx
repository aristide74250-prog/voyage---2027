import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyFacts } from './components/KeyFacts';
import { Timeline } from './components/Timeline';
import { BudgetSection } from './components/BudgetSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PhotoModal } from './components/PhotoModal';
import { Check, Compass, MapPin } from 'lucide-react';
import { DAYS_DATA } from './data/days';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    alt: string;
    title: string;
    dayNum: string;
    country: string;
  } | null>(null);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased selection:bg-[#E8C55A] selection:text-gray-900">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <KeyFacts />

        {/* Intro & Highlights Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4A020]">Introduction</span>
                <h2
                  className="text-gray-900 mt-1 mb-4"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
                    fontWeight: 500,
                  }}
                >
                  L’esprit du voyage
                </h2>
                <div className="prose prose-lg text-gray-600 leading-relaxed font-normal">
                  <p>
                    Ce circuit vous invite à <strong>longer la chaîne céleste des Tian Shan</strong> d’est en ouest, 
                    puis à redescendre vers le cœur battant du Kirghizistan : des canyons d’ocre rouge et des lacs alpins 
                    émeraude au Kazakhstan, jusqu'aux immenses pâturages d’altitude, yourtes nomades et caravansérails 
                    légendaires sur l’antique Route de la Soie.
                  </p>
                  <p className="mt-4">
                    Tous les transferts sont assurés en <strong>véhicules tout-terrain 4x4 avec chauffeurs et guides locaux</strong>, 
                    avec des nuits authentiques en guesthouses familiales et sous la yourte au milieu des hardes de chevaux. 
                    Un itinéraire minutieusement pensé pour coïncider avec l'ouverture printanière des cols de montagne en juin.
                  </p>
                </div>
              </div>

              {/* Highlights cards */}
              <div>
                <h3
                  className="text-2xl font-serif text-gray-900 mb-5"
                  style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 500 }}
                >
                  Les temps forts du circuit
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    "Dune qui Chante et montagnes d'Aktau (Altyn-Emel)",
                    "Canyon de Charyn et la Vallée des Châteaux",
                    "Lacs alpins de Kolsai et forêt immergée de Kaindy",
                    "Passage de la frontière pastorale Kegen–Karkara",
                    "Gorge d'Altyn Arashan et ses sources chaudes bienfaisantes",
                    "Trek équestre sur les hauts plateaux du lac Song-Köl",
                    "Caravansérail millénaire en pierre de Tash Rabat",
                    "Bivouacs sous la yourte au cœur des pâturages nomades",
                  ].map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 bg-amber-500/5 hover:bg-amber-500/10 transition-colors rounded-2xl px-4 py-3.5 border border-amber-500/15"
                    >
                      <div className="p-1 rounded-full bg-[#D4A020]/20 text-[#b88514] mt-0.5 flex-shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-gray-800 font-medium leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stages overview sidebar */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm self-start">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-[#D4A020]" />
                <h3 className="font-semibold text-gray-900 text-base">Aperçu rapide des 21 jours</h3>
              </div>
              <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-2 divide-y divide-gray-50 text-xs">
                {DAYS_DATA.map((d) => (
                  <a
                    key={d.id}
                    href={`#${d.id}`}
                    className="flex items-center gap-2.5 py-2 px-2 rounded-xl hover:bg-amber-50 transition-colors group"
                  >
                    <span className="bg-[#D4A020] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                      {d.dayNum}
                    </span>
                    <span className="text-gray-700 font-medium truncate group-hover:text-[#b88514]">
                      {d.title}
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A020]" /> Almaty → Bishkek
                </span>
                <a href="#jours" className="text-[#D4A020] font-semibold hover:underline">
                  Dérouler ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline with all 17 Photos */}
        <Timeline onSelectPhoto={(photo) => setSelectedPhoto(photo)} />

        {/* Budget & Tarifs */}
        <BudgetSection />

        {/* FAQ & Infos Pratiques */}
        <FaqSection />
      </main>

      <Footer />

      {/* Lightbox Modal */}
      <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
}
