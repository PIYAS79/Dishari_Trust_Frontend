"use client";

import dynamic from "next/dynamic";

// The WebGL scene is browser-only, so it is loaded on the client without SSR.
const BuildingWorkspace = dynamic(
  () => import("./building3d/BuildingWorkspace"),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full min-h-[480px] items-center justify-center rounded-2xl border border-gold/25 bg-dish/30 text-champ"
        role="status"
      >
        Loading 3D building…
      </div>
    ),
  },
);

export default function Building() {
  return (
    <section id="facilities" className="bg-forest py-10 text-mist min-h-[100vh] lg:h-[100vh] flex flex-col lg:overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] px-5 flex flex-col gap-3 min-h-0 flex-1">
        <h2 className="text-center font-serif text-3xl text-ivory sm:text-4xl">The DISHARI building</h2>
        <div className="flex-1 min-h-0">
          <BuildingWorkspace />
        </div>
      </div>
    </section>
  );
}