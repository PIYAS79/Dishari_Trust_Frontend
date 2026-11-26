"use client";
"use no memo";

import { useMemo, useState } from 'react';
import * as THREE from 'three';
import {
  BUILDING_DIMENSIONS,
  FLOOR_ELEVATIONS,
  FloorId,
  getRearWallAngleRad,
  rearZAtX,
} from '../../utils/geometryHelpers';
import { FLOORS_DATA, FloorSpec } from '../../data/dishariArchitecture';
import { getDishariMaterials } from '../../materials/proceduralMaterials';
import { CompositeTree, PlanterBox } from './ArchitecturalProps';

interface BuildingExteriorSceneProps {
  selectedFloorId: FloorId;
  onSelectFloor: (id: FloorId) => void;
}

const STEP_RIGHT_Z = 2.2;
const STEP_RIGHT_X = 15.85;

/**
 * Stepped exterior footprint matching the front-right wing projection and rear-right setback
 * visible in the DISHARI G+6 exterior reference.
 */
function createExteriorSlabShape(inset = 0): THREE.Shape {
  const minX = BUILDING_DIMENSIONS.minX + inset;
  const maxX = BUILDING_DIMENSIONS.maxX - inset;
  const stepX = STEP_RIGHT_X - inset;
  const frontZ = BUILDING_DIMENSIONS.frontZ - inset;
  const rearLeftZ = rearZAtX(minX) + inset;
  const rearRightZ = rearZAtX(maxX) + inset;
  const r = Math.max(0.4, BUILDING_DIMENSIONS.cornerRadius - inset);

  const shape = new THREE.Shape();
  shape.moveTo(minX, -frontZ);
  shape.lineTo(maxX, -frontZ);
  shape.lineTo(maxX, -STEP_RIGHT_Z);
  shape.lineTo(stepX, -STEP_RIGHT_Z);
  shape.lineTo(stepX, -(rearRightZ + r));
  shape.quadraticCurveTo(stepX, -rearRightZ, stepX - r, -rearRightZ);
  shape.lineTo(minX, -rearLeftZ);
  shape.closePath();
  return shape;
}

function useExteriorSlabGeometry(thickness: number, inset = 0) {
  return useMemo(() => {
    const shape = createExteriorSlabShape(inset);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: false,
      curveSegments: 14,
    });
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [thickness, inset]);
}

function GoldFloorOutline({
  baseY,
  height,
  isHovered,
  isSelected,
}: {
  baseY: number;
  height: number;
  isHovered: boolean;
  isSelected: boolean;
}) {
  const lineGeo = useMemo(() => {
    const { minX, maxX, frontZ, cornerRadius } = BUILDING_DIMENSIONS;
    const pad = 0.16;
    const x0 = minX - pad;
    const x1 = maxX + pad;
    const stepX = STEP_RIGHT_X + pad;
    const fz = frontZ + pad;
    const rzL = rearZAtX(minX) - pad;
    const rzR = rearZAtX(maxX) - pad;
    const r = cornerRadius + pad;

    const pts: THREE.Vector3[] = [
      new THREE.Vector3(x0, 0, fz),
      new THREE.Vector3(x1, 0, fz),
      new THREE.Vector3(x1, 0, STEP_RIGHT_Z + pad),
      new THREE.Vector3(stepX, 0, STEP_RIGHT_Z + pad),
      new THREE.Vector3(stepX, 0, rzR + r),
    ];
    for (let i = 1; i <= 6; i++) {
      const t = i / 6;
      const angle = (t * Math.PI) / 2;
      const cx = stepX - r + Math.cos(angle) * r;
      const cz = rzR + r - Math.sin(angle) * r;
      pts.push(new THREE.Vector3(cx, 0, cz));
    }
    pts.push(new THREE.Vector3(x0, 0, rzL));
    pts.push(new THREE.Vector3(x0, 0, fz));

    const positions: number[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      positions.push(a.x, 0.04, a.z, b.x, 0.04, b.z);
      positions.push(a.x, height - 0.04, a.z, b.x, height - 0.04, b.z);
    }
    const corners = [pts[0], pts[1], pts[2], pts[3], pts[4], pts[pts.length - 2]];
    for (const c of corners) {
      positions.push(c.x, 0.04, c.z, c.x, height - 0.04, c.z);
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [height]);

  const mats = useMemo(() => getDishariMaterials(), []);

  if (!isSelected && !isHovered) return null;

  return (
    <group position={[0, baseY, 0]}>
      {isSelected && (
        <>
          {/* Front gold edge bars */}
          <mesh position={[0, 0.06, BUILDING_DIMENSIONS.frontZ + 0.18]} material={mats.goldHighlight}>
            <boxGeometry args={[34.4, 0.14, 0.14]} />
          </mesh>
          <mesh
            position={[0, height - 0.06, BUILDING_DIMENSIONS.frontZ + 0.18]}
            material={mats.goldHighlight}
          >
            <boxGeometry args={[34.4, 0.14, 0.14]} />
          </mesh>
          {/* Stepped right-wing front segment bars */}
          <mesh
            position={[BUILDING_DIMENSIONS.maxX + 0.18, 0.06, 5.68]}
            material={mats.goldHighlight}
          >
            <boxGeometry args={[0.14, 0.14, 6.95]} />
          </mesh>
          <mesh
            position={[BUILDING_DIMENSIONS.maxX + 0.18, height - 0.06, 5.68]}
            material={mats.goldHighlight}
          >
            <boxGeometry args={[0.14, 0.14, 6.95]} />
          </mesh>
          {/* Stepped right-wing rear segment bars */}
          <mesh
            position={[STEP_RIGHT_X + 0.18, 0.06, -3.1]}
            material={mats.goldHighlight}
          >
            <boxGeometry args={[0.14, 0.14, 10.8]} />
          </mesh>
          <mesh
            position={[STEP_RIGHT_X + 0.18, height - 0.06, -3.1]}
            material={mats.goldHighlight}
          >
            <boxGeometry args={[0.14, 0.14, 10.8]} />
          </mesh>
          <mesh position={[0, height * 0.5, BUILDING_DIMENSIONS.frontZ + 0.12]}>
            <boxGeometry args={[34.2, height - 0.16, 0.04]} />
            <meshBasicMaterial
              color="#f3c146"
              transparent
              opacity={0.13}
              depthWrite={false}
            />
          </mesh>
        </>
      )}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color={isSelected ? '#ffd15c' : '#e8be5a'}
          transparent
          opacity={isSelected ? 1 : 0.72}
        />
      </lineSegments>
    </group>
  );
}

/**
 * Deeply recessed side window assembly with brick spandrels, dark steel frame,
 * reflective glazing, and warm lit interior backing.
 */
function RecessedSideWindow({
  z,
  width,
  floorHeight,
  wallX,
  mats,
}: {
  z: number;
  width: number;
  floorHeight: number;
  wallX: number;
  mats: ReturnType<typeof getDishariMaterials>;
}) {
  const winH = floorHeight * 0.56;
  const spandrelH = (floorHeight - winH) * 0.5;

  return (
    <group position={[wallX, floorHeight * 0.5, z]}>
      {/* Top brick lintel & bottom brick sill */}
      <mesh position={[0, floorHeight * 0.5 - spandrelH * 0.5, 0]} material={mats.brickExterior} castShadow>
        <boxGeometry args={[0.7, spandrelH, width]} />
      </mesh>
      <mesh position={[0, -floorHeight * 0.5 + spandrelH * 0.5, 0]} material={mats.brickExterior} castShadow>
        <boxGeometry args={[0.7, spandrelH, width]} />
      </mesh>
      {/* Stone sill lip */}
      <mesh position={[0.04, -winH * 0.5 + 0.04, 0]} material={mats.stonePlinth}>
        <boxGeometry args={[0.74, 0.08, width + 0.04]} />
      </mesh>
      {/* Recessed dark steel frame perimeter */}
      <mesh position={[-0.2, 0, width * 0.5 - 0.04]} material={mats.darkSteel}>
        <boxGeometry args={[0.14, winH, 0.07]} />
      </mesh>
      <mesh position={[-0.2, 0, -width * 0.5 + 0.04]} material={mats.darkSteel}>
        <boxGeometry args={[0.14, winH, 0.07]} />
      </mesh>
      <mesh position={[-0.2, winH * 0.5 - 0.04, 0]} material={mats.darkSteel}>
        <boxGeometry args={[0.14, 0.07, width]} />
      </mesh>
      <mesh position={[-0.2, -winH * 0.5 + 0.04, 0]} material={mats.darkSteel}>
        <boxGeometry args={[0.14, 0.07, width]} />
      </mesh>
      {/* Vertical center mullion */}
      <mesh position={[-0.2, 0, 0]} material={mats.darkSteel}>
        <boxGeometry args={[0.12, winH, 0.06]} />
      </mesh>
      {/* Recessed reflective glazing */}
      <mesh position={[-0.22, 0, 0]} material={mats.glass}>
        <boxGeometry args={[0.06, winH - 0.08, width - 0.08]} />
      </mesh>
      {/* Warm interior glow behind glazing */}
      <mesh position={[-0.78, 0, 0]} material={mats.warmInterior}>
        <boxGeometry args={[0.08, winH * 0.92, width * 0.95]} />
      </mesh>
    </group>
  );
}

function ExteriorFloorLevel({
  floor,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  slabGeo,
}: {
  floor: FloorSpec;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: FloorId) => void;
  onHover: (id: FloorId | null) => void;
  slabGeo: THREE.BufferGeometry;
}) {
  const mats = useMemo(() => getDishariMaterials(), []);
  const { baseY, height } = FLOOR_ELEVATIONS[floor.id];
  const isGround = floor.id === 'G';
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onSelect(floor.id);
  };

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    onHover(floor.id);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'default';
    onHover(null);
  };

  // Exact pier and bay geometry matching the reference: 3 balcony bays + wide solid front-right brick corner
  const piers = [
    { x: -16.25, w: 1.5 },
    { x: -5.95, w: 1.5 },
    { x: 4.35, w: 1.5 },
  ];
  const balconyBays = [
    { x: -11.1, w: 8.8 },
    { x: -0.8, w: 8.8 },
    { x: 8.95, w: 7.7 },
  ];

  return (
    <group
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <group position={[0, baseY, 0]}>
        {/* Structural floor slab */}
        <mesh geometry={slabGeo} material={mats.exteriorSlab} castShadow receiveShadow />

        {/* Invisible slightly-expanded hit proxy for reliable clicking */}
        <mesh position={[0, height * 0.5, 0]} visible={false}>
          <boxGeometry args={[34.4, height, 20.6]} />
          <meshBasicMaterial />
        </mesh>

        {/* FRONT FACADE (+Z) */}
        {isGround ? (
          <>
            {/* Tall monumental Ground Floor colonnade piers */}
            {piers.map((p, i) => (
              <mesh
                key={`gp-${i}`}
                position={[p.x, height * 0.5, 8.42]}
                material={mats.brickExterior}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[p.w, height, 1.15]} />
              </mesh>
            ))}

            {/* Wide front-right brick corner mass carried by twin piers framing the Ground portico */}
            <mesh
              position={[13.25, height * 0.5, 8.42]}
              material={mats.brickExterior}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.9, height, 1.15]} />
            </mesh>
            <mesh
              position={[16.25, height * 0.5, 8.42]}
              material={mats.brickExterior}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[1.5, height, 1.15]} />
            </mesh>
            {/* Upper header spanning the recessed corner portico */}
            <mesh
              position={[14.75, height - 0.55, 8.42]}
              material={mats.brickExterior}
              castShadow
            >
              <boxGeometry args={[2.2, 1.1, 1.15]} />
            </mesh>

            {/* Double-height recessed storefront glazing across the 3 colonnade bays */}
            {balconyBays.map((bay, idx) => (
              <group key={`gbay-${idx}`} position={[bay.x, 0, 0]}>
                {/* Top brick colonnade lintel */}
                <mesh
                  position={[0, height - 0.24, 8.42]}
                  material={mats.brickExterior}
                  castShadow
                >
                  <boxGeometry args={[bay.w + 0.1, 0.48, 1.1]} />
                </mesh>
                {/* Warm interior soffit ceiling */}
                <mesh position={[0, height - 0.52, 7.65]} material={mats.warmInterior}>
                  <boxGeometry args={[bay.w, 0.08, 1.5]} />
                </mesh>
                {/* Tall storefront glass plane */}
                <mesh position={[0, (height - 0.42) * 0.5, 7.12]} material={mats.glass}>
                  <boxGeometry args={[bay.w, height - 0.46, 0.1]} />
                </mesh>
                {/* Horizontal transom */}
                <mesh position={[0, 3.15, 7.12]} material={mats.darkSteel}>
                  <boxGeometry args={[bay.w, 0.08, 0.16]} />
                </mesh>
                {/* Vertical mullions */}
                {[-bay.w * 0.33, 0, bay.w * 0.33].map((mx, mIdx) => (
                  <mesh key={mIdx} position={[mx, (height - 0.42) * 0.5, 7.12]} material={mats.darkSteel}>
                    <boxGeometry args={[0.08, height - 0.46, 0.16]} />
                  </mesh>
                ))}
                {/* Warm lit interior reception depth */}
                <mesh position={[0, (height - 0.5) * 0.5, 5.2]} material={mats.warmInterior}>
                  <boxGeometry args={[bay.w, height - 0.5, 0.16]} />
                </mesh>
              </group>
            ))}

            {/* Deep recessed corner entrance lobby glazing behind portico */}
            <mesh position={[14.75, (height - 0.9) * 0.5, 6.2]} material={mats.glass}>
              <boxGeometry args={[2.3, height - 0.9, 0.1]} />
            </mesh>
            <mesh position={[14.75, (height - 0.9) * 0.5, 4.6]} material={mats.warmInterior}>
              <boxGeometry args={[2.4, height - 0.9, 0.14]} />
            </mesh>

            {/* Ground right-side brick wall with recessed horizontal clerestory glazing */}
            <mesh position={[16.65, height - 0.45, 5.6]} material={mats.brickExterior} castShadow>
              <boxGeometry args={[0.7, 0.9, 6.8]} />
            </mesh>
            <mesh position={[16.65, 1.15, 5.6]} material={mats.brickExterior} castShadow>
              <boxGeometry args={[0.7, 2.3, 6.8]} />
            </mesh>
            <mesh position={[16.25, 2.95, 5.6]} material={mats.glass}>
              <boxGeometry args={[0.12, 1.35, 6.4]} />
            </mesh>
            <mesh position={[15.5, 2.95, 5.6]} material={mats.warmInterior}>
              <boxGeometry args={[0.12, 1.35, 6.2]} />
            </mesh>
          </>
        ) : (
          <>
            {/* Upper floor vertical brick piers */}
            {piers.map((p, i) => (
              <mesh
                key={`up-${i}`}
                position={[p.x, height * 0.5, 8.42]}
                material={mats.brickExterior}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[p.w, height, 1.15]} />
              </mesh>
            ))}

            {/* Wide solid front-right brick corner pier (floors 1-6) matching reference */}
            <mesh
              position={[14.9, height * 0.5, 8.42]}
              material={mats.brickExterior}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[4.2, height, 1.15]} />
            </mesh>

            {/* 3 Deeply Recessed Balcony Bays with warm lit interiors, dark mullions, glass rails & cascading plants */}
            {balconyBays.map((bay, idx) => (
              <group key={`bay-${idx}`} position={[bay.x, 0, 0]}>
                {/* Top brick lintel beam */}
                <mesh
                  position={[0, height - 0.21, 8.45]}
                  material={mats.brickExterior}
                  castShadow
                >
                  <boxGeometry args={[bay.w + 0.14, 0.42, 1.08]} />
                </mesh>
                {/* Exposed front slab brick spandrel face */}
                <mesh
                  position={[0, 0.16, 8.86]}
                  material={mats.brickExterior}
                  castShadow
                >
                  <boxGeometry args={[bay.w + 0.1, 0.32, 0.28]} />
                </mesh>
                {/* Warm glowing balcony ceiling soffit */}
                <mesh position={[0, height - 0.42, 7.8]} material={mats.warmInterior}>
                  <boxGeometry args={[bay.w, 0.08, 1.9]} />
                </mesh>
                {/* Deeply recessed sliding glass wall (2.05m recess from facade plane) */}
                <mesh position={[0, height * 0.45, 6.95]} material={mats.glass}>
                  <boxGeometry args={[bay.w, height - 0.52, 0.1]} />
                </mesh>
                {/* Crisp dark-bronze sliding door frames & mullions */}
                <mesh position={[0, height - 0.44, 6.95]} material={mats.darkSteel}>
                  <boxGeometry args={[bay.w, 0.08, 0.14]} />
                </mesh>
                {[-bay.w * 0.34, 0, bay.w * 0.34].map((mx, mIdx) => (
                  <mesh key={mIdx} position={[mx, height * 0.45, 6.95]} material={mats.darkSteel}>
                    <boxGeometry args={[0.075, height - 0.52, 0.14]} />
                  </mesh>
                ))}
                {/* Warm lit interior room wall behind sliding glazing */}
                <mesh position={[0, height * 0.45, 5.4]} material={mats.warmInterior}>
                  <boxGeometry args={[bay.w, height - 0.56, 0.14]} />
                </mesh>
                {/* Sleek dark-tinted glass balcony balustrade */}
                <mesh position={[0, 0.74, 8.88]} material={mats.balconyGlass}>
                  <boxGeometry args={[bay.w, 0.86, 0.05]} />
                </mesh>
                {/* Thin charcoal top handrail */}
                <mesh position={[0, 1.19, 8.88]} material={mats.darkSteel}>
                  <boxGeometry args={[bay.w, 0.055, 0.09]} />
                </mesh>
                {/* Cascading lush balcony greenery spilling slightly over the front rim */}
                <PlanterBox
                  position={[0, 0.24, 8.56]}
                  width={bay.w - 0.18}
                  depth={0.5}
                  height={0.34}
                  brick={false}
                  cascading
                  exterior
                  mats={mats}
                />
              </group>
            ))}
          </>
        )}

        {/* RIGHT SIDE FACADE (+X) — Stepped two-wing brick elevation */}
        {/* Front-right projecting wing (Z: +9.0 down to +2.2) with 1 recessed window column */}
        {!isGround && (
          <>
            <mesh position={[16.65, height * 0.5, 7.6]} material={mats.brickExterior} castShadow>
              <boxGeometry args={[0.7, height, 2.8]} />
            </mesh>
            <RecessedSideWindow
              z={5.3}
              width={1.8}
              floorHeight={height}
              wallX={16.65}
              mats={mats}
            />
            <mesh position={[16.65, height * 0.5, 3.3]} material={mats.brickExterior} castShadow>
              <boxGeometry args={[0.7, height, 2.2]} />
            </mesh>
          </>
        )}

        {/* Architectural inward setback return wall at Z = +2.2 (17.0 -> 15.85) */}
        <mesh position={[16.42, height * 0.5, 2.05]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[1.15, height, 0.7]} />
        </mesh>

        {/* Rear-right recessed wing (Z: +2.2 down to -8.4) with 3 recessed window columns */}
        <mesh position={[15.5, height * 0.5, 1.75]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, height, 0.9]} />
        </mesh>
        <RecessedSideWindow
          z={0.4}
          width={1.8}
          floorHeight={height}
          wallX={15.5}
          mats={mats}
        />
        <mesh position={[15.5, height * 0.5, -1.35]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, height, 1.7]} />
        </mesh>
        <RecessedSideWindow
          z={-3.1}
          width={1.8}
          floorHeight={height}
          wallX={15.5}
          mats={mats}
        />
        <mesh position={[15.5, height * 0.5, -4.85]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, height, 1.7]} />
        </mesh>
        <RecessedSideWindow
          z={-6.6}
          width={1.8}
          floorHeight={height}
          wallX={15.5}
          mats={mats}
        />
        <mesh position={[15.5, height * 0.5, -7.95]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, height, 0.9]} />
        </mesh>

        {/* Curved North-East Brick Corner (+X, -Z) */}
        <mesh
          position={[STEP_RIGHT_X - BUILDING_DIMENSIONS.cornerRadius, height * 0.5, -8.4]}
          material={mats.brickExterior}
          castShadow
        >
          <cylinderGeometry
            args={[
              BUILDING_DIMENSIONS.cornerRadius,
              BUILDING_DIMENSIONS.cornerRadius,
              height,
              14,
              1,
              true,
              0,
              Math.PI / 2,
            ]}
          />
        </mesh>

        {/* SPLAYED REAR FACADE (-Z) with brick piers and glazed bays */}
        <group
          position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5]}
          rotation={[0, rearAngle, 0]}
        >
          {[-14.5, -7.2, 0.2, 7.6, 12.6].map((rx, idx) => (
            <mesh
              key={`rp-${idx}`}
              position={[rx, height * 0.5, 0]}
              material={mats.brickExterior}
              castShadow
            >
              <boxGeometry args={[1.4, height, 0.7]} />
            </mesh>
          ))}
          <mesh position={[-0.6, height * 0.48, 0.2]} material={mats.glass}>
            <boxGeometry args={[27.2, height * 0.7, 0.14]} />
          </mesh>
          <mesh position={[-0.6, height - 0.25, 0]} material={mats.brickExterior}>
            <boxGeometry args={[29.2, 0.5, 0.75]} />
          </mesh>
          <mesh position={[-0.6, 0.45, 0]} material={mats.brickExterior}>
            <boxGeometry args={[29.2, 0.9, 0.75]} />
          </mesh>
        </group>

        {/* LEFT FACADE (-X) + Exterior Typical Ramp Shell */}
        <mesh position={[-16.7, height * 0.5, 0.9]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.65, height, 15.8]} />
        </mesh>
        <group position={[-18.6, 0, 1.4]}>
          <mesh position={[0, 0.14, 0]} material={mats.exteriorConcrete}>
            <boxGeometry args={[2.0, 0.24, 11.2]} />
          </mesh>
          <mesh position={[-0.95, 0.65, 0]} material={mats.brickExterior}>
            <boxGeometry args={[0.22, 1.05, 11.4]} />
          </mesh>
          <mesh position={[0.35, 0.14, 6.0]} material={mats.exteriorConcrete}>
            <cylinderGeometry args={[1.45, 1.45, 0.24, 14]} />
          </mesh>
        </group>
      </group>

      {/* Gold/Yellow Highlight Outline on Selected or Hovered Floor */}
      <GoldFloorOutline
        baseY={baseY}
        height={height}
        isSelected={isSelected}
        isHovered={isHovered}
      />
    </group>
  );
}

/**
 * Muted architectural background context building silhouette.
 */
function NeighborContextBlock({
  position,
  width,
  height,
  depth,
  mats,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  mats: ReturnType<typeof getDishariMaterials>;
}) {
  const levels = Math.floor(height / 3.4);
  return (
    <group position={position}>
      <mesh position={[0, height * 0.5, 0]} material={mats.neighborBuilding}>
        <boxGeometry args={[width, height, depth]} />
      </mesh>
      {Array.from({ length: levels }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 2.2 + i * 3.4, depth * 0.5 + 0.04]}
          material={mats.balconyGlass}
        >
          <boxGeometry args={[width * 0.84, 1.35, 0.06]} />
        </mesh>
      ))}
    </group>
  );
}

export function BuildingExteriorScene({
  selectedFloorId,
  onSelectFloor,
}: BuildingExteriorSceneProps) {
  const [hoveredFloorId, setHoveredFloorId] = useState<FloorId | null>(null);
  const mats = useMemo(() => getDishariMaterials(), []);
  const typicalSlabGeo = useExteriorSlabGeometry(BUILDING_DIMENSIONS.slabThickness, 0.12);
  const roofSlabGeo = useExteriorSlabGeometry(BUILDING_DIMENSIONS.slabThickness, 0.04);
  const roofY = FLOOR_ELEVATIONS['6'].baseY + FLOOR_ELEVATIONS['6'].height;
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);
  const parapetH = BUILDING_DIMENSIONS.parapetHeight;

  return (
    <group>
      {/* Expansive site ground & lawn */}
      <mesh
        position={[0, -0.08, -12]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={mats.lawnGrass}
        receiveShadow
      >
        <planeGeometry args={[260, 260]} />
      </mesh>

      {/* Stone-paved pedestrian sidewalk & building plinth */}
      <mesh position={[1, 0.04, 3.8]} material={mats.stonePlinth} receiveShadow>
        <boxGeometry args={[54, 0.16, 20.4]} />
      </mesh>
      {/* Raised curb along front street edge */}
      <mesh position={[0, 0.09, 13.9]} material={mats.exteriorConcrete} receiveShadow>
        <boxGeometry args={[180, 0.18, 0.35]} />
      </mesh>

      {/* Front two-lane asphalt street with lane markings */}
      <mesh position={[0, 0.02, 18.2]} material={mats.asphaltRoad} receiveShadow>
        <boxGeometry args={[190, 0.06, 8.6]} />
      </mesh>

      {/* Angled secondary feeder road on front-left (-X, +Z) */}
      <mesh
        position={[-29, 0.018, 10]}
        rotation={[0, 0.68, 0]}
        material={mats.asphaltRoad}
        receiveShadow
      >
        <boxGeometry args={[7.2, 0.06, 36]} />
      </mesh>

      {/* Low green foreground border hedge strip across the road matching reference bottom edge */}
      <PlanterBox
        position={[2, 0.04, 22.9]}
        width={62}
        depth={1.4}
        height={0.28}
        brick={false}
        exterior
        mats={mats}
      />

      {/* Sidewalk planting beds between colonnade street trees */}
      <PlanterBox
        position={[-10.8, 0.12, 11.7]}
        width={6.8}
        depth={0.95}
        height={0.18}
        brick={false}
        exterior
        mats={mats}
      />
      <PlanterBox
        position={[-0.7, 0.12, 11.7]}
        width={6.8}
        depth={0.95}
        height={0.18}
        brick={false}
        exterior
        mats={mats}
      />
      <PlanterBox
        position={[9.2, 0.12, 11.7]}
        width={6.2}
        depth={0.95}
        height={0.18}
        brick={false}
        exterior
        mats={mats}
      />

      {/* Projecting Ground Floor courtyard brick perimeter wall on front-right (+X) */}
      <mesh position={[18.8, 1.25, 8.65]} material={mats.brickExterior} castShadow receiveShadow>
        <boxGeometry args={[4.4, 2.5, 0.45]} />
      </mesh>
      <mesh position={[18.8, 2.53, 8.65]} material={mats.stonePlinth}>
        <boxGeometry args={[4.5, 0.1, 0.54]} />
      </mesh>
      {/* Courtyard return brick wall along right driveway */}
      <mesh position={[20.8, 1.25, 4.4]} material={mats.brickExterior} castShadow receiveShadow>
        <boxGeometry args={[0.45, 2.5, 8.8]} />
      </mesh>
      <PlanterBox
        position={[18.8, 0.12, 5.4]}
        width={2.6}
        depth={1.4}
        height={0.22}
        brick={false}
        exterior
        mats={mats}
      />

      {/* Main Entry stone steps on front-right */}
      {[0, 1, 2].map((step) => (
        <mesh
          key={`ms-${step}`}
          position={[14.75, 0.1 + step * 0.11, 10.1 - step * 0.42]}
          material={mats.stonePlinth}
          receiveShadow
        >
          <boxGeometry args={[3.1, 0.12, 0.48]} />
        </mesh>
      ))}

      {/* Vehicular Ramp Entry (14) on right flank */}
      <mesh position={[19.2, 0.05, 1.5]} material={mats.exteriorConcrete} receiveShadow>
        <boxGeometry args={[4.8, 0.1, 19.0]} />
      </mesh>

      {/* Slender multi-branched street trees along colonnade + framing foliage */}
      <CompositeTree position={[-15.6, 0.12, 11.75]} scale={1.12} mats={mats} />
      <CompositeTree position={[-5.8, 0.12, 11.8]} scale={1.06} mats={mats} />
      <CompositeTree position={[4.3, 0.12, 11.8]} scale={1.08} mats={mats} />
      <CompositeTree position={[14.1, 0.12, 11.85]} scale={0.94} mats={mats} />
      <CompositeTree position={[-22.5, 0.02, 8.5]} scale={1.38} mats={mats} />
      <CompositeTree position={[24.6, 0.02, 3.8]} scale={1.26} mats={mats} />
      <CompositeTree position={[24.2, 0.02, -5.8]} scale={1.18} mats={mats} />
      <CompositeTree position={[-16.0, 0.02, -13.0]} scale={1.32} mats={mats} />
      <CompositeTree position={[9.5, 0.02, -16.0]} scale={1.25} mats={mats} />

      {/* Subtle contextual urban buildings in atmospheric background */}
      <NeighborContextBlock
        position={[-32, 0, -10]}
        width={13}
        height={21}
        depth={12}
        mats={mats}
      />
      <NeighborContextBlock
        position={[35, 0, -14]}
        width={14}
        height={18}
        depth={12}
        mats={mats}
      />

      {/* 7 Stacked Building Levels (G through 6) */}
      {FLOORS_DATA.map((floor) => (
        <ExteriorFloorLevel
          key={floor.id}
          floor={floor}
          isSelected={selectedFloorId === floor.id}
          isHovered={hoveredFloorId === floor.id}
          onSelect={onSelectFloor}
          onHover={setHoveredFloorId}
          slabGeo={typicalSlabGeo}
        />
      ))}

      {/* Rooftop Slab & Clean Flat Red Brick Parapet above 6th Floor */}
      <group position={[0, roofY, 0]}>
        <mesh geometry={roofSlabGeo} material={mats.exteriorConcrete} castShadow receiveShadow />
        {/* Front parapet */}
        <mesh position={[0, parapetH * 0.5, 8.65]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[34.0, parapetH, 0.7]} />
        </mesh>
        {/* Front-right stepped parapet */}
        <mesh position={[16.65, parapetH * 0.5, 5.6]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, parapetH, 6.8]} />
        </mesh>
        <mesh position={[16.42, parapetH * 0.5, 2.05]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[1.15, parapetH, 0.7]} />
        </mesh>
        {/* Rear-right stepped parapet */}
        <mesh position={[15.5, parapetH * 0.5, -3.1]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, parapetH, 10.6]} />
        </mesh>
        {/* Left parapet */}
        <mesh position={[-16.65, parapetH * 0.5, 0.9]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.7, parapetH, 15.8]} />
        </mesh>
        {/* Rear splayed parapet */}
        <group
          position={[0, parapetH * 0.5, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5]}
          rotation={[0, rearAngle, 0]}
        >
          <mesh position={[-0.6, 0, 0]} material={mats.brickExterior} castShadow>
            <boxGeometry args={[29.4, parapetH, 0.7]} />
          </mesh>
        </group>
        {/* Curved NE corner parapet */}
        <mesh
          position={[STEP_RIGHT_X - BUILDING_DIMENSIONS.cornerRadius, parapetH * 0.5, -8.4]}
          material={mats.brickExterior}
        >
          <cylinderGeometry
            args={[
              BUILDING_DIMENSIONS.cornerRadius,
              BUILDING_DIMENSIONS.cornerRadius,
              parapetH,
              14,
              1,
              true,
              0,
              Math.PI / 2,
            ]}
          />
        </mesh>
        {/* Tucked low roof stair/lift core kept below clean parapet skyline */}
        <mesh position={[-13.4, 0.55, -4.2]} material={mats.exteriorSlab}>
          <boxGeometry args={[3.2, 1.1, 2.6]} />
        </mesh>
      </group>
    </group>
  );
}
