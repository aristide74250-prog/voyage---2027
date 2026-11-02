import React from 'react';
import { X, ZoomIn, MapPin } from 'lucide-react';

interface PhotoModalProps {
  photo: {
    url: string;
    alt: string;
    title: string;
    dayNum: string;
    country: string;
  } | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative flex-1 min-h-[300px] max-h-[75vh] flex items-center justify-center bg-black/40 overflow-hidden">
          <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-5 bg-gray-900 border-t border-gray-800 flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-[#D4A020]">
                {photo.dayNum}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4A020]" />
                {photo.country}
              </span>
            </div>
            <h4 className="text-lg font-medium text-white">{photo.title}</h4>
            <p className="text-sm text-gray-400">{photo.alt}</p>
          </div>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <ZoomIn className="w-3.5 h-3.5" /> Photo originale du voyage
          </span>
        </div>
      </div>
    </div>
  );
};
