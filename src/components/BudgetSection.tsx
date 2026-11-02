import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export const BudgetSection: React.FC = () => {
  const [showFullTable, setShowFullTable] = useState(true);

  const budgetItems = [
    { label: 'Almaty (J1–J2)', price: 70 },
    { label: 'Altyn-Emel et vallée de l’Ili (J3–J4)', price: 77 },
    { label: 'Canyon de Charyn (J4–J5)', price: 40 },
    { label: 'Saty, Kolsai et Kaindy (J5–J7)', price: 143 },
    { label: 'Passage Kegen–Karkara (J8)', price: 0 },
    { label: 'Karakol (J8–J9, J11)', price: 83 },
    { label: 'Altyn Arashan (J10–J11)', price: 58 },
    { label: 'Rive sud de l’Issyk-Kul (J12)', price: 48 },
    { label: 'Kochkor et Song-Köl à cheval (J13–J16)', price: 365 },
    { label: 'Naryn, Tash Rabat, Chatyr-Kul (J17–J19)', price: 145 },
    { label: 'Bishkek et Ala-Archa (J20–J21)', price: 72 },
    { label: 'Chauffeur-guide 4x4 Kazakhstan (6 j. × 210 €, partagé à 3)', price: 420 },
    { label: 'Chauffeur 4x4 Kirghizistan (6 j. × 100 €, partagé à 3)', price: 200 },
    { label: 'Déjeuners et en-cas (18 j. × 10 €)', price: 180 },
    { label: 'Assurance rapatriement, SIM, pourboires, imprévus', price: 130 },
    { label: 'Marge de sécurité 8 %', price: 162 },
  ];

  const totalPerPerson = 2193;
  const totalGroup = 6579;

  return (
    <section id="tarif" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-100">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4A020]">Transparence totale</span>
        <h2
          className="text-gray-900 mt-1"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 500,
          }}
        >
          Tarif & Budget par personne
        </h2>
        <p className="text-sm text-gray-500 mt-1 max-w-xl">
          Budget estimé pour 3 personnes voyageant ensemble, basé sur les prestations locales 2026 actualisées pour 2027 (+5 %).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-start">
        {/* Left Column: Breakdown table */}
        <div className="space-y-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total calculé</span>
              <p className="text-2xl font-bold text-gray-900">{totalPerPerson.toLocaleString()} € <span className="text-sm font-normal text-gray-500">/ voyageur</span></p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Groupe de 3</span>
              <p className="text-xl font-bold text-[#b88514]">{totalGroup.toLocaleString()} € <span className="text-xs font-normal text-gray-500">total</span></p>
            </div>
          </div>

          <button
            onClick={() => setShowFullTable(!showFullTable)}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-[#D4A020] transition-colors py-1"
          >
            <span>{showFullTable ? 'Masquer le détail poste par poste' : 'Afficher le détail poste par poste'}</span>
            {showFullTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showFullTable && (
            <div className="rounded-2xl overflow-hidden border border-gray-100 divide-y divide-gray-100 text-sm">
              {budgetItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-2.5 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <span className="text-gray-700 text-xs sm:text-sm">{item.label}</span>
                  <span className="font-semibold tabular-nums text-gray-900 ml-3 text-xs sm:text-sm">{item.price} €</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 bg-amber-50/70 border-t border-amber-100">
                <span className="font-bold text-gray-900">Total estimé par voyageur (hors vols)</span>
                <span className="font-bold text-base text-[#b88514] tabular-nums">{totalPerPerson} €</span>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5 pt-2 text-xs text-gray-500">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p>
              Tarifs indicatifs hors billets d'avion internationaux (Paris–Almaty et Bishkek–Paris, prévoyez 800 à 950 € par personne). Les devis fermes sont à solliciter auprès des agences locales partenaires.
            </p>
          </div>
        </div>

        {/* Right Column: Inclusions & Exclusions */}
        <div className="space-y-6">
          {/* Inclus */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-1 rounded-full bg-emerald-100 text-emerald-600">
                <Check className="w-4 h-4" />
              </span>
              Prestations incluses dans le budget
            </h3>
            <ul className="space-y-3">
              {[
                'Tous les hébergements : hôtels de charme, guesthouses familiales et camps de yourtes traditionnelles',
                'Demi-pension ou pension complète selon les étapes mentionnées au programme',
                'Véhicule privatif 4x4 tout confort avec chauffeur-guide au Kazakhstan',
                'Véhicule privatif 4x4 avec chauffeur local au Kirghizistan',
                'Trek équestre guidé de 3 jours au lac Song-Köl (chevaux de selle, guide et chevaux de bât)',
                'Transferts en camion tout-terrain UAZ dans les gorges d’Altyn Arashan et au lac Kaindy',
                'Toutes les entrées dans les parcs nationaux (Altyn-Emel, Charyn, Kolsai, Ala-Archa)',
                'Permis de zone frontalière officielle pour la région de Naryn et Chatyr-Kul',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Non inclus */}
          <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <span className="p-1 rounded-full bg-red-100 text-red-600">
                <X className="w-4 h-4" />
              </span>
              Non inclus dans le tarif
            </h3>
            <ul className="space-y-2.5">
              {[
                'Vols internationaux aller-retour (Paris–Almaty / Bishkek–Paris, env. 800 à 950 €)',
                'Boissons en dehors des repas et dépenses personnelles',
                'Pourboires aux chauffeurs et guides locaux',
                'Excursions optionnelles non mentionnées au programme de base',
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
