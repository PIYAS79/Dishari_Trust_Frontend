"use client";
"use no memo";

import { useMemo } from 'react';
import { DishariMaterialSet } from '../../materials/proceduralMaterials';
import { BoxEdges, CylinderEdges } from './ArchitecturalEdges';

interface MatProp {
  mats: DishariMaterialSet;
}

/**
 * Slender multi-branched architectural street tree with airy layered foliage.
 * Bottom-center pivot at y = 0 so every tree sits flush on the sidewalk/ground.
 */
export function CompositeTree({
  position,
  scale = 1,
  mats,
}: {
  position: [number, number, number];
  scale?: number;
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Slender main trunk */}
      <mesh position={[0, 1.75, 0]} material={mats.bark} castShadow>
        <cylinderGeometry args={[0.08, 0.16, 3.5, 8]} />
      </mesh>
      {/* Spreading secondary limbs */}
      <mesh
        position={[0.42, 3.25, 0.16]}
        rotation={[0.18, 0, -0.42]}
        material={mats.bark}
      >
        <cylinderGeometry args={[0.04, 0.07, 1.45, 6]} />
      </mesh>
      <mesh
        position={[-0.38, 3.4, -0.18]}
        rotation={[-0.16, 0, 0.44]}
        material={mats.bark}
      >
        <cylinderGeometry args={[0.04, 0.07, 1.4, 6]} />
      </mesh>
      <mesh
        position={[0.06, 3.7, -0.26]}
        rotation={[-0.3, 0, -0.12]}
        material={mats.bark}
      >
        <cylinderGeometry args={[0.035, 0.06, 1.2, 6]} />
      </mesh>

      {/* Airy layered botanical canopy (irregular non-spherical leaf clusters) */}
      <mesh position={[0, 4.45, 0]} scale={[1.35, 1.05, 1.25]} rotation={[0.2, 0.4, 0.1]} material={mats.foliageDeep} castShadow>
        <dodecahedronGeometry args={[0.92, 0]} />
      </mesh>
      <mesh position={[0.76, 4.1, 0.32]} scale={[1.2, 0.92, 1.1]} rotation={[-0.3, 1.1, 0.2]} material={mats.foliageDark} castShadow>
        <dodecahedronGeometry args={[0.78, 0]} />
      </mesh>
      <mesh position={[-0.74, 4.25, -0.26]} scale={[1.18, 0.95, 1.1]} rotation={[0.4, -0.7, -0.2]} material={mats.foliageLight} castShadow>
        <dodecahedronGeometry args={[0.76, 0]} />
      </mesh>
      <mesh position={[0.16, 5.2, -0.1]} scale={[1.25, 0.9, 1.15]} rotation={[0.1, 1.9, -0.3]} material={mats.foliageLight} castShadow>
        <dodecahedronGeometry args={[0.74, 0]} />
      </mesh>
      <mesh position={[-0.34, 4.9, 0.44]} scale={[1.1, 0.85, 1.0]} rotation={[-0.2, 0.8, 0.4]} material={mats.foliageDark} castShadow>
        <dodecahedronGeometry args={[0.66, 0]} />
      </mesh>
      <mesh position={[0.52, 4.82, -0.38]} scale={[1.05, 0.88, 1.0]} rotation={[0.5, -1.2, 0.1]} material={mats.foliageLight}>
        <dodecahedronGeometry args={[0.62, 0]} />
      </mesh>
    </group>
  );
}

/**
 * Brick or concrete planter trough filled with varied green foliage clusters
 * and optional cascading balcony tendrils spilling over the front edge.
 */
export function PlanterBox({
  position,
  width,
  depth = 0.65,
  height = 0.48,
  brick = true,
  cascading = false,
  exterior = false,
  mats,
}: {
  position: [number, number, number];
  width: number;
  depth?: number;
  height?: number;
  brick?: boolean;
  cascading?: boolean;
  exterior?: boolean;
  mats: DishariMaterialSet;
}) {
  const shrubCount = Math.max(6, Math.floor(width / 0.36));
  const shrubs = useMemo(() => {
    const arr: {
      x: number;
      z: number;
      sx: number;
      sy: number;
      sz: number;
      rot: number;
      tone: 0 | 1 | 2;
      drop: number;
    }[] = [];
    for (let i = 0; i < shrubCount; i++) {
      const t = (i + 0.5) / shrubCount - 0.5;
      const hash = ((i * 73 + 19) % 13) / 13;
      const hash2 = ((i * 41 + 7) % 11) / 11;
      arr.push({
        x: t * (width - 0.22) + (hash - 0.5) * 0.14,
        z: (hash - 0.5) * depth * 0.42,
        sx: 0.28 + hash * 0.18,
        sy: 0.24 + ((i * 29) % 7) * 0.036,
        sz: 0.25 + hash * 0.14,
        rot: hash * Math.PI,
        tone: (i % 3) as 0 | 1 | 2,
        drop: 0.22 + hash2 * 0.34,
      });
    }
    return arr;
  }, [shrubCount, width, depth]);

  return (
    <group position={position}>
      <mesh
        position={[0, height * 0.5, 0]}
        material={brick ? mats.brickExterior : exterior ? mats.exteriorSlab : mats.plasterTrim}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, height, depth]} />
      </mesh>
      {shrubs.map((s, idx) => {
        const mat =
          s.tone === 0
            ? mats.foliageDeep
            : s.tone === 1
              ? mats.foliageDark
              : mats.foliageLight;
        return (
          <group key={idx}>
            <mesh
              position={[s.x, height + s.sy * 0.56, s.z]}
              scale={[s.sx * 2.4, s.sy * 2.25, s.sz * 2.15]}
              rotation={[0.25, s.rot, 0.2]}
              material={mat}
            >
              <dodecahedronGeometry args={[0.5, 0]} />
            </mesh>
            {cascading && idx % 2 === 0 && (
              <mesh
                position={[s.x + 0.06, height - s.drop * 0.55, depth * 0.58 + 0.14]}
                scale={[s.sx * 1.8, s.drop * 2.6, 0.34]}
                rotation={[0.4, s.rot * 0.7, 0.15]}
                material={s.tone === 2 ? mats.foliageDark : mats.foliageDeep}
              >
                <dodecahedronGeometry args={[0.46, 0]} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/**
 * Central sculptural double-flight staircase shared across G, 1F, 2F, and 6F.
 */
export function CentralFeatureStair({
  position,
  floorHeight = 3.3,
  mats,
}: {
  position: [number, number, number];
  floorHeight?: number;
  mats: DishariMaterialSet;
}) {
  const stepCount = 9;
  const halfH = floorHeight * 0.5;
  const runLength = 4.6;
  const stepW = runLength / stepCount + 0.04;

  return (
    <group position={position}>
      {/* Mid-landing slab */}
      <mesh
        position={[-runLength * 0.5 - 0.7, halfH, 0]}
        material={mats.concreteRamp}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.4, 0.18, 2.8]} />
        <BoxEdges args={[1.4, 0.18, 2.8]} mats={mats} />
      </mesh>

      {/* Lower flight (+X up to mid-landing on -X) */}
      {Array.from({ length: stepCount }).map((_, i) => {
        const t = (i + 0.5) / stepCount;
        const x = (0.5 - t) * runLength;
        const y = t * halfH;
        return (
          <mesh
            key={`l-${i}`}
            position={[x, y * 0.5 + 0.08, 0.72]}
            material={mats.concreteRamp}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[stepW, 0.16, 1.25]} />
            <BoxEdges args={[stepW, 0.16, 1.25]} mats={mats} />
          </mesh>
        );
      })}

      {/* Upper return flight */}
      {Array.from({ length: stepCount }).map((_, i) => {
        const t = (i + 0.5) / stepCount;
        const x = (-0.5 + t) * runLength;
        const y = halfH + t * halfH * 0.72;
        return (
          <mesh
            key={`u-${i}`}
            position={[x, y * 0.5 + 0.7, -0.72]}
            material={mats.concreteRamp}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[stepW, 0.16, 1.25]} />
            <BoxEdges args={[stepW, 0.16, 1.25]} mats={mats} />
          </mesh>
        );
      })}

      {/* Timber balustrades / handrails */}
      <mesh
        position={[0, halfH * 0.62 + 0.55, 1.35]}
        rotation={[0, 0, -0.26]}
        material={mats.timberFurniture}
      >
        <boxGeometry args={[runLength + 0.4, 0.08, 0.08]} />
        <BoxEdges args={[runLength + 0.4, 0.08, 0.08]} mats={mats} />
      </mesh>
      <mesh
        position={[0, halfH * 0.62 + 0.25, 1.35]}
        rotation={[0, 0, -0.26]}
        material={mats.interiorGlass}
      >
        <boxGeometry args={[runLength + 0.3, 0.65, 0.04]} />
        <BoxEdges args={[runLength + 0.3, 0.65, 0.04]} mats={mats} variant="glass" />
      </mesh>
      <mesh
        position={[0, halfH * 1.1 + 0.45, -1.35]}
        rotation={[0, 0, 0.24]}
        material={mats.timberFurniture}
      >
        <boxGeometry args={[runLength + 0.4, 0.08, 0.08]} />
        <BoxEdges args={[runLength + 0.4, 0.08, 0.08]} mats={mats} />
      </mesh>
      <mesh
        position={[0, halfH * 1.1 + 0.15, -1.35]}
        rotation={[0, 0, 0.24]}
        material={mats.interiorGlass}
      >
        <boxGeometry args={[runLength + 0.3, 0.65, 0.04]} />
        <BoxEdges args={[runLength + 0.3, 0.65, 0.04]} mats={mats} variant="glass" />
      </mesh>
    </group>
  );
}

/**
 * Enclosed Fire Stair Core (middle-right of floorplate).
 */
export function FireStairCore({
  position,
  wallHeight = 2.6,
  mats,
}: {
  position: [number, number, number];
  wallHeight?: number;
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      {/* Core perimeter walls (open doorway on left -X) */}
      <mesh position={[0, wallHeight / 2, -2.0]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[3.6, wallHeight, 0.2]} />
        <BoxEdges args={[3.6, wallHeight, 0.2]} mats={mats} />
      </mesh>
      <mesh position={[0, wallHeight / 2, 2.0]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[3.6, wallHeight, 0.2]} />
        <BoxEdges args={[3.6, wallHeight, 0.2]} mats={mats} />
      </mesh>
      <mesh position={[1.7, wallHeight / 2, 0]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.2, wallHeight, 4.2]} />
        <BoxEdges args={[0.2, wallHeight, 4.2]} mats={mats} />
      </mesh>
      <mesh position={[-1.7, wallHeight / 2, -1.2]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.2, wallHeight, 1.6]} />
        <BoxEdges args={[0.2, wallHeight, 1.6]} mats={mats} />
      </mesh>
      <mesh position={[-1.7, wallHeight / 2, 1.2]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.2, wallHeight, 1.6]} />
        <BoxEdges args={[0.2, wallHeight, 1.6]} mats={mats} />
      </mesh>

      {/* Stair treads inside */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`fs1-${i}`}
          position={[-0.7 + i * 0.3, 0.18 + i * 0.16, 0.9]}
          material={mats.concreteRamp}
          receiveShadow
        >
          <boxGeometry args={[0.28, 0.15, 1.5]} />
          <BoxEdges args={[0.28, 0.15, 1.5]} mats={mats} />
        </mesh>
      ))}
      <mesh position={[1.25, 1.35, 0]} material={mats.concreteRamp} receiveShadow>
        <boxGeometry args={[0.9, 0.18, 3.6]} />
        <BoxEdges args={[0.9, 0.18, 3.6]} mats={mats} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`fs2-${i}`}
          position={[0.65 - i * 0.3, 1.48 + i * 0.16, -0.9]}
          material={mats.concreteRamp}
          receiveShadow
        >
          <boxGeometry args={[0.28, 0.15, 1.5]} />
          <BoxEdges args={[0.28, 0.15, 1.5]} mats={mats} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Dual-car lift shaft with architectural walls, recessed metallic elevator doors,
 * and crisp diagonal X void indicator matching the axonometric reference plans.
 */
export function LiftCoreUnit({
  position,
  width = 3.4,
  depth = 2.6,
  wallHeight = 2.6,
  brickFront = false,
  doorSide = 'front',
  mats,
}: {
  position: [number, number, number];
  width?: number;
  depth?: number;
  wallHeight?: number;
  brickFront?: boolean;
  doorSide?: 'front' | 'back';
  mats: DishariMaterialSet;
}) {
  const wallMat = brickFront ? mats.brickInterior : mats.plasterWall;
  const diagLen = Math.hypot(width - 0.4, depth - 0.4);
  const diagAngle = Math.atan2(depth - 0.4, width - 0.4);
  const doorZ = doorSide === 'front' ? depth / 2 - 0.1 : -depth / 2 + 0.1;

  return (
    <group position={position}>
      {/* Light concrete shaft floor */}
      <mesh position={[0, 0.03, 0]} material={mats.concreteRamp} receiveShadow>
        <boxGeometry args={[width - 0.3, 0.06, depth - 0.3]} />
      </mesh>
      {/* Left & Right shaft walls */}
      <mesh position={[-width / 2 + 0.1, wallHeight / 2, 0]} material={wallMat} castShadow receiveShadow>
        <boxGeometry args={[0.2, wallHeight, depth]} />
        <BoxEdges args={[0.2, wallHeight, depth]} mats={mats} />
      </mesh>
      <mesh position={[width / 2 - 0.1, wallHeight / 2, 0]} material={wallMat} castShadow receiveShadow>
        <boxGeometry args={[0.2, wallHeight, depth]} />
        <BoxEdges args={[0.2, wallHeight, depth]} mats={mats} />
      </mesh>
      {/* Back solid wall */}
      <mesh
        position={[0, wallHeight / 2, doorSide === 'front' ? -depth / 2 + 0.1 : depth / 2 - 0.1]}
        material={wallMat}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width, wallHeight, 0.2]} />
        <BoxEdges args={[width, wallHeight, 0.2]} mats={mats} />
      </mesh>
      {/* Front wall piers framing twin elevator doors */}
      <mesh position={[-width / 2 + 0.35, wallHeight / 2, doorZ]} material={wallMat} castShadow>
        <boxGeometry args={[0.5, wallHeight, 0.2]} />
        <BoxEdges args={[0.5, wallHeight, 0.2]} mats={mats} />
      </mesh>
      <mesh position={[0, wallHeight / 2, doorZ]} material={wallMat} castShadow>
        <boxGeometry args={[0.28, wallHeight, 0.2]} />
        <BoxEdges args={[0.28, wallHeight, 0.2]} mats={mats} />
      </mesh>
      <mesh position={[width / 2 - 0.35, wallHeight / 2, doorZ]} material={wallMat} castShadow>
        <boxGeometry args={[0.5, wallHeight, 0.2]} />
        <BoxEdges args={[0.5, wallHeight, 0.2]} mats={mats} />
      </mesh>
      {/* Transom above elevator doors */}
      <mesh position={[0, wallHeight - 0.28, doorZ]} material={wallMat}>
        <boxGeometry args={[width - 0.4, 0.56, 0.2]} />
        <BoxEdges args={[width - 0.4, 0.56, 0.2]} mats={mats} />
      </mesh>
      {/* Twin brushed muted-concrete/steel elevator door leaves with slim center seam */}
      {[-width * 0.21, width * 0.21].map((dx, idx) => (
        <group key={idx} position={[dx, (wallHeight - 0.56) * 0.5, doorZ]}>
          <mesh material={mats.concreteRamp}>
            <boxGeometry args={[width * 0.3, wallHeight - 0.58, 0.08]} />
            <BoxEdges args={[width * 0.3, wallHeight - 0.58, 0.08]} mats={mats} />
          </mesh>
          <mesh material={mats.darkSteel}>
            <boxGeometry args={[0.04, wallHeight - 0.6, 0.1]} />
          </mesh>
        </group>
      ))}
      {/* Top X-cross structural void indicator matching axonometric plans */}
      <mesh
        position={[0, wallHeight - 0.1, 0]}
        rotation={[0, diagAngle, 0]}
        material={mats.darkSteel}
      >
        <boxGeometry args={[diagLen, 0.05, 0.06]} />
      </mesh>
      <mesh
        position={[0, wallHeight - 0.1, 0]}
        rotation={[0, -diagAngle, 0]}
        material={mats.darkSteel}
      >
        <boxGeometry args={[diagLen, 0.05, 0.06]} />
      </mesh>
    </group>
  );
}

/**
 * Exterior pedestrian ramp wing on the left (-X) flank with curved U-turn landing
 * and brick/plaster parapet ribbons matching the axonometric plans.
 */
export function PedestrianRampWing({
  mats,
  isGroundFloor = false,
}: MatProp & { isGroundFloor?: boolean }) {
  return (
    <group position={[-18.1, 0, 1.4]}>
      {/* Main sloped ramp deck */}
      <mesh
        position={[0, 0.42, 0]}
        rotation={[0.09, 0, 0]}
        material={mats.concreteRamp}
        receiveShadow
      >
        <boxGeometry args={[1.95, 0.22, 11.0]} />
        <BoxEdges args={[1.95, 0.22, 11.0]} mats={mats} />
      </mesh>
      {/* Curved U-turn turnaround landing at front-left */}
      <mesh position={[0.35, 0.12, 5.9]} material={mats.concreteRamp} receiveShadow>
        <cylinderGeometry args={[1.45, 1.45, 0.24, 18]} />
        <CylinderEdges args={[1.45, 1.45, 0.24, 18]} mats={mats} />
      </mesh>
      {/* Red brick inner parapet wall along ramp */}
      <mesh
        position={[-0.95, 0.85, 0]}
        rotation={[0.09, 0, 0]}
        material={mats.brickInterior}
        castShadow
      >
        <boxGeometry args={[0.24, 1.1, 11.2]} />
        <BoxEdges args={[0.24, 1.1, 11.2]} mats={mats} />
      </mesh>
      {/* Outer cream/plaster curved parapet wall */}
      <mesh position={[0.35, 0.62, 5.9]} material={mats.plasterWall} castShadow>
        <cylinderGeometry args={[1.55, 1.55, 0.92, 18, 1, true, Math.PI * 0.45, Math.PI * 1.1]} />
        <CylinderEdges
          args={[1.55, 1.55, 0.92, 18, 1, true, Math.PI * 0.45, Math.PI * 1.1]}
          mats={mats}
        />
      </mesh>
      {isGroundFloor && (
        <mesh position={[2.0, 0.15, 7.2]} material={mats.concreteRamp} receiveShadow>
          <boxGeometry args={[3.2, 0.24, 2.0]} />
          <BoxEdges args={[3.2, 0.24, 2.0]} mats={mats} />
        </mesh>
      )}
    </group>
  );
}

/**
 * Studio bed + pillow + nightstand unit (for 2nd Floor studios & staff rooms).
 */
export function StudioBedUnit({
  position,
  rotationY = 0,
  mats,
}: {
  position: [number, number, number];
  rotationY?: number;
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Bed base */}
      <mesh position={[0, 0.22, 0]} material={mats.timberFurniture} castShadow>
        <boxGeometry args={[1.25, 0.3, 2.0]} />
        <BoxEdges args={[1.25, 0.3, 2.0]} mats={mats} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.42, 0.04]} material={mats.bedLinen} castShadow>
        <boxGeometry args={[1.18, 0.18, 1.88]} />
        <BoxEdges args={[1.18, 0.18, 1.88]} mats={mats} />
      </mesh>
      {/* Pillow */}
      <mesh position={[0, 0.54, -0.72]} material={mats.whiteFurniture}>
        <boxGeometry args={[0.8, 0.1, 0.34]} />
      </mesh>
      {/* Headboard */}
      <mesh position={[0, 0.55, -0.98]} material={mats.timberFurniture}>
        <boxGeometry args={[1.3, 0.85, 0.08]} />
        <BoxEdges args={[1.3, 0.85, 0.08]} mats={mats} />
      </mesh>
      {/* Nightstand */}
      <mesh position={[0.85, 0.28, -0.72]} material={mats.timberFurniture}>
        <boxGeometry args={[0.42, 0.48, 0.42]} />
        <BoxEdges args={[0.42, 0.48, 0.42]} mats={mats} />
      </mesh>
    </group>
  );
}

/**
 * Office / Consultation Desk + Chairs.
 */
export function OfficeDeskSet({
  position,
  rotationY = 0,
  mats,
}: {
  position: [number, number, number];
  rotationY?: number;
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.72, 0]} material={mats.whiteFurniture} castShadow>
        <boxGeometry args={[1.6, 0.08, 0.8]} />
        <BoxEdges args={[1.6, 0.08, 0.8]} mats={mats} />
      </mesh>
      <mesh position={[-0.7, 0.36, 0]} material={mats.darkSteel}>
        <boxGeometry args={[0.08, 0.72, 0.7]} />
      </mesh>
      <mesh position={[0.7, 0.36, 0]} material={mats.darkSteel}>
        <boxGeometry args={[0.08, 0.72, 0.7]} />
      </mesh>
      {/* Main chair */}
      <mesh position={[0, 0.45, -0.62]} material={mats.darkSteel}>
        <boxGeometry args={[0.46, 0.08, 0.46]} />
      </mesh>
      <mesh position={[0, 0.72, -0.82]} material={mats.darkSteel}>
        <boxGeometry args={[0.46, 0.48, 0.08]} />
      </mesh>
      {/* Two visitor chairs */}
      {[-0.42, 0.42].map((cx, idx) => (
        <group key={idx} position={[cx, 0, 0.66]}>
          <mesh position={[0, 0.42, 0]} material={mats.sofaFabric}>
            <boxGeometry args={[0.42, 0.08, 0.42]} />
          </mesh>
          <mesh position={[0, 0.65, 0.18]} material={mats.sofaFabric}>
            <boxGeometry args={[0.42, 0.42, 0.07]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Long 6-seat dining table (for 6th Floor Dining Space).
 */
export function DiningTableSet({
  position,
  rotationY = 0,
  mats,
}: {
  position: [number, number, number];
  rotationY?: number;
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.74, 0]} material={mats.timberFurniture} castShadow>
        <boxGeometry args={[2.3, 0.08, 0.95]} />
        <BoxEdges args={[2.3, 0.08, 0.95]} mats={mats} />
      </mesh>
      {[-0.95, 0.95].map((lx, i) => (
        <mesh key={i} position={[lx, 0.37, 0]} material={mats.darkSteel}>
          <boxGeometry args={[0.08, 0.74, 0.78]} />
        </mesh>
      ))}
      {[-0.75, 0, 0.75].map((cx, i) => (
        <group key={i}>
          <mesh position={[cx, 0.42, 0.68]} material={mats.sofaFabric}>
            <boxGeometry args={[0.38, 0.44, 0.38]} />
          </mesh>
          <mesh position={[cx, 0.42, -0.68]} material={mats.sofaFabric}>
            <boxGeometry args={[0.38, 0.44, 0.38]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Circular coffee table with 4 lounge chairs (for GF Waiting Lounge).
 */
export function SofaLoungeCluster({
  position,
  mats,
}: {
  position: [number, number, number];
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.38, 0]} material={mats.whiteFurniture}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 16]} />
      </mesh>
      <mesh position={[0, 0.19, 0]} material={mats.darkSteel}>
        <cylinderGeometry args={[0.12, 0.25, 0.38, 12]} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((ang, idx) => (
        <group
          key={idx}
          position={[Math.cos(ang) * 1.15, 0, Math.sin(ang) * 1.15]}
          rotation={[0, -ang + Math.PI / 2, 0]}
        >
          <mesh position={[0, 0.32, 0]} material={mats.sofaFabric}>
            <boxGeometry args={[0.68, 0.36, 0.65]} />
          </mesh>
          <mesh position={[0, 0.6, 0.24]} material={mats.sofaFabric}>
            <boxGeometry args={[0.68, 0.42, 0.16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * Curved/L-shaped Reception or Nurse Station desk with chairs.
 */
export function ReceptionDeskUnit({
  position,
  mats,
}: {
  position: [number, number, number];
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]} material={mats.plasterTrim} castShadow receiveShadow>
        <boxGeometry args={[0.75, 1.05, 3.8]} />
        <BoxEdges args={[0.75, 1.05, 3.8]} mats={mats} />
      </mesh>
      <mesh position={[-0.45, 0.55, 1.55]} material={mats.plasterTrim} castShadow receiveShadow>
        <boxGeometry args={[1.1, 1.05, 0.7]} />
        <BoxEdges args={[1.1, 1.05, 0.7]} mats={mats} />
      </mesh>
      <mesh position={[0, 1.09, 0]} material={mats.timberFurniture}>
        <boxGeometry args={[0.82, 0.06, 3.85]} />
        <BoxEdges args={[0.82, 0.06, 3.85]} mats={mats} />
      </mesh>
      {[-1.0, 0, 1.0].map((cz, i) => (
        <mesh key={i} position={[0.75, 0.42, cz]} material={mats.darkSteel}>
          <boxGeometry args={[0.42, 0.52, 0.42]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Multi-cubicle toilet zone fixture block.
 */
export function ToiletZoneFixtures({
  position,
  mats,
}: {
  position: [number, number, number];
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      {[-0.9, 0.1, 1.1].map((zOff, i) => (
        <group key={i} position={[0.6, 0, zOff]}>
          <mesh position={[0, 0.95, -0.45]} material={mats.plasterTrim} castShadow>
            <boxGeometry args={[1.4, 1.9, 0.08]} />
            <BoxEdges args={[1.4, 1.9, 0.08]} mats={mats} />
          </mesh>
          <mesh position={[0.4, 0.25, 0]} material={mats.whiteFurniture}>
            <boxGeometry args={[0.52, 0.42, 0.42]} />
            <BoxEdges args={[0.52, 0.42, 0.42]} mats={mats} />
          </mesh>
        </group>
      ))}
      <mesh position={[-1.0, 0.45, 0.2]} material={mats.whiteFurniture}>
        <boxGeometry args={[0.65, 0.85, 2.2]} />
        <BoxEdges args={[0.65, 0.85, 2.2]} mats={mats} />
      </mesh>
    </group>
  );
}

/**
 * Hexagonal Occupational Therapy activity table + 4 chairs.
 */
export function OccupationalTableCluster({
  position,
  mats,
}: {
  position: [number, number, number];
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.68, 0]} material={mats.whiteFurniture} castShadow>
        <cylinderGeometry args={[0.78, 0.78, 0.08, 6]} />
      </mesh>
      <mesh position={[0, 0.34, 0]} material={mats.darkSteel}>
        <cylinderGeometry args={[0.12, 0.22, 0.68, 8]} />
      </mesh>
      {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((a, i) => (
        <mesh
          key={i}
          position={[Math.cos(a) * 1.05, 0.38, Math.sin(a) * 1.05]}
          material={mats.goldHighlight}
        >
          <boxGeometry args={[0.38, 0.42, 0.38]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Compact 4-seat café/dining gallery table (for 6F glazed dining corridor & 1F seating).
 */
export function CafeTableSet({
  position,
  mats,
}: {
  position: [number, number, number];
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.72, 0]} material={mats.timberFurniture} castShadow>
        <boxGeometry args={[1.05, 0.06, 0.85]} />
        <BoxEdges args={[1.05, 0.06, 0.85]} mats={mats} />
      </mesh>
      <mesh position={[0, 0.36, 0]} material={mats.darkSteel}>
        <cylinderGeometry args={[0.08, 0.18, 0.72, 8]} />
      </mesh>
      {[
        [-0.65, 0],
        [0.65, 0],
        [0, -0.58],
        [0, 0.58],
      ].map(([cx, cz], i) => (
        <mesh key={i} position={[cx, 0.4, cz]} material={mats.sofaFabric}>
          <boxGeometry args={[0.34, 0.42, 0.34]} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Gym / Physiotherapy machines cluster (treadmills, bike, cable racks, rehab balls).
 */
export function GymEquipmentCluster({
  position,
  mats,
}: {
  position: [number, number, number];
  mats: DishariMaterialSet;
}) {
  return (
    <group position={position}>
      {/* Two treadmills */}
      {[-1.3, 0.0].map((x, i) => (
        <group key={i} position={[x, 0, -0.7]}>
          <mesh position={[0, 0.14, 0]} material={mats.darkSteel}>
            <boxGeometry args={[0.78, 0.22, 1.75]} />
            <BoxEdges args={[0.78, 0.22, 1.75]} mats={mats} variant="dark" />
          </mesh>
          <mesh position={[0, 0.72, -0.72]} material={mats.darkSteel}>
            <boxGeometry args={[0.72, 1.1, 0.14]} />
            <BoxEdges args={[0.72, 1.1, 0.14]} mats={mats} variant="dark" />
          </mesh>
        </group>
      ))}
      {/* Multi-station strength frame & front cable machines */}
      <group position={[2.1, 0, -0.4]}>
        <mesh position={[0, 0.95, 0]} material={mats.darkSteel}>
          <boxGeometry args={[1.5, 1.9, 0.85]} />
          <BoxEdges args={[1.5, 1.9, 0.85]} mats={mats} variant="dark" />
        </mesh>
      </group>
      {[-1.5, 0.4, 2.0].map((rx, idx) => (
        <mesh key={`rack-${idx}`} position={[rx, 0.85, 1.45]} material={mats.darkSteel}>
          <boxGeometry args={[1.1, 1.7, 0.45]} />
          <BoxEdges args={[1.1, 1.7, 0.45]} mats={mats} variant="dark" />
        </mesh>
      ))}
      {/* Therapy exercise balls */}
      <mesh position={[1.1, 0.38, 0.2]} material={mats.blueRug}>
        <sphereGeometry args={[0.38, 14, 10]} />
      </mesh>
      <mesh position={[-2.5, 0.26, 0.5]} material={mats.foliageLight}>
        <sphereGeometry args={[0.26, 12, 10]} />
      </mesh>
    </group>
  );
}
