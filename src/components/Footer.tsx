import React from 'react';
import { ArrowUpRight, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Ready to go banner */}
      <section style={{ backgroundColor: 'var(--continent-warm)', padding: '80px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative flex justify-center md:justify-end">
              <div className="relative group">
                <div className="w-[300px] h-[360px] md:w-[340px] md:h-[420px] rounded-3xl shadow-xl overflow-hidden border-4 border-white">
                  <img
                    src="/assets/aistudio/Capture_d_e_cran_2026-11-02_a__01.49.14_fee28428.png"
                    alt="Camps de yourtes et chevaux au bord du lac Song-Köl"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 px-5 py-3 rounded-2xl shadow-lg text-white"
                  style={{ backgroundColor: 'var(--continent-primary)' }}
                >
                  <span className="text-2xl font-bold block leading-none">21</span>
                  <span className="text-xs uppercase tracking-wider opacity-90">jours de rêve</span>
                </div>
              </div>
            </div>

            <div>
              <h2
                className="mb-3 text-gray-900"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 500,
                }}
              >
                Prêts à partir ? Tian Shan 2027
              </h2>
              <p className="text-sm font-semibold mb-6 tracking-wide" style={{ color: 'var(--continent-primary)' }}>
                Kazakhstan · Kirghizistan · 5 au 26 juin 2027
              </p>
              <p className="text-gray-700 leading-relaxed mb-8 text-[15px]">
                Des steppes dorées d'Altyn-Emel jusqu'au caravansérail millénaire de Tash Rabat, vivez une épopée inoubliable au rythme des nomades et des plus beaux panoramas de la chaîne céleste des Tian Shan.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="#jours"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold transition-all duration-300 hover:brightness-110 hover:scale-[1.02] shadow-lg"
                  style={{ backgroundColor: 'var(--continent-primary)' }}
                >
                  Revoir l’itinéraire
                </a>
                <a
                  href="#tarif"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-[1.02] bg-white border-2 border-[#D4A020] text-[#D4A020]"
                >
                  Consulter le budget
                </a>
                <a
                  href="/assets/aistudio/Tian_Shan_2027_reproduction_atis__1__4a50a65b.html"
                  download="Tian_Shan_2027_Circuit_21_jours.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] bg-amber-100/80 border border-amber-300 text-[#b88514]"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger le carnet HTML</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300">
        <div className="max-w-[var(--container-width)] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-white text-2xl mb-4 font-serif" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Tian Shan 2027
              </h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Carnet de voyage de 21 jours entre Almaty et Bishkek. Canyons, lacs alpins, yourtes d'altitude et caravansérails sur la Route de la Soie.
              </p>
              <div className="mt-4">
                <a
                  href="/assets/aistudio/Tian_Shan_2027_reproduction_atis__1__4a50a65b.html"
                  download="Tian_Shan_2027_Circuit_21_jours.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-[#E8C55A] hover:border-amber-400 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger la version HTML autonome</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                Le voyage
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li><a className="text-gray-400 hover:text-white transition-colors" href="#jours">Itinéraire jour par jour</a></li>
                <li><a className="text-gray-400 hover:text-white transition-colors" href="#tarif">Budget & Détails financiers</a></li>
                <li><a className="text-gray-400 hover:text-white transition-colors" href="#infos">Infos pratiques & FAQ</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                Ressources & Guides de terrain
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
                <li>
                  <a className="text-gray-400 hover:text-[#E8C55A] transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://kyrgyzstan-tourism.com/blog/best-time-to-visit-song-kol-lake/">
                    <span>Song-Köl : saison & cols</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-[#E8C55A] transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://about-kazakhstan.com/kolsai-lakes">
                    <span>Lacs Kolsai & Kaindy</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-[#E8C55A] transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://caravanistan.com/border-crossings/kyrgyzstan/">
                    <span>Passage frontière Kegen–Karkara</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-[#E8C55A] transition-colors flex items-center gap-1" target="_blank" rel="noopener noreferrer" href="https://tours.too.kg/permit">
                    <span>Permis de zone frontalière</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900">
          <div className="max-w-[var(--container-width)] mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-4 text-xs text-gray-500">
            <p>© 2027 Carnet Tian Shan · Circuit Kazakhstan & Kirghizistan</p>
            <p>17 photos originales intégrées aux étapes de l'itinéraire</p>
          </div>
        </div>
      </footer>
    </>
  );
};
