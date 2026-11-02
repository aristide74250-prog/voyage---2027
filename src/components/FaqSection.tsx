import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Comment se déroulent les déplacements et transports ?",
      answer: "L'ensemble du circuit est pris en charge avec des véhicules tout-terrain privatifs 4x4 conduits par des chauffeurs-guides locaux expérimentés, aussi bien au Kazakhstan qu'au Kirghizistan. Dans les passages escarpés comme la gorge d'Altyn Arashan ou vers le lac Kaindy, des fourgons tout-terrain UAZ robustes prennent le relais.",
    },
    {
      question: "Quel est le niveau physique requis pour ce circuit ?",
      answer: "Le circuit est conçu pour être accessible à toute personne en bonne condition physique. Les randonnées sont modulables (de 2 à 4 heures), avec un terrain agréable. Pour le lac Song-Köl, la traversée des hauts plateaux s'effectue à dos de cheval de bât docile, guidé par un éleveur nomade.",
    },
    {
      question: "Pourquoi avoir choisi les dates du 5 au 26 juin 2027 ?",
      answer: "Juin marque le réveil pastoral des montagnes d'Asie centrale. Les hauts plateaux de Song-Köl (3 000 m) se couvrent de fleurs sauvages et les bergers y installent leurs camps de yourtes estivaux à partir de la mi-juin. En commençant par les canyons et steppes du Kazakhstan, vous arrivez à Song-Köl au moment idéal.",
    },
    {
      question: "Quelles sont les formalités d'entrée (visas et passeports) ?",
      answer: "Pour les ressortissants français, belges et suisses, aucun visa touristique n'est exigé pour des séjours de moins de 30 jours au Kazakhstan et 60 jours au Kirghizistan. Votre passeport doit simplement être valide au moins 6 mois après la date de retour prévue.",
    },
    {
      question: "Qu'en est-il du permis de zone frontalière pour Chatyr-Kul ?",
      answer: "Le lac Chatyr-Kul étant situé à proximité immédiate de la frontière chinoise, une autorisation militaire officielle de zone frontalière est obligatoire. Elle coûte environ 35 USD par voyageur et est commandée 4 à 6 semaines avant le départ par l'intermédiaire de votre agence locale.",
    },
    {
      question: "Les prix indiqués sont-ils fermes ?",
      answer: "Ces montants correspondent à une estimation budgétaire détaillée pour 2027 (prix 2026 majorés d'environ 5 % d'inflation prévisionnelle). Les devis contractuels fermes s'obtiennent directement auprès des réceptifs locaux partenaires au début de l'année 2027.",
    },
    {
      question: "Peut-on personnaliser le voyage ou ajouter des options ?",
      answer: "Tout à fait ! Vous pouvez aisément ajouter l'incursion spectaculaire vers le lac glaciaire de Kel-Suu, survoler en hélicoptère le glacier Inylchek, ou prolonger le voyage de quelques jours vers les coupoles turquoise de la Route de la Soie en Ouzbékistan.",
    },
  ];

  return (
    <section id="infos" className="py-16" style={{ backgroundColor: 'var(--continent-light)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A020]">Tout savoir</span>
          <h2
            className="text-gray-900 mt-1"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 500,
            }}
          >
            Informations pratiques & Questions fréquentes
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Les réponses essentielles pour préparer sereinement votre périple de 21 jours en Asie centrale.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 divide-y divide-gray-100">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group py-2"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base font-semibold transition-colors ${
                    isOpen ? 'text-[#b88514]' : 'text-gray-900 group-hover:text-[#D4A020]'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-all duration-300 ${
                    isOpen ? 'bg-amber-100 text-[#b88514] rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-amber-50'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="pt-2 pb-2 text-sm text-gray-600 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
