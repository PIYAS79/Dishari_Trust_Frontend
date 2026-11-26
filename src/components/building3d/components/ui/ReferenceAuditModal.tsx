"use client";
"use no memo";

import { X } from 'lucide-react';
import {
  ARCHITECTURAL_AUDIT,
  DISHARI_PROJECT_META,
  FLOORS_DATA,
} from '../../data/dishariArchitecture';

interface ReferenceAuditModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReferenceAuditModal({ open, onClose }: ReferenceAuditModalProps) {
  if (!open) return null;

  const confirmedEntries = ARCHITECTURAL_AUDIT.filter(
    (e) => e.category === 'Confirmed',
  );
  const assumedEntries = ARCHITECTURAL_AUDIT.filter(
    (e) => e.category === 'Assumed / Estimated',
  );
  const missingEntries = ARCHITECTURAL_AUDIT.filter(
    (e) => e.category === 'Missing Information & Assets',
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[88vh] bg-[#0e2a1a] border border-[#dfb248]/40 rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dfb248]/20 bg-[#0b2114]">
          <div>
            <h2
              id="audit-modal-title"
              className="font-serif text-xl font-semibold text-[#f6f1e4]"
            >
              Architectural Reference & Missing Assets Audit
            </h2>
            <p className="text-xs text-[#b7cabd] mt-0.5">
              {DISHARI_PROJECT_META.title} · {DISHARI_PROJECT_META.organization} ·{' '}
              {DISHARI_PROJECT_META.buildingType}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close architectural reference audit"
            className="p-2 rounded-lg text-[#d8e3dc] hover:bg-[#19422a] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm themed-scrollbar">
          {/* Summary Table */}
          <section>
            <h3 className="text-sm font-semibold text-[#e5b84b] mb-2.5">
              01. Floor Documentation Coverage
            </h3>
            <div className="overflow-x-auto border border-[#dfb248]/20 rounded-lg themed-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0a1f13] text-[#c7d7cd] border-b border-[#dfb248]/20">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Level</th>
                    <th className="py-2.5 px-3 font-semibold">Program</th>
                    <th className="py-2.5 px-3 font-semibold">Area</th>
                    <th className="py-2.5 px-3 font-semibold">Target</th>
                    <th className="py-2.5 px-3 font-semibold">3D Model Fidelity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dfb248]/10 text-[#e7e2d5]">
                  {FLOORS_DATA.map((f) => (
                    <tr key={f.id}>
                      <td className="py-2 px-3 font-mono tabular-nums font-semibold text-[#e5b84b]">
                        {f.name}
                      </td>
                      <td className="py-2 px-3">{f.subtitle}</td>
                      <td className="py-2 px-3 font-mono tabular-nums">
                        {f.areaSft ?? 'Not specified'}
                      </td>
                      <td className="py-2 px-3 font-mono tabular-nums">{f.targetPhase}</td>
                      <td className="py-2 px-3">
                        {f.status === 'confirmed'
                          ? 'Confirmed 3D Interior Geometry'
                          : 'Structural Envelope Placeholder Only'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Confirmed vs Assumed vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <section className="p-4 rounded-lg bg-[#123420] border border-[#7ad17e]/30 space-y-2.5">
              <h3 className="text-xs font-semibold text-[#9be59e]">
                Confirmed Information
              </h3>
              {confirmedEntries.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-xs font-semibold text-[#f3eee2]">{item.title}</div>
                  <p className="text-xs text-[#bfd0c5] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </section>

            <section className="p-4 rounded-lg bg-[#123420] border border-[#dfb248]/30 space-y-2.5">
              <h3 className="text-xs font-semibold text-[#f1c75a]">
                Assumptions & Estimations
              </h3>
              {assumedEntries.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-xs font-semibold text-[#f3eee2]">{item.title}</div>
                  <p className="text-xs text-[#bfd0c5] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </section>

            <section className="p-4 rounded-lg bg-[#1b3624] border border-[#e5924b]/45 space-y-2.5">
              <h3 className="text-xs font-semibold text-[#f7b778]">
                Missing Information & Assets
              </h3>
              {missingEntries.map((item, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="text-xs font-semibold text-[#f3eee2]">{item.title}</div>
                  <p className="text-xs text-[#bfd0c5] leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Supplied Reference Plates */}
          <section>
            <h3 className="text-sm font-semibold text-[#e5b84b] mb-2.5">
              02. Supplied Reference Plates
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FLOORS_DATA.filter((f) => f.referenceImage).map((f) => (
                <div
                  key={f.id}
                  className="rounded-lg overflow-hidden border border-[#dfb248]/25 bg-[#0a1f13]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.referenceImage}
                    alt={`${f.name} axonometric reference`}
                    referrerPolicy="no-referrer"
                    className="w-full h-24 object-cover"
                  />
                  <div className="px-2.5 py-1.5 text-[11px] text-[#e7e2d5]">
                    <div className="font-semibold">{f.name}</div>
                    <div className="text-[#9bb3a4] font-mono tabular-nums">{f.areaSft}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#dfb248]/20 bg-[#0b2114] flex items-center justify-between text-xs text-[#aac0b2]">
          <span>
            Full specification documented in docs/ARCHITECTURAL_REFERENCE.md
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#e5b84b] text-[#0c2315] font-semibold hover:bg-[#f1c65b] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
