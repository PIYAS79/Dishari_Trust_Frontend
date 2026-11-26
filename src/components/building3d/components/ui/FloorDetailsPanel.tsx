"use client";
"use no memo";

import { FloorSpec, RoomSpec } from '../../data/dishariArchitecture';
import { AlertTriangle, CheckCircle2, Focus } from 'lucide-react';

interface FloorDetailsPanelProps {
  floor: FloorSpec;
  selectedRoomId: string | null;
  onSelectRoom: (room: RoomSpec) => void;
  onOpenReferenceAudit: () => void;
}

export function FloorDetailsPanel({
  floor,
  selectedRoomId,
  onSelectRoom,
  onOpenReferenceAudit,
}: FloorDetailsPanelProps) {
  const isPlaceholder = floor.status === 'placeholder';

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Floor Header */}
      <div className="pb-3 border-b border-[#dfb248]/20">
        <div className="flex items-center gap-2 text-xs text-[#c7d6cc]">
          <span className="font-mono tabular-nums text-[#e5b84b] font-semibold">
            Level {floor.shortLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span>{floor.areaSft ?? 'Area unconfirmed'}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">{floor.targetPhase}</span>
        </div>

        <h3 className="font-serif text-xl font-semibold text-[#f7f2e7] mt-1">
          {floor.name}
        </h3>
        <p className="text-xs text-[#bfd0c5] mt-0.5">{floor.subtitle}</p>

        {/* Status Indicator (paired icon + explicit text label) */}
        <div className="flex items-center gap-2 mt-2.5 text-xs">
          {isPlaceholder ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-[#f0be4a] shrink-0" />
              <span className="text-[#f5d27b] font-medium">
                Placeholder Envelope — Reference Plan Not Supplied
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7ad17e] shrink-0" />
              <span className="text-[#bce8be] font-medium">
                Confirmed Axonometric Layout
              </span>
            </>
          )}
        </div>
      </div>

      {/* Missing Floor Warning / Summary */}
      {isPlaceholder && floor.missingNotes && (
        <div className="mt-3 p-3 rounded-lg bg-[#1c3d29] border border-[#e5b84b]/45 text-xs text-[#e9e3d3] space-y-1.5">
          <div className="font-semibold text-[#f3c655]">
            Missing Interior Plan Notice
          </div>
          {floor.missingNotes.map((note, idx) => (
            <p key={idx} className="text-[#cad8cf] leading-relaxed">
              {note}
            </p>
          ))}
          <button
            type="button"
            onClick={onOpenReferenceAudit}
            className="mt-1 text-xs font-semibold text-[#e5b84b] hover:underline cursor-pointer"
          >
            View full missing-assets log
          </button>
        </div>
      )}

      {/* Program Highlights */}
      <div className="mt-3 pb-3 border-b border-[#dfb248]/15">
        <div className="text-xs font-semibold text-[#d9e3dc] mb-1.5">
          Planned Program
        </div>
        <ul className="space-y-1 text-xs text-[#bdd0c4]">
          {floor.summaryPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#e5b84b] font-mono tabular-nums">–</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Room & Zone Directory */}
      <div className="mt-3 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#d9e3dc]">
            {isPlaceholder ? 'Confirmed Structural Cores' : 'Room & Zone Directory'}
          </span>
          <span className="text-[11px] font-mono tabular-nums text-[#9db4a6]">
            {floor.rooms.length} items
          </span>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 space-y-1 themed-scrollbar">
          {floor.rooms.map((room) => {
            const active = selectedRoomId === room.id;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onSelectRoom(room)}
                aria-pressed={active}
                className={`w-full text-left px-2.5 py-2 rounded-md border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#e5b84b]/18 border-[#e5b84b] text-[#fff6dc]'
                    : 'bg-[#0e2919] border-[#dfb248]/15 text-[#dce5df] hover:border-[#dfb248]/50 hover:bg-[#143723]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono tabular-nums text-xs font-bold text-[#e5b84b] shrink-0">
                      {room.number}
                    </span>
                    <span className="text-xs font-medium truncate">
                      {room.name}
                    </span>
                  </div>
                  <Focus className="w-3 h-3 text-[#9eb5a7] shrink-0" />
                </div>
                {(room.dimensions || room.notes) && (
                  <div className="text-[11px] text-[#9eb5a7] mt-1 line-clamp-2 pl-6">
                    {room.dimensions ? `${room.dimensions}` : room.notes}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
