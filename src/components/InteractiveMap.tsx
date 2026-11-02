import React, { useState, useMemo } from 'react';
import { DAYS_DATA, DayItinerary } from '../data/days';
import { MapPin, ExternalLink, ZoomIn, ZoomOut, RotateCcw, Compass, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
  onSelectPhoto?: (photo: {
    url: string;
    alt: string;
    title: string;
    dayNum: string;
    country: string;
  }) => void;
  compact?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  activeDayIndex,
  onSelectDay,
  onSelectPhoto,
  compact = false,
}) => {
  const [viewMode, setViewMode] = useState<'fit' | 'follow'>('fit');
  const [manualZoom, setManualZoom] = useState(1);
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);

  const activeDay: DayItinerary = DAYS_DATA[activeDayIndex] || DAYS_DATA[0];

  // Calculate dynamic viewBox
  const viewBox = useMemo(() => {
    const defaultX = 1100;
    const defaultY = 900;
    const defaultW = 800;
    const defaultH = 440;

    if (viewMode === 'fit') {
      const zoom = manualZoom;
      const w = defaultW / zoom;
      const h = defaultH / zoom;
      const x = defaultX + (defaultW - w) / 2;
      const y = defaultY + (defaultH - h) / 2;
      return `${x} ${y} ${w} ${h}`;
    }

    // Follow active day mode: smoothly center around activeDay.mapCoords
    const targetX = activeDay.mapCoords.x;
    const targetY = activeDay.mapCoords.y;
    const w = 460 / manualZoom;
    const h = 253 / manualZoom;
    
    // Clamp inside map boundaries
    const minX = 1100;
    const maxX = 1900 - w;
    const minY = 900;
    const maxY = 1340 - h;

    const clampedX = Math.max(minX, Math.min(maxX, targetX - w / 2));
    const clampedY = Math.max(minY, Math.min(maxY, targetY - h / 2));

    return `${clampedX} ${clampedY} ${w} ${h}`;
  }, [viewMode, manualZoom, activeDay]);

  const handlePrev = () => {
    if (activeDayIndex > 0) {
      onSelectDay(activeDayIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeDayIndex < DAYS_DATA.length - 1) {
      onSelectDay(activeDayIndex + 1);
    }
  };

  // Helper to extract a short spot name for the pin banner
  const getSpotName = (day: DayItinerary) => {
    if (day.travelInfo.route.includes('→')) {
      return day.travelInfo.route.split('→')[1].trim().split('(')[0].trim();
    }
    return day.title.split(',')[0].trim();
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
      {/* Map Header with Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4A020] animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Carte de l'itinéraire
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-[#b88514]">
            {activeDay.dayNum} / J21
          </span>
        </div>

        {/* View mode toggle & zoom */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode(v => v === 'follow' ? 'fit' : 'follow')}
            className={`text-[11px] font-medium px-2 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              viewMode === 'follow'
                ? 'bg-[#D4A020] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
            title={viewMode === 'follow' ? 'Passer en vue globale du circuit' : 'Centrer le zoom sur le spot actif'}
          >
            <Compass className="w-3 h-3" />
            <span>{viewMode === 'follow' ? 'Zoom spot' : 'Vue globale'}</span>
          </button>

          <button
            onClick={() => setManualZoom(z => Math.min(2.5, z + 0.25))}
            className="p-1 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 transition-colors"
            title="Zoomer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setManualZoom(z => Math.max(0.8, z - 0.25))}
            className="p-1 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 transition-colors"
            title="Dézoomer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          {(manualZoom !== 1 || viewMode !== 'fit') && (
            <button
              onClick={() => {
                setManualZoom(1);
                setViewMode('fit');
              }}
              className="p-1 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 transition-colors"
              title="Réinitialiser la vue"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SVG Map Container */}
      <div className={`relative bg-slate-900 overflow-hidden ${compact ? 'h-[230px]' : 'h-[270px] xl:h-[300px]'}`}>
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full cursor-grab active:cursor-grabbing transition-all duration-500 ease-out select-none"
        >
          {/* Base relief map layer */}
          <image
            href="/map-relief.jpg"
            x="1100"
            y="900"
            width="800"
            height="440"
            preserveAspectRatio="none"
          />

          {/* Semi-transparent dark overlay for pin readability */}
          <rect x="1100" y="900" width="800" height="440" fill="#0f172a" opacity="0.10" />

          {/* Polyline Route: Kazakhstan (Almaty - Basshi - Charyn - Saty - Kegen border) */}
          <polyline
            points="1497,1052 1608,1010 1643,1043 1592,1075 1651,1082"
            fill="none"
            stroke="#ff5a45"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Polyline Route: Kyrgyzstan (Karkara - Karakol - Jeti-Oguz - Barskoon - Skazka - Kochkor - Song-Köl - Tash Rabat) */}
          <polyline
            points="1651,1082 1597,1117 1504,1146 1420,1140 1380,1176 1437,1208 1389,1259"
            fill="none"
            stroke="#f2c14e"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Polyline Route: Return to Bishkek (Tash Rabat - Naryn - Burana - Bishkek) */}
          <polyline
            points="1437,1208 1389,1095 1343,1093"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* All 21 Day Markers */}
          {DAYS_DATA.map((day, index) => {
            const isActive = index === activeDayIndex;
            const isHovered = index === hoveredDayIndex;
            const { x, y } = day.mapCoords;

            return (
              <g
                key={day.id}
                onClick={() => onSelectDay(index)}
                onMouseEnter={() => setHoveredDayIndex(index)}
                onMouseLeave={() => setHoveredDayIndex(null)}
                className="cursor-pointer transition-transform duration-300"
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {/* Active pulsing aura */}
                {isActive && (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill="#D4A020"
                      opacity="0.3"
                      className="animate-ping"
                      style={{ animationDuration: '2s' }}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill="#D4A020"
                      opacity="0.4"
                    />
                  </>
                )}

                {/* Base Marker Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 11 : isHovered ? 9 : 6.5}
                  fill={isActive ? '#D4A020' : '#ffffff'}
                  stroke={isActive ? '#ffffff' : '#334155'}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className="transition-all duration-300"
                />

                {/* Number text on pin */}
                <text
                  x={x}
                  y={y + 3.2}
                  textAnchor="middle"
                  fill={isActive ? '#ffffff' : '#0f172a'}
                  fontSize={isActive ? "8.5px" : "7.5px"}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  pointerEvents="none"
                >
                  {index + 1}
                </text>

                {/* Tooltip on Hover */}
                {isHovered && !isActive && (
                  <g pointerEvents="none">
                    <rect
                      x={x - 45}
                      y={y - 28}
                      width="90"
                      height="18"
                      rx="4"
                      fill="#1e293b"
                      opacity="0.9"
                    />
                    <text
                      x={x}
                      y={y - 16}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9px"
                      fontWeight="500"
                    >
                      {day.dayNum} · {day.title.slice(0, 14)}...
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Active Day Location Callout Banner above pin */}
          <g pointerEvents="none" className="transition-all duration-500 ease-out">
            <rect
              x={activeDay.mapCoords.x - 60}
              y={activeDay.mapCoords.y - 36}
              width="120"
              height="22"
              rx="6"
              fill="#D4A020"
              stroke="#ffffff"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            {/* Little pointer triangle pointing to spot */}
            <polygon
              points={`${activeDay.mapCoords.x - 5},${activeDay.mapCoords.y - 14} ${activeDay.mapCoords.x + 5},${activeDay.mapCoords.y - 14} ${activeDay.mapCoords.x},${activeDay.mapCoords.y - 8}`}
              fill="#D4A020"
            />
            <text
              x={activeDay.mapCoords.x}
              y={activeDay.mapCoords.y - 21}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10px"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              {activeDay.dayNum} · {getSpotName(activeDay).slice(0, 16)}
            </text>
          </g>
        </svg>

        {/* Floating Mini Overlay on Map */}
        <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-lg text-white/95 text-[11px] font-medium flex items-center gap-1.5 border border-white/20 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#D4A020]" />
          <span>{activeDay.country}</span>
          <span className="text-white/40">·</span>
          <span>{activeDay.dateStr}</span>
        </div>

        {/* Prev / Next map jump controls */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={activeDayIndex === 0}
            className="p-1 rounded-lg bg-black/60 hover:bg-black/80 disabled:opacity-30 text-white backdrop-blur-md border border-white/20 transition-opacity"
            title="Spot précédent"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeDayIndex === DAYS_DATA.length - 1}
            className="p-1 rounded-lg bg-black/60 hover:bg-black/80 disabled:opacity-30 text-white backdrop-blur-md border border-white/20 transition-opacity"
            title="Spot suivant"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Day Destination Card */}
      <div className="p-4 space-y-3 bg-white">
        <div className="flex gap-3 items-center">
          {/* Active Photo Thumbnail */}
          <div
            className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer shadow-sm group border border-gray-100 bg-gray-100"
            onClick={() => {
              if (onSelectPhoto) {
                onSelectPhoto({
                  url: activeDay.image,
                  alt: activeDay.imageAlt,
                  title: activeDay.title,
                  dayNum: activeDay.dayNum,
                  country: activeDay.country,
                });
              }
            }}
          >
            <img
              src={activeDay.image}
              alt={activeDay.imageAlt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 drop-shadow" />
            </div>
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-[#b88514] uppercase tracking-wider block">
              Spot actif · {activeDay.dayNum}
            </span>
            <h4
              className="text-sm font-semibold text-gray-900 truncate leading-snug"
              title={activeDay.title}
            >
              {activeDay.title}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              Nuit : {activeDay.night}
            </p>
          </div>
        </div>

        {/* Travel Info & Google Maps link */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
          <div className="text-gray-500 truncate mr-2">
            <span className="font-medium text-gray-700">{activeDay.travelInfo.route}</span>
            {activeDay.travelInfo.duration && (
              <span className="text-gray-400"> ({activeDay.travelInfo.duration})</span>
            )}
          </div>
          <a
            href={activeDay.mapQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#D4A020] hover:text-[#b88514] hover:underline flex-shrink-0"
          >
            Maps
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Day Selector Strip (J1 to J21) */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-gray-500">Navigation rapide :</span>
            <span className="text-[10px] text-gray-400">Cliquez pour défiler</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-[84px] overflow-y-auto pr-1">
            {DAYS_DATA.map((d, i) => (
              <button
                key={d.id}
                onClick={() => onSelectDay(i)}
                className={`text-[11px] px-2 py-0.5 rounded-md font-medium transition-all ${
                  i === activeDayIndex
                    ? 'bg-[#D4A020] text-white shadow-xs scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {d.dayNum}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
