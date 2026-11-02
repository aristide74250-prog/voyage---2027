import React from 'react';
import { Calendar, DollarSign, Sun, Compass, Home, Users } from 'lucide-react';

export const KeyFacts: React.FC = () => {
  const facts = [
    { label: 'Durée', value: '21 jours', icon: Calendar },
    { label: 'À partir de', value: '2 193 €/pers.', icon: DollarSign },
    { label: 'Saison', value: 'Juin 2027', icon: Sun },
    { label: 'Style', value: 'Circuit accompagné', icon: Compass },
    { label: 'Confort', value: 'Guesthouses, yourtes', icon: Home },
    { label: 'Voyageurs', value: 'Entre amis (3 pers.)', icon: Users },
  ];

  return (
    <section className="border-b border-gray-200" style={{ backgroundColor: 'var(--continent-light)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {facts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center gap-2">
                <div style={{ color: 'var(--continent-primary)' }}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
