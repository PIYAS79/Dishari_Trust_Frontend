"use client";
"use no memo";

import { FLOORS_DATA, FloorSpec } from '../../data/dishariArchitecture';
import { FloorId } from '../../utils/geometryHelpers';

interface FloorStackSelectorProps {
  selectedFloorId: FloorId;
  onSelectFloor: (id: FloorId) => void;
}

/**
 * Architectural vertical stack selector styled in deep green & warm gold,
 * displaying G+6 built floors (top-down 6 -> G) plus future G+13 phase context.
 */
export function FloorStackSelector({
  selectedFloorId,
  onSelectFloor,
}: FloorStackSelectorProps) {
  const topDownFloors: FloorSpec[] = [...FLOORS_DATA].reverse();

  return (
    <nav aria-label="Building Floor Selector" className="flex flex-col gap-1.5">
      {/* Future master-plan context from reference diagram */}
      <div className="border border-dashed border-[#dfb248]/35 rounded-lg px-3 py-2 text-center text-[11px] text-[#b4c6ba] mb-1">
        Later phases up to G+13
      </div>

      {topDownFloors.map((floor) => {
        const isSelected = floor.id === selectedFloorId;
        const isAccommodation =
          floor.id === '2' || floor.id === '3' || floor.id === '4' || floor.id === '5';

        return (
          <button
            key={floor.id}
            type="button"
            onClick={() => onSelectFloor(floor.id)}
            aria-pressed={isSelected}
            aria-label={`Select ${floor.name}: ${floor.subtitle}`}
            className={`group w-full text-left rounded-lg px-3 py-2.5 border transition-colors cursor-pointer ${
              isSelected
                ? 'bg-[#dfb248] text-[#0b2315] border-[#fff0bd]'
                : 'bg-[#123520] text-[#f4efe4] border-[#dfb248]/30 hover:border-[#dfb248]/80 hover:bg-[#174027]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`font-mono tabular-nums text-xs font-bold w-5 text-center shrink-0 ${
                    isSelected ? 'text-[#0b2315]' : 'text-[#e5b84b]'
                  }`}
                >
                  {floor.shortLabel}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">{floor.name}</div>
                  <div
                    className={`text-[11px] truncate ${
                      isSelected ? 'text-[#1c3a27]' : 'text-[#b7c9bd]'
                    }`}
                  >
                    {floor.subtitle}
                  </div>
                </div>
              </div>
              <span
                className={`text-[10px] font-mono tabular-nums shrink-0 ${
                  isSelected ? 'text-[#163321]' : 'text-[#9bb3a4]'
                }`}
              >
                {floor.status === 'confirmed' ? floor.targetPhase : 'Placeholder'}
              </span>
            </div>

            {/* Subtle 11-bay accommodation rhythm matching reference diagram */}
            {isAccommodation && (
              <div className="grid grid-cols-11 gap-1 mt-2" aria-hidden="true">
                {Array.from({ length: 11 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-[2px] ${
                      isSelected
                        ? 'bg-[#0e2a1a]/35'
                        : floor.status === 'confirmed'
                          ? 'bg-[#6fb858]/70'
                          : 'bg-[#6fb858]/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
}
