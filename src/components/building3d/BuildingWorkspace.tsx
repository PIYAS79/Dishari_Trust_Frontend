"use client";
"use no memo";

import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';
import {
  FLOORS_DATA,
  getFloorById,
  RoomSpec,
} from './data/dishariArchitecture';
import {
  CameraPose,
  CameraPresetKey,
  FLOOR_ELEVATIONS,
  FloorId,
  getExteriorCameraPreset,
  getInteriorCameraPreset,
} from './utils/geometryHelpers';
import { detectSoftwareWebGL } from './utils/webglCapabilities';
import { ARCHITECTURAL_PALETTE } from './materials/architecturalTheme';
import { SceneLightingAndControls } from './components/three/SceneLightingAndControls';
import { BuildingExteriorScene } from './components/three/BuildingExteriorScene';
import { FloorInteriorScene } from './components/three/FloorInteriorScene';
import {
  LabelProjector,
  ProjectedLabelItem,
} from './components/three/ProjectedLabelLayer';
import { ViewportErrorBoundary } from './components/three/ViewportErrorBoundary';
import { FloorDetailsPanel } from './components/ui/FloorDetailsPanel';
import { ReferenceAuditModal } from './components/ui/ReferenceAuditModal';

type WorkspaceViewMode = 'split' | 'exterior' | 'interior';

export default function BuildingWorkspace() {
  const [selectedFloorId, setSelectedFloorId] = useState<FloorId>('G');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<WorkspaceViewMode>('split');
  const [auditOpen, setAuditOpen] = useState(false);

  // Exterior camera state
  const [extPreset, setExtPreset] = useState<CameraPresetKey>('corner');
  const [extPoseVersion, setExtPoseVersion] = useState(0);
  const [showFloorTags, setShowFloorTags] = useState(true);
  const extTagRefs = useRef<Record<string, HTMLElement | null>>({});

  // Interior floor camera state
  const [intPose, setIntPose] = useState<CameraPose>(() =>
    getInteriorCameraPreset('axonometric'),
  );
  const [intPreset, setIntPreset] = useState<CameraPresetKey>('axonometric');
  const [intPoseVersion, setIntPoseVersion] = useState(0);
  const [showRoomLabels, setShowRoomLabels] = useState(true);
  const intLabelRefs = useRef<Record<string, HTMLElement | null>>({});

  const isSoftwareGl = useMemo(() => detectSoftwareWebGL(), []);
  const selectedFloor = useMemo(
    () => getFloorById(selectedFloorId),
    [selectedFloorId],
  );
  const extPose = useMemo(
    () => getExteriorCameraPreset(extPreset),
    [extPreset],
  );

  const exteriorFloorTagItems: ProjectedLabelItem[] = useMemo(
    () =>
      FLOORS_DATA.map((f) => {
        const { baseY, height } = FLOOR_ELEVATIONS[f.id];
        return {
          id: f.id,
          position: [15.0, baseY + height * 0.5, 9.05],
        };
      }),
    [],
  );

  const interiorRoomLabelItems: ProjectedLabelItem[] = useMemo(
    () =>
      selectedFloor.rooms.map((r) => ({
        id: r.id,
        position: r.labelPosition,
      })),
    [selectedFloor],
  );

  const handleSelectFloor = (id: FloorId) => {
    setSelectedFloorId(id);
    setSelectedRoomId(null);
    setIntPreset('axonometric');
    setIntPose(getInteriorCameraPreset('axonometric'));
    setIntPoseVersion((v) => v + 1);
  };

  const handleExteriorPreset = (preset: CameraPresetKey) => {
    setExtPreset(preset);
    setExtPoseVersion((v) => v + 1);
  };

  const handleInteriorPreset = (preset: CameraPresetKey) => {
    setIntPreset(preset);
    setIntPose(getInteriorCameraPreset(preset));
    setIntPoseVersion((v) => v + 1);
  };

  const handleSelectRoom = (room: RoomSpec) => {
    setSelectedRoomId((prev) => (prev === room.id ? null : room.id));
    const [rx, ry, rz] = room.labelPosition;
    setIntPose({
      position: [rx - 4.5, ry + 13.5, rz + 15.0],
      target: [rx, 0.8, rz],
    });
    setIntPoseVersion((v) => v + 1);
  };

  const handleResetAllViews = () => {
    setSelectedRoomId(null);
    setExtPreset('corner');
    setExtPoseVersion((v) => v + 1);
    setIntPreset('axonometric');
    setIntPose(getInteriorCameraPreset('axonometric'));
    setIntPoseVersion((v) => v + 1);
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl border border-[#dfb248]/25 bg-[#0c2416] text-[#f4efe4] h-full min-h-[480px]"
      data-selected-floor={selectedFloorId}
      data-view-mode={viewMode}
    >
      {/* Top Bar Contract: 3 clean zones separated by gap-8 */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-8 px-4 sm:px-6 py-1.5 sm:py-2 bg-[#091c11] border-b border-[#dfb248]/25 shrink-0">

        <nav
          aria-label="Workspace View Navigation"
          className="order-3 sm:order-2 w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-[#c8d8ce] pt-1 sm:pt-0 border-t border-[#dfb248]/15 sm:border-t-0"
        >
          <button
            type="button"
            onClick={() => setViewMode('split')}
            aria-pressed={viewMode === 'split'}
            className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors cursor-pointer ${
              viewMode === 'split'
                ? 'text-[#e5b84b] border-b border-[#e5b84b]'
                : 'hover:text-[#f7f1e3]'
            }`}
          >
            Dual View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('exterior')}
            aria-pressed={viewMode === 'exterior'}
            className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors cursor-pointer ${
              viewMode === 'exterior'
                ? 'text-[#e5b84b] border-b border-[#e5b84b]'
                : 'hover:text-[#f7f1e3]'
            }`}
          >
            Exterior
          </button>
          <button
            type="button"
            onClick={() => setViewMode('interior')}
            aria-pressed={viewMode === 'interior'}
            className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors cursor-pointer ${
              viewMode === 'interior'
                ? 'text-[#e5b84b] border-b border-[#e5b84b]'
                : 'hover:text-[#f7f1e3]'
            }`}
          >
            Floor Plan
          </button>
          <button
            type="button"
            onClick={() => setAuditOpen(true)}
            className="whitespace-nowrap shrink-0 pb-0.5 hover:text-[#e5b84b] transition-colors cursor-pointer"
          >
            Audit
          </button>
        </nav>

        <div className="order-2 sm:order-3 flex items-center shrink-0">
          <button
            type="button"
            onClick={handleResetAllViews}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#dfb248] text-[#0b2214] hover:bg-[#eec55c] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Views</span>
          </button>
        </div>
      </div>

      {/* Main Architectural Workspace */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-1.5 p-2">
        {/* Center: Dual 3D Viewports */}
        <section
          aria-label="3D Architectural Viewports"
          className={`min-h-0 grid gap-1.5 ${
            viewMode === 'split'
              ? 'grid-cols-1 xl:grid-cols-2'
              : 'grid-cols-1'
          }`}
        >
          {/* Viewport 1: 3D Building Exterior Overview */}
          {(viewMode === 'split' || viewMode === 'exterior') && (
            <div
              data-testid="exterior-viewport"
              className="relative min-h-[360px] lg:min-h-0 rounded-xl overflow-hidden border border-[#dfb248]/25 bg-[#cfe0ed]"
            >
              <div className="absolute top-3 left-3 z-10 bg-[#0b2114]/92 border border-[#dfb248]/35 rounded-lg px-3 py-1.5 pointer-events-none">
                <div className="text-[11px] text-[#e5b84b] font-mono tabular-nums">
                  G+6 Exterior Overview · Click a floor
                </div>
                <div className="text-xs font-semibold text-[#f7f2e7]">
                  Selected: {selectedFloor.name}
                </div>
              </div>

              <ViewportErrorBoundary title="3D Building Exterior">
                <Canvas
                  frameloop="demand"
                  dpr={isSoftwareGl ? 1 : [1, 2]}
                  shadows={!isSoftwareGl}
                  camera={{
                    position: extPose.position,
                    fov: 45,
                    near: 0.5,
                    far: 340,
                  }}
                  gl={{
                    antialias: !isSoftwareGl,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.06,
                  }}
                >
                  <SceneLightingAndControls
                    cameraPose={extPose}
                    poseVersion={extPoseVersion}
                    isSoftwareGl={isSoftwareGl}
                    lightingMode="exterior"
                    minDistance={18}
                    maxDistance={110}
                    shadowExtent={44}
                    fogColor={ARCHITECTURAL_PALETTE.exteriorBackdrop}
                    fogNear={82}
                    fogFar={195}
                  />
                  <BuildingExteriorScene
                    selectedFloorId={selectedFloorId}
                    onSelectFloor={handleSelectFloor}
                  />
                  {showFloorTags && (
                    <LabelProjector
                      items={exteriorFloorTagItems}
                      buttonRefs={extTagRefs}
                    />
                  )}
                </Canvas>
              </ViewportErrorBoundary>

              {/* Projected Floor Level Tags Overlay */}
              {showFloorTags && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5]">
                  {FLOORS_DATA.map((floor) => {
                    const isSelected = selectedFloorId === floor.id;
                    return (
                      <button
                        key={floor.id}
                        ref={(el) => {
                          extTagRefs.current[floor.id] = el;
                        }}
                        type="button"
                        onClick={() => handleSelectFloor(floor.id)}
                        aria-label={`Exterior floor marker ${floor.name}`}
                        style={{ position: 'absolute', left: 0, top: 0 }}
                        className={`px-2 py-0.5 text-[11px] font-mono tabular-nums font-semibold rounded transition-colors cursor-pointer whitespace-nowrap border ${
                          isSelected
                            ? 'bg-[#e5b84b] text-[#0c2315] border-[#fff0bd] shadow-md'
                            : 'bg-[#0e2a1a]/92 text-[#efe9da] border-[#dfb248]/45 hover:border-[#e5b84b] hover:text-[#ffe18d]'
                        }`}
                      >
                        {floor.shortLabel}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Compact Bottom Control Bar */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-0.5 p-1 rounded-lg bg-[#0b2114]/95 border border-[#dfb248]/35">
                {(
                  [
                    ['corner', '3D'],
                    ['axonometric', 'Axo'],
                    ['front', 'Front'],
                    ['top', 'Top'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleExteriorPreset(key)}
                    aria-pressed={extPreset === key}
                    className={`px-2 py-1 text-[11px] font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      extPreset === key
                        ? 'bg-[#dfb248] text-[#0b2214]'
                        : 'text-[#dce5df] hover:bg-[#173e26]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowFloorTags((s) => !s)}
                  aria-label="Toggle exterior floor tags"
                  aria-pressed={showFloorTags}
                  className="px-2 py-1 text-[11px] font-medium rounded-md text-[#dce5df] hover:bg-[#173e26] inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showFloorTags ? (
                    <Eye className="w-3 h-3 text-[#e5b84b]" />
                  ) : (
                    <EyeOff className="w-3 h-3" />
                  )}
                  <span>Tags</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExteriorPreset('corner')}
                  aria-label="Reset exterior camera"
                  className="px-2 py-1 text-[11px] font-medium rounded-md text-[#e5b84b] hover:bg-[#173e26] inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}

          {/* Viewport 2: Selected Floor 3D Interior Explorer */}
          {(viewMode === 'split' || viewMode === 'interior') && (
            <div
              data-testid="interior-viewport"
              className="relative min-h-[360px] lg:min-h-0 rounded-xl overflow-hidden border border-[#dfb248]/25 bg-[#bdc5c0]"
            >
              <div className="absolute top-3 left-3 z-10 bg-[#0b2114]/92 border border-[#dfb248]/35 rounded-lg px-3 py-1.5 pointer-events-none">
                <div className="text-[11px] text-[#e5b84b] font-mono tabular-nums">
                  {selectedFloor.name} ·{' '}
                  {selectedFloor.areaSft ?? 'Placeholder Envelope'}
                </div>
                <div className="text-xs font-semibold text-[#f7f2e7]">
                  {selectedFloor.subtitle}
                </div>
              </div>

              {/* Explicit Placeholder Callout for Floors 3, 4, 5 */}
              {selectedFloor.status === 'placeholder' && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 bg-[#0e2a1a]/95 border border-[#e5b84b] text-[#f5efe0] px-4 py-2 rounded-lg shadow-lg max-w-xs text-center pointer-events-none">
                  <div className="text-[10px] font-mono tabular-nums text-[#e5b84b] uppercase tracking-wider">
                    Structural Envelope Placeholder
                  </div>
                  <div className="text-xs font-semibold mt-0.5">
                    Interior floor plan not supplied
                  </div>
                  <div className="text-[11px] text-[#cbd7cf] mt-0.5">
                    Confirmed vertical cores & slab outline shown.
                  </div>
                </div>
              )}

              <ViewportErrorBoundary title="3D Floor Explorer">
                <Canvas
                  frameloop="demand"
                  dpr={isSoftwareGl ? 1 : [1, 2]}
                  shadows={!isSoftwareGl}
                  camera={{
                    position: intPose.position,
                    fov: 45,
                    near: 0.5,
                    far: 260,
                  }}
                  gl={{
                    antialias: !isSoftwareGl,
                    powerPreference: 'high-performance',
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 0.94,
                  }}
                >
                  <SceneLightingAndControls
                    cameraPose={intPose}
                    poseVersion={intPoseVersion}
                    isSoftwareGl={isSoftwareGl}
                    lightingMode="interior"
                    minDistance={12}
                    maxDistance={85}
                    shadowExtent={36}
                    fogColor={ARCHITECTURAL_PALETTE.interiorBackdrop}
                    fogNear={65}
                    fogFar={160}
                  />
                  <FloorInteriorScene floor={selectedFloor} />
                  {showRoomLabels && (
                    <LabelProjector
                      items={interiorRoomLabelItems}
                      buttonRefs={intLabelRefs}
                    />
                  )}
                </Canvas>
              </ViewportErrorBoundary>

              {/* Projected Room Number & Label Overlay */}
              {showRoomLabels && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden z-[5]">
                  {selectedFloor.rooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    return (
                      <button
                        key={room.id}
                        ref={(el) => {
                          intLabelRefs.current[room.id] = el;
                        }}
                        type="button"
                        onClick={() => handleSelectRoom(room)}
                        aria-label={`Room ${room.number}: ${room.name}`}
                        style={{ position: 'absolute', left: 0, top: 0 }}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap cursor-pointer transition-colors border shadow-sm ${
                          isSelected
                            ? 'bg-[#e5b84b] text-[#0c2315] border-[#fff0bd]'
                            : 'bg-[#0e2a1a]/92 text-[#f4efe4] border-[#dfb248]/45 hover:border-[#e5b84b]'
                        }`}
                      >
                        <span className="font-mono tabular-nums font-bold">
                          {room.number}
                        </span>
                        <span className="max-w-[115px] truncate">
                          {room.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Compact Bottom Control Bar */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-0.5 p-1 rounded-lg bg-[#0b2114]/95 border border-[#dfb248]/35">
                {(
                  [
                    ['axonometric', 'Axo'],
                    ['top', 'Top'],
                    ['front', 'Front'],
                    ['corner', '3D'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleInteriorPreset(key)}
                    aria-pressed={intPreset === key}
                    className={`px-2 py-1 text-[11px] font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      intPreset === key
                        ? 'bg-[#dfb248] text-[#0b2214]'
                        : 'text-[#dce5df] hover:bg-[#173e26]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowRoomLabels((s) => !s)}
                  aria-label="Toggle room labels"
                  aria-pressed={showRoomLabels}
                  className="px-2 py-1 text-[11px] font-medium rounded-md text-[#dce5df] hover:bg-[#173e26] inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showRoomLabels ? (
                    <Eye className="w-3 h-3 text-[#e5b84b]" />
                  ) : (
                    <EyeOff className="w-3 h-3" />
                  )}
                  <span>Labels</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRoomId(null);
                    handleInteriorPreset('axonometric');
                  }}
                  aria-label="Reset floor camera"
                  className="px-2 py-1 text-[11px] font-medium rounded-md text-[#e5b84b] hover:bg-[#173e26] inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Right Sidebar: Selected Floor Information & Room Directory */}
        <aside className="bg-[#0e2b1a] border border-[#dfb248]/20 rounded-xl p-3 flex flex-col min-h-0 max-h-[420px] lg:max-h-none">
          <FloorDetailsPanel
            floor={selectedFloor}
            selectedRoomId={selectedRoomId}
            onSelectRoom={handleSelectRoom}
            onOpenReferenceAudit={() => setAuditOpen(true)}
          />
        </aside>
      </div>

      <ReferenceAuditModal
        open={auditOpen}
        onClose={() => setAuditOpen(false)}
      />
    </div>
  );
}
