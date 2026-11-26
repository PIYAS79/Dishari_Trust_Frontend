"use client";
"use no memo";

import { useMemo } from 'react';
import * as THREE from 'three';
import {
  BUILDING_DIMENSIONS,
  createMainSlabShape,
  FloorId,
  getRearWallAngleRad,
  STRUCTURAL_CORES,
} from '../../utils/geometryHelpers';
import { FloorSpec } from '../../data/dishariArchitecture';
import {
  DishariMaterialSet,
  getDishariMaterials,
  getPlaceholderInteriorMaterials,
} from '../../materials/proceduralMaterials';
import { BoxEdges, CylinderEdges } from './ArchitecturalEdges';
import {
  CafeTableSet,
  CentralFeatureStair,
  CompositeTree,
  DiningTableSet,
  FireStairCore,
  GymEquipmentCluster,
  LiftCoreUnit,
  OccupationalTableCluster,
  OfficeDeskSet,
  PedestrianRampWing,
  PlanterBox,
  ReceptionDeskUnit,
  SofaLoungeCluster,
  StudioBedUnit,
  ToiletZoneFixtures,
} from './ArchitecturalProps';

interface FloorInteriorSceneProps {
  floor: FloorSpec;
}

const WALL_H = 2.65;

function SharedFloorShell({
  mats,
  floorId,
}: {
  mats: DishariMaterialSet;
  floorId: FloorId;
}) {
  const slabGeo = useMemo(() => {
    const shape = createMainSlabShape(0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: false,
      curveSegments: 14,
    });
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const slabEdgeGeo = useMemo(() => new THREE.EdgesGeometry(slabGeo, 25), [slabGeo]);
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);
  const isGF = floorId === 'G';
  const is1F = floorId === '1';
  const hasFullEastWing = !isGF && !is1F;

  return (
    <group>
      {/* Base slab (clean warm light grey #D8D5CC floor surface) */}
      <mesh position={[0, -0.24, 0]} geometry={slabGeo} material={mats.floorTile} receiveShadow>
        <lineSegments geometry={slabEdgeGeo} material={mats.edgeWall} raycast={() => null} />
      </mesh>

      {/* Curved NE Brick Corner Wall (+X, -Z) */}
      <mesh position={[14.0, WALL_H * 0.5, -8.4]} material={mats.brickInterior} castShadow receiveShadow>
        <cylinderGeometry args={[3.0, 3.0, WALL_H, 16, 1, true, 0, Math.PI / 2]} />
        <CylinderEdges args={[3.0, 3.0, WALL_H, 16, 1, true, 0, Math.PI / 2]} mats={mats} />
      </mesh>

      {/* East Perimeter Wall: full length on 2F–6F, rear-only on GF & 1F (where Main Entry / step-back sits) */}
      {hasFullEastWing ? (
        <mesh position={[16.9, WALL_H * 0.5, -0.1]} material={mats.brickInterior} castShadow receiveShadow>
          <boxGeometry args={[0.24, WALL_H, 17.6]} />
          <BoxEdges args={[0.24, WALL_H, 17.6]} mats={mats} />
        </mesh>
      ) : (
        <mesh position={[16.9, WALL_H * 0.5, -5.6]} material={mats.brickInterior} castShadow receiveShadow>
          <boxGeometry args={[0.24, WALL_H, 6.2]} />
          <BoxEdges args={[0.24, WALL_H, 6.2]} mats={mats} />
        </mesh>
      )}

      {/* Shared West Wall */}
      <mesh position={[-16.9, WALL_H * 0.5, 0.9]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.24, WALL_H, 15.8]} />
        <BoxEdges args={[0.24, WALL_H, 15.8]} mats={mats} />
      </mesh>

      {/* Splayed North/Rear Outer Wall (continuous window/sill + red brick structural piers) */}
      <group
        position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5]}
        rotation={[0, rearAngle, 0]}
      >
        {/* Low perimeter sill wall */}
        <mesh position={[-0.6, 0.35, -0.15]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[29.2, 0.7, 0.2]} />
          <BoxEdges args={[29.2, 0.7, 0.2]} mats={mats} />
        </mesh>
        {/* Rear panoramic glazing */}
        <mesh position={[-0.6, 1.55, -0.15]} material={mats.interiorGlass}>
          <boxGeometry args={[28.4, 1.75, 0.08]} />
          <BoxEdges args={[28.4, 1.75, 0.08]} mats={mats} variant="glass" />
        </mesh>
        {/* Red-brick rear structural columns */}
        {[-14.5, -7.2, 0.2, 7.6, 13.4].map((rx, idx) => (
          <mesh key={idx} position={[rx, WALL_H * 0.5, -0.15]} material={mats.brickInterior} castShadow receiveShadow>
            <boxGeometry args={[0.9, WALL_H, 0.42]} />
            <BoxEdges args={[0.9, WALL_H, 0.42]} mats={mats} />
          </mesh>
        ))}
      </group>

      {/* Shared Structural Cores across ALL floors */}
      <LiftCoreUnit
        position={[STRUCTURAL_CORES.leftLift.x, 0, STRUCTURAL_CORES.leftLift.z]}
        width={STRUCTURAL_CORES.leftLift.w}
        depth={STRUCTURAL_CORES.leftLift.d}
        wallHeight={WALL_H}
        doorSide="front"
        mats={mats}
      />
      <LiftCoreUnit
        position={[STRUCTURAL_CORES.frontRightLift.x, 0, STRUCTURAL_CORES.frontRightLift.z]}
        width={STRUCTURAL_CORES.frontRightLift.w}
        depth={STRUCTURAL_CORES.frontRightLift.d}
        wallHeight={WALL_H}
        brickFront={isGF || is1F}
        doorSide="back"
        mats={mats}
      />
      <FireStairCore
        position={[STRUCTURAL_CORES.fireStair.x, 0, STRUCTURAL_CORES.fireStair.z]}
        wallHeight={WALL_H}
        mats={mats}
      />
      <CentralFeatureStair
        position={[STRUCTURAL_CORES.centralStair.x, 0, STRUCTURAL_CORES.centralStair.z]}
        floorHeight={isGF ? 4.0 : 3.3}
        mats={mats}
      />
      <PedestrianRampWing mats={mats} isGroundFloor={isGF} />
    </group>
  );
}

/**
 * GROUND FLOOR INTERIOR (6,175 SFT — Reception, Admin & Security)
 */
function GroundFloorInterior({ mats }: { mats: DishariMaterialSet }) {
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);

  return (
    <group>
      {/* Surrounding Site Context from GF Axonometric Plan */}
      <mesh
        position={[0, -0.28, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={mats.lawnGrass}
        receiveShadow
      >
        <planeGeometry args={[95, 70]} />
      </mesh>
      {/* Paved apron */}
      <mesh position={[0, -0.25, 2]} material={mats.concreteRamp} receiveShadow>
        <boxGeometry args={[46, 0.04, 26]} />
      </mesh>
      {/* Front two-lane asphalt road */}
      <mesh position={[0, -0.22, 16.5]} material={mats.asphaltRoad} receiveShadow>
        <boxGeometry args={[86, 0.06, 7.6]} />
      </mesh>
      {/* Angled left side road */}
      <mesh
        position={[-26, -0.23, 9]}
        rotation={[0, 0.68, 0]}
        material={mats.asphaltRoad}
        receiveShadow
      >
        <boxGeometry args={[6.4, 0.06, 28]} />
      </mesh>
      {/* Front planter strip & 4 brick piers */}
      <PlanterBox position={[-4.5, -0.2, 10.7]} width={21.5} depth={0.95} height={0.55} brick mats={mats} />
      {[-15.4, -4.5, 5.2, 14.8].map((px, i) => (
        <mesh key={i} position={[px, 1.35, 10.7]} material={mats.brickExterior} castShadow>
          <boxGeometry args={[0.75, 3.1, 0.75]} />
        </mesh>
      ))}
      {/* Main Entry Steps (12) on front-right + Red brick wing wall below Fire Stair */}
      {[0, 1, 2, 3, 4].map((s) => (
        <mesh key={s} position={[12.0, -0.18 + s * 0.06, 10.4 - s * 0.48]} material={mats.concreteRamp} receiveShadow>
          <boxGeometry args={[4.6, 0.12, 0.5]} />
          <BoxEdges args={[4.6, 0.12, 0.5]} mats={mats} />
        </mesh>
      ))}
      <mesh position={[12.6, 1.2, 2.2]} material={mats.brickInterior} castShadow receiveShadow>
        <boxGeometry args={[4.6, 2.4, 0.45]} />
        <BoxEdges args={[4.6, 2.4, 0.45]} mats={mats} />
      </mesh>

      {/* Vehicular Ramp Entry (14) sweeping along East flank */}
      <mesh position={[19.8, -0.22, 2.5]} material={mats.concreteRamp} receiveShadow>
        <boxGeometry args={[5.4, 0.06, 19.0]} />
      </mesh>
      <CompositeTree position={[22.8, -0.2, 4.5]} scale={1.0} mats={mats} />
      <CompositeTree position={[22.6, -0.2, -3.8]} scale={0.95} mats={mats} />
      <CompositeTree position={[-12, -0.2, -11.5]} scale={1.05} mats={mats} />

      {/* Front Glazing Walls & 13 Secondary Entry Vestibule */}
      <mesh position={[-3.2, 1.3, 8.85]} material={mats.interiorGlass}>
        <boxGeometry args={[17.2, 2.6, 0.1]} />
        <BoxEdges args={[17.2, 2.6, 0.1]} mats={mats} variant="glass" />
      </mesh>
      <mesh position={[-13.8, 1.3, 8.4]} material={mats.interiorGlass}>
        <boxGeometry args={[3.4, 2.6, 0.1]} />
        <BoxEdges args={[3.4, 2.6, 0.1]} mats={mats} variant="glass" />
      </mesh>
      {/* Curved brick pier at Secondary Entry (13) */}
      <mesh position={[-13.2, 1.1, 9.6]} material={mats.brickInterior} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 2.2, 14]} />
      </mesh>

      {/* Partition alcove separating 03 Waiting Lounge & 02 Information */}
      <mesh position={[-3.6, 1.25, 6.8]} material={mats.plasterTrim} castShadow receiveShadow>
        <boxGeometry args={[0.35, 2.5, 2.8]} />
        <BoxEdges args={[0.35, 2.5, 2.8]} mats={mats} />
      </mesh>

      {/* 01 RECEPTION (Clear of Fire Stair wall) */}
      <ReceptionDeskUnit position={[7.4, 0, -0.5]} mats={mats} />

      {/* 02 INFORMATION (Long linear front-right counter with 5 chairs) */}
      <group position={[1.2, 0, 7.4]}>
        <mesh position={[0, 0.55, 0]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[7.4, 1.05, 0.72]} />
          <BoxEdges args={[7.4, 1.05, 0.72]} mats={mats} />
        </mesh>
        <mesh position={[0, 1.1, 0]} material={mats.timberFurniture}>
          <boxGeometry args={[7.45, 0.06, 0.8]} />
          <BoxEdges args={[7.45, 0.06, 0.8]} mats={mats} />
        </mesh>
        {[-2.4, -1.2, 0, 1.2, 2.4].map((cx, i) => (
          <mesh key={i} position={[cx, 0.42, 0.72]} material={mats.darkSteel}>
            <boxGeometry args={[0.42, 0.5, 0.42]} />
          </mesh>
        ))}
      </group>

      {/* 03 WAITING LOUNGE (3 lounge seating clusters) */}
      <SofaLoungeCluster position={[-10.4, 0, 6.4]} mats={mats} />
      <SofaLoungeCluster position={[-7.6, 0, 6.4]} mats={mats} />
      <SofaLoungeCluster position={[-5.1, 0, 6.4]} mats={mats} />

      {/* REAR ADMIN & MEDICAL WING (04, 05, 06, green-outlined office, 07) */}
      <group
        position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5 + 2.4]}
        rotation={[0, rearAngle, 0]}
      >
        {/* Corridor partition wall along front of rear rooms */}
        <mesh position={[-1.0, WALL_H * 0.5, 2.4]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[23.5, WALL_H, 0.18]} />
          <BoxEdges args={[23.5, WALL_H, 0.18]} mats={mats} />
        </mesh>
        {/* Secondary cross-walls dividing 04 | 05 | 06 | green-bay | 07 */}
        {[-12.2, -5.8, -0.2, 4.4, 8.2, 12.2].map((wx, i) => (
          <mesh
            key={i}
            position={[wx, WALL_H * 0.5, 0]}
            material={i === 0 || i === 5 ? mats.plasterWall : mats.plasterTrim}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.18, WALL_H, 4.8]} />
            <BoxEdges args={[0.18, WALL_H, 4.8]} mats={mats} />
          </mesh>
        ))}
        {/* Wood floors inside office/medical rooms */}
        <mesh position={[0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[24.2, 0.03, 4.6]} />
        </mesh>

        {/* 04 FAST-AID & ISOLATION ROOM (desk left + glass screen + 2 beds right) */}
        <OfficeDeskSet position={[-10.4, 0.03, 0.2]} mats={mats} />
        <mesh position={[-8.8, WALL_H * 0.45, 0]} material={mats.interiorGlass}>
          <boxGeometry args={[0.08, WALL_H * 0.88, 3.8]} />
          <BoxEdges args={[0.08, WALL_H * 0.88, 3.8]} mats={mats} variant="glass" />
        </mesh>
        <StudioBedUnit position={[-7.2, 0.03, -0.85]} rotationY={Math.PI / 2} mats={mats} />
        <StudioBedUnit position={[-7.2, 0.03, 0.85]} rotationY={Math.PI / 2} mats={mats} />

        {/* 05 PRINCIPAL ROOM + small private anteroom */}
        <OfficeDeskSet position={[-3.3, 0.03, 0]} mats={mats} />
        <mesh position={[-1.2, WALL_H * 0.45, -1.2]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[1.6, WALL_H * 0.9, 2.0]} />
          <BoxEdges args={[1.6, WALL_H * 0.9, 2.0]} mats={mats} />
        </mesh>

        {/* 06 ACCOUNTS SECTION (2 office desks matching red-outlined bay) */}
        <OfficeDeskSet position={[1.4, 0.03, -0.3]} mats={mats} />
        <OfficeDeskSet position={[3.2, 0.03, 0.4]} mats={mats} />

        {/* Adjacent green-outlined office + 07 CCTV & SECURITY CONTROL ROOM */}
        <OfficeDeskSet position={[6.2, 0.03, -0.2]} mats={mats} />
        <group position={[10.2, 0.03, 0]}>
          <mesh position={[0, 0.52, -0.6]} material={mats.timberFurniture} castShadow>
            <boxGeometry args={[3.2, 0.95, 0.7]} />
            <BoxEdges args={[3.2, 0.95, 0.7]} mats={mats} />
          </mesh>
          <mesh position={[0, 0.42, 0.3]} material={mats.darkSteel}>
            <boxGeometry args={[0.45, 0.5, 0.45]} />
          </mesh>
        </group>
      </group>

      {/* 08 TOILET ZONE (Enclosed inside Curved NE brick corner) */}
      <mesh position={[14.5, 0.02, -8.0]} material={mats.roomFloor} receiveShadow>
        <boxGeometry args={[3.3, 0.03, 3.0]} />
      </mesh>
      <mesh position={[12.8, WALL_H * 0.5, -8.5]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.18, WALL_H, 4.2]} />
        <BoxEdges args={[0.18, WALL_H, 4.2]} mats={mats} />
      </mesh>
      <mesh position={[14.7, WALL_H * 0.5, -6.5]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[4.0, WALL_H, 0.18]} />
        <BoxEdges args={[4.0, WALL_H, 0.18]} mats={mats} />
      </mesh>
      <ToiletZoneFixtures position={[14.3, 0, -8.5]} mats={mats} />
    </group>
  );
}

/**
 * FIRST FLOOR INTERIOR (5,960 SFT — Medical Support & Counseling)
 */
function FirstFloorInterior({ mats }: { mats: DishariMaterialSet }) {
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);

  return (
    <group>
      {/* East step-back brick enclosure along 12 Lift & 13 Fire Stair (matching 5,960 SFT footprint) */}
      <mesh position={[9.4, WALL_H * 0.5, 5.1]} material={mats.brickInterior} castShadow receiveShadow>
        <boxGeometry args={[0.24, WALL_H, 3.2]} />
        <BoxEdges args={[0.24, WALL_H, 3.2]} mats={mats} />
      </mesh>
      <mesh position={[13.0, WALL_H * 0.5, -2.0]} material={mats.brickInterior} castShadow receiveShadow>
        <boxGeometry args={[0.24, WALL_H, 4.4]} />
        <BoxEdges args={[0.24, WALL_H, 4.4]} mats={mats} />
      </mesh>

      {/* 01 NURSE STATION */}
      <ReceptionDeskUnit position={[7.4, 0, -0.5]} mats={mats} />

      {/* 03 WAITING LOUNGE (Long bench + 4 chairs in central atrium corridor in front of Pharmacy) */}
      <group position={[1.4, 0, -1.6]} rotation={[0, rearAngle, 0]}>
        <mesh position={[0, 0.45, 0]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[4.4, 0.78, 0.72]} />
          <BoxEdges args={[4.4, 0.78, 0.72]} mats={mats} />
        </mesh>
        {[-1.5, -0.5, 0.5, 1.5].map((cx, i) => (
          <mesh key={i} position={[cx, 0.42, 0.75]} material={mats.sofaFabric}>
            <boxGeometry args={[0.42, 0.52, 0.42]} />
          </mesh>
        ))}
      </group>

      {/* Front-Left & Front-Center Clinical Rooms (04 & 05) sharing partition at X = -5.0 */}
      {/* 04 EMERGENCY FIRST-AID & PATIENT MONITORING (red-outlined bay) */}
      <group position={[-8.6, 0, 6.4]}>
        <mesh position={[0, 0.02, 0]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[7.2, 0.03, 4.4]} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[7.2, WALL_H, 0.1]} />
          <BoxEdges args={[7.2, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -2.2]} material={mats.interiorGlass}>
          <boxGeometry args={[7.2, WALL_H, 0.1]} />
          <BoxEdges args={[7.2, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[-3.6, WALL_H * 0.5, 0]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[0.18, WALL_H, 4.6]} />
          <BoxEdges args={[0.18, WALL_H, 4.6]} mats={mats} />
        </mesh>
        <mesh position={[3.6, WALL_H * 0.5, 0]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[0.18, WALL_H, 4.6]} />
          <BoxEdges args={[0.18, WALL_H, 4.6]} mats={mats} />
        </mesh>
        <StudioBedUnit position={[-2.0, 0.03, 0]} rotationY={Math.PI / 2} mats={mats} />
        <OfficeDeskSet position={[1.6, 0.03, 0.2]} mats={mats} />
      </group>

      {/* 05 INDIVIDUAL COUNSELING ROOM */}
      <group position={[-0.3, 0, 6.4]}>
        <mesh position={[0, 0.02, 0]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[9.2, 0.03, 4.4]} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[9.4, WALL_H, 0.1]} />
          <BoxEdges args={[9.4, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -2.2]} material={mats.interiorGlass}>
          <boxGeometry args={[9.4, WALL_H, 0.1]} />
          <BoxEdges args={[9.4, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[4.7, WALL_H * 0.5, 0]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[0.18, WALL_H, 4.6]} />
          <BoxEdges args={[0.18, WALL_H, 4.6]} mats={mats} />
        </mesh>
        <StudioBedUnit position={[-2.4, 0.03, 0.1]} rotationY={Math.PI / 2} mats={mats} />
        <OfficeDeskSet position={[2.2, 0.03, 0.2]} mats={mats} />
      </group>

      {/* Rear Medical & Therapy Suite (06 Dental, 07 EEG, 08 Minor Procedure, 02 Pharmacy, 09 Therapy, 10 Storage) */}
      <group
        position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5 + 2.4]}
        rotation={[0, rearAngle, 0]}
      >
        <mesh position={[0, WALL_H * 0.5, 2.4]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[26.2, WALL_H, 0.18]} />
          <BoxEdges args={[26.2, WALL_H, 0.18]} mats={mats} />
        </mesh>
        {[-12.0, -8.1, -4.1, -0.3, 3.8, 10.2, 13.4].map((wx, i) => (
          <mesh
            key={i}
            position={[wx, WALL_H * 0.5, 0]}
            material={i === 0 || i === 6 ? mats.plasterWall : mats.plasterTrim}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.18, WALL_H, 4.8]} />
            <BoxEdges args={[0.18, WALL_H, 4.8]} mats={mats} />
          </mesh>
        ))}

        {/* Clinical wood floor inside 06 Dental, 07 EEG, 08 Minor Procedure & 09 Therapy (per Slide 20) */}
        <mesh position={[-6.15, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[11.6, 0.03, 4.5]} />
        </mesh>
        <mesh position={[7.0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[6.2, 0.03, 4.5]} />
        </mesh>
        {/* Distinct Room Floor (#D2CFC7) for 02 Pharmacy & 10 Storage */}
        <mesh position={[1.75, 0.02, 0]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[3.9, 0.03, 4.5]} />
        </mesh>
        <mesh position={[11.8, 0.02, 0]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[3.0, 0.03, 4.5]} />
        </mesh>

        {/* 06 DENTAL CARE ROOM */}
        <group position={[-10.0, 0.03, 0]}>
          <mesh position={[0, 0.45, 0]} material={mats.whiteFurniture} castShadow>
            <boxGeometry args={[0.75, 0.5, 1.8]} />
            <BoxEdges args={[0.75, 0.5, 1.8]} mats={mats} />
          </mesh>
          <mesh position={[0.7, 0.35, -0.3]} material={mats.darkSteel}>
            <cylinderGeometry args={[0.25, 0.25, 0.5, 10]} />
          </mesh>
          <PlanterBox position={[0, 0, -2.0]} width={2.8} depth={0.45} height={0.35} brick mats={mats} />
        </group>

        {/* 07 EEG ROOM */}
        <group position={[-6.1, 0.03, 0]}>
          <StudioBedUnit position={[-0.85, 0, -0.15]} mats={mats} />
          <StudioBedUnit position={[0.85, 0, -0.15]} mats={mats} />
          <PlanterBox position={[0, 0, -2.0]} width={2.8} depth={0.45} height={0.35} brick mats={mats} />
        </group>

        {/* 08 MINOR PROCEDURE ROOM */}
        <group position={[-2.2, 0.03, 0]}>
          <StudioBedUnit position={[-0.3, 0, -0.5]} rotationY={Math.PI / 2} mats={mats} />
          <PlanterBox position={[0, 0, -2.0]} width={2.6} depth={0.45} height={0.35} brick mats={mats} />
        </group>

        {/* 02 PHARMACY (Dispensary with rear lightwell & front service counter) */}
        <group position={[1.8, 0.03, 0]}>
          <mesh position={[0, WALL_H * 0.45, -0.6]} material={mats.plasterTrim} castShadow receiveShadow>
            <boxGeometry args={[3.8, WALL_H * 0.9, 0.16]} />
            <BoxEdges args={[3.8, WALL_H * 0.9, 0.16]} mats={mats} />
          </mesh>
          <mesh position={[0, 0.55, 1.4]} material={mats.whiteFurniture} castShadow>
            <boxGeometry args={[3.2, 0.9, 0.65]} />
            <BoxEdges args={[3.2, 0.9, 0.65]} mats={mats} />
          </mesh>
          <PlanterBox position={[0, 0, -1.9]} width={3.2} depth={0.55} height={0.4} brick mats={mats} />
        </group>

        {/* 09 THERAPY ROOM (2 beanbags, zigzag wooden therapy table, planted balcony) */}
        <group position={[7.0, 0.03, 0]}>
          <mesh position={[0, 0.35, 0.6]} rotation={[0, 0.25, 0]} material={mats.timberFurniture} castShadow>
            <boxGeometry args={[3.4, 0.65, 0.85]} />
            <BoxEdges args={[3.4, 0.65, 0.85]} mats={mats} />
          </mesh>
          <mesh position={[-1.5, 0.3, -0.8]} material={mats.whiteFurniture}>
            <sphereGeometry args={[0.45, 12, 10]} />
          </mesh>
          <mesh position={[1.4, 0.3, -0.7]} material={mats.whiteFurniture}>
            <sphereGeometry args={[0.45, 12, 10]} />
          </mesh>
          <PlanterBox position={[0, 0, -2.0]} width={5.2} depth={0.5} height={0.38} brick mats={mats} />
        </group>

        {/* 10 STORAGE AREA */}
        <mesh position={[11.8, 0.9, -0.6]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[2.2, 1.8, 1.4]} />
          <BoxEdges args={[2.2, 1.8, 1.4]} mats={mats} />
        </mesh>
      </group>

      {/* 02 Secondary Pharmacy Alcove right of Fire Stair (matching ref label 02 on east) */}
      <group position={[14.3, 0, -4.6]}>
        <OfficeDeskSet position={[0, 0.02, 0]} rotationY={-Math.PI / 2} mats={mats} />
      </group>

      {/* 11 TOILET ZONE (Enclosed inside NE curved corner) */}
      <mesh position={[14.5, 0.02, -8.0]} material={mats.roomFloor} receiveShadow>
        <boxGeometry args={[3.3, 0.03, 3.0]} />
      </mesh>
      <mesh position={[12.8, WALL_H * 0.5, -8.5]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.18, WALL_H, 4.2]} />
        <BoxEdges args={[0.18, WALL_H, 4.2]} mats={mats} />
      </mesh>
      <mesh position={[14.7, WALL_H * 0.5, -6.5]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[4.0, WALL_H, 0.18]} />
        <BoxEdges args={[4.0, WALL_H, 0.18]} mats={mats} />
      </mesh>
      <ToiletZoneFixtures position={[14.3, 0, -8.5]} mats={mats} />
    </group>
  );
}

/**
 * SECOND FLOOR INTERIOR (8,100 SFT — 11x Studio Beds, 2x Staff Beds, Play Zone)
 */
function SecondFloorInterior({ mats }: { mats: DishariMaterialSet }) {
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);

  // 4 Front-Left Studios + 5th Front-Right Studio reaching East Brick Wall
  const frontLeftStudiosX = [-14.2, -10.0, -5.8, -1.6];
  // 3 Rear-Left Studios & 3 Rear-Right Studios leaving generous 5.2m wide center Play Zone (05)
  const rearLeftStudiosX = [-10.2, -6.6, -3.0];
  const rearRightStudiosX = [5.8, 9.4, 13.0];

  return (
    <group>
      {/* Continuous Front Balcony Brick Planter Strip */}
      <PlanterBox position={[-4.5, 0, 8.75]} width={22.2} depth={0.52} height={0.36} brick mats={mats} />
      <PlanterBox position={[13.0, 0, 8.75]} width={6.8} depth={0.52} height={0.36} brick mats={mats} />

      {/* 4 FRONT-LEFT STUDIO BEDS (01) + Ensuite TOILETS (07) + VERANDAS (02) */}
      {frontLeftStudiosX.map((sx, idx) => (
        <group key={`fs-${idx}`} position={[sx, 0, 6.2]}>
          <mesh position={[0, 0.02, -0.4]} material={mats.woodFloor} receiveShadow>
            <boxGeometry args={[3.9, 0.03, 3.8]} />
          </mesh>
          {/* Distinct ensuite toilet floor pad (#D2CFC7) */}
          <mesh position={[1.0, 0.03, 1.1]} material={mats.roomFloor} receiveShadow>
            <boxGeometry args={[1.6, 0.02, 1.3]} />
          </mesh>
          <mesh
            position={[-1.98, WALL_H * 0.5, -0.2]}
            material={idx === 0 ? mats.plasterWall : mats.plasterTrim}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.15, WALL_H, 4.4]} />
            <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
          </mesh>
          <mesh position={[1.98, WALL_H * 0.5, -0.2]} material={mats.plasterTrim} castShadow receiveShadow>
            <boxGeometry args={[0.15, WALL_H, 4.4]} />
            <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
          </mesh>
          <mesh position={[0, WALL_H * 0.5, -2.35]} material={mats.plasterWall} castShadow receiveShadow>
            <boxGeometry args={[4.0, WALL_H, 0.16]} />
            <BoxEdges args={[4.0, WALL_H, 0.16]} mats={mats} />
          </mesh>
          <mesh position={[1.0, WALL_H * 0.45, 1.1]} material={mats.plasterTrim} castShadow receiveShadow>
            <boxGeometry args={[1.6, WALL_H * 0.9, 1.3]} />
            <BoxEdges args={[1.6, WALL_H * 0.9, 1.3]} mats={mats} />
          </mesh>
          <mesh position={[-0.9, WALL_H * 0.45, 1.85]} material={mats.interiorGlass}>
            <boxGeometry args={[1.9, WALL_H * 0.85, 0.08]} />
            <BoxEdges args={[1.9, WALL_H * 0.85, 0.08]} mats={mats} variant="glass" />
          </mesh>
          <StudioBedUnit position={[-0.7, 0.03, -0.8]} rotationY={Math.PI / 2} mats={mats} />
        </group>
      ))}

      {/* 5th FRONT-RIGHT STUDIO BED (01) reaching cleanly to the East Brick Wall (X = 16.9) */}
      <group position={[13.2, 0, 6.2]}>
        <mesh position={[0, 0.02, -0.4]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[6.6, 0.03, 3.8]} />
        </mesh>
        <mesh position={[-1.8, 0.03, 1.1]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[2.0, 0.02, 1.3]} />
        </mesh>
        <mesh position={[-3.3, WALL_H * 0.5, -0.2]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[0.15, WALL_H, 4.4]} />
          <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -2.35]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[6.8, WALL_H, 0.16]} />
          <BoxEdges args={[6.8, WALL_H, 0.16]} mats={mats} />
        </mesh>
        <mesh position={[-1.8, WALL_H * 0.45, 1.1]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[2.0, WALL_H * 0.9, 1.3]} />
          <BoxEdges args={[2.0, WALL_H * 0.9, 1.3]} mats={mats} />
        </mesh>
        <mesh position={[1.2, WALL_H * 0.45, 1.85]} material={mats.interiorGlass}>
          <boxGeometry args={[2.8, WALL_H * 0.85, 0.08]} />
          <BoxEdges args={[2.8, WALL_H * 0.85, 0.08]} mats={mats} variant="glass" />
        </mesh>
        <StudioBedUnit position={[0.4, 0.03, -0.8]} rotationY={Math.PI / 2} mats={mats} />
      </group>

      {/* 06 AC OUTDOOR bay in front of Front-Right Lift */}
      <group position={[7.4, 0, 7.6]}>
        <mesh position={[0, 0.02, 0]} material={mats.concreteRamp} receiveShadow>
          <boxGeometry args={[3.5, 0.03, 2.2]} />
        </mesh>
        <mesh position={[-0.8, 0.45, 0.3]} material={mats.whiteFurniture} castShadow>
          <boxGeometry args={[0.9, 0.85, 0.45]} />
          <BoxEdges args={[0.9, 0.85, 0.45]} mats={mats} />
        </mesh>
        <mesh position={[0.8, 0.45, 0.3]} material={mats.whiteFurniture} castShadow>
          <boxGeometry args={[0.9, 0.85, 0.45]} />
          <BoxEdges args={[0.9, 0.85, 0.45]} mats={mats} />
        </mesh>
      </group>

      {/* REAR WING: 3 Rear-Left Studios + Wide 05 Play Zone + 3 Rear-Right Studios */}
      <group
        position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5 + 2.4]}
        rotation={[0, rearAngle, 0]}
      >
        {rearLeftStudiosX.map((rx, idx) => (
          <group key={`rls-${idx}`} position={[rx, 0, 0]}>
            <mesh position={[0, 0.02, 0.4]} material={mats.woodFloor} receiveShadow>
              <boxGeometry args={[3.4, 0.03, 3.6]} />
            </mesh>
            <mesh position={[0.8, 0.03, -1.2]} material={mats.roomFloor} receiveShadow>
              <boxGeometry args={[1.4, 0.02, 1.2]} />
            </mesh>
            <mesh
              position={[-1.72, WALL_H * 0.5, 0.2]}
              material={idx === 0 ? mats.plasterWall : mats.plasterTrim}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.15, WALL_H, 4.4]} />
              <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
            </mesh>
            <mesh
              position={[1.72, WALL_H * 0.5, 0.2]}
              material={idx === 2 ? mats.plasterWall : mats.plasterTrim}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.15, WALL_H, 4.4]} />
              <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
            </mesh>
            <mesh position={[0, WALL_H * 0.5, 2.4]} material={mats.plasterWall} castShadow receiveShadow>
              <boxGeometry args={[3.55, WALL_H, 0.16]} />
              <BoxEdges args={[3.55, WALL_H, 0.16]} mats={mats} />
            </mesh>
            <mesh position={[0.8, WALL_H * 0.45, -1.2]} material={mats.plasterTrim} castShadow receiveShadow>
              <boxGeometry args={[1.4, WALL_H * 0.9, 1.2]} />
              <BoxEdges args={[1.4, WALL_H * 0.9, 1.2]} mats={mats} />
            </mesh>
            <PlanterBox position={[-0.7, 0, -2.0]} width={1.6} depth={0.42} height={0.34} brick mats={mats} />
            <StudioBedUnit position={[-0.45, 0.03, 0.8]} rotationY={-Math.PI / 2} mats={mats} />
          </group>
        ))}

        {/* 05 PLAY ZONE (28'-8" x 20'-0" Open Terrace with circular blue rug, seating & green rear screen) */}
        <group position={[1.4, 0, 0.2]}>
          <mesh position={[0.4, 0.03, -0.3]} material={mats.blueRug} receiveShadow>
            <cylinderGeometry args={[1.45, 1.45, 0.03, 24]} />
          </mesh>
          <mesh position={[0.4, 0.28, -0.3]} material={mats.brickInterior}>
            <cylinderGeometry args={[0.48, 0.48, 0.42, 16]} />
          </mesh>
          <mesh position={[-1.5, 0.28, 0.6]} material={mats.goldHighlight}>
            <cylinderGeometry args={[0.35, 0.35, 0.4, 14]} />
          </mesh>
          {/* Low seating divider */}
          <mesh position={[-0.6, 0.45, 1.4]} material={mats.whiteFurniture} castShadow>
            <boxGeometry args={[1.6, 0.85, 0.45]} />
            <BoxEdges args={[1.6, 0.85, 0.45]} mats={mats} />
          </mesh>
          {/* Green slatted rear screen */}
          <mesh position={[0, 0.6, -2.2]} material={mats.foliageDark} castShadow>
            <boxGeometry args={[4.8, 1.05, 0.14]} />
          </mesh>
        </group>

        {rearRightStudiosX.map((rx, idx) => (
          <group key={`rrs-${idx}`} position={[rx, 0, 0]}>
            <mesh position={[0, 0.02, 0.4]} material={mats.woodFloor} receiveShadow>
              <boxGeometry args={[3.4, 0.03, 3.6]} />
            </mesh>
            <mesh position={[0.8, 0.03, -1.2]} material={mats.roomFloor} receiveShadow>
              <boxGeometry args={[1.4, 0.02, 1.2]} />
            </mesh>
            <mesh
              position={[-1.72, WALL_H * 0.5, 0.2]}
              material={idx === 0 ? mats.plasterWall : mats.plasterTrim}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.15, WALL_H, 4.4]} />
              <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
            </mesh>
            <mesh
              position={[1.72, WALL_H * 0.5, 0.2]}
              material={idx === 2 ? mats.plasterWall : mats.plasterTrim}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.15, WALL_H, 4.4]} />
              <BoxEdges args={[0.15, WALL_H, 4.4]} mats={mats} />
            </mesh>
            <mesh position={[0, WALL_H * 0.5, 2.4]} material={mats.plasterWall} castShadow receiveShadow>
              <boxGeometry args={[3.55, WALL_H, 0.16]} />
              <BoxEdges args={[3.55, WALL_H, 0.16]} mats={mats} />
            </mesh>
            <mesh position={[0.8, WALL_H * 0.45, -1.2]} material={mats.plasterTrim} castShadow receiveShadow>
              <boxGeometry args={[1.4, WALL_H * 0.9, 1.2]} />
              <BoxEdges args={[1.4, WALL_H * 0.9, 1.2]} mats={mats} />
            </mesh>
            <PlanterBox position={[-0.7, 0, -2.0]} width={1.6} depth={0.42} height={0.34} brick mats={mats} />
            <StudioBedUnit position={[-0.45, 0.03, 0.8]} rotationY={-Math.PI / 2} mats={mats} />
          </group>
        ))}
      </group>

      {/* 04 NURSE STATION (Clear of Fire Stair wall) */}
      <ReceptionDeskUnit position={[7.4, 0, -0.5]} mats={mats} />

      {/* 03 STAFF BEDS (2 NOS) along East Wing with Curved Partition & Ensuite Toilets (07) */}
      <group position={[14.8, 0, -6.2]}>
        <mesh position={[0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[3.8, 0.03, 4.0]} />
        </mesh>
        {/* Curved signature partition wall matching 2nd Floor reference */}
        <mesh position={[-1.4, WALL_H * 0.5, 0.8]} material={mats.plasterTrim} castShadow receiveShadow>
          <cylinderGeometry args={[2.0, 2.0, WALL_H, 16, 1, true, Math.PI * 0.5, Math.PI * 0.7]} />
          <CylinderEdges
            args={[2.0, 2.0, WALL_H, 16, 1, true, Math.PI * 0.5, Math.PI * 0.7]}
            mats={mats}
          />
        </mesh>
        <StudioBedUnit position={[0.2, 0.03, -0.3]} rotationY={-Math.PI / 2} mats={mats} />
      </group>
      {/* Staff Ensuite Toilets (07) */}
      <mesh position={[14.8, 0.02, -2.6]} material={mats.roomFloor} receiveShadow>
        <boxGeometry args={[3.6, 0.03, 3.0]} />
      </mesh>
      <ToiletZoneFixtures position={[14.8, 0, -2.6]} mats={mats} />

      <group position={[14.8, 0, 1.2]}>
        <mesh position={[0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[3.8, 0.03, 3.2]} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -1.6]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[3.8, WALL_H, 0.16]} />
          <BoxEdges args={[3.8, WALL_H, 0.16]} mats={mats} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 1.6]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[3.8, WALL_H, 0.16]} />
          <BoxEdges args={[3.8, WALL_H, 0.16]} mats={mats} />
        </mesh>
        <StudioBedUnit position={[0.2, 0.03, 0]} rotationY={-Math.PI / 2} mats={mats} />
      </group>
    </group>
  );
}

/**
 * SIXTH FLOOR INTERIOR (8,100 SFT — Dining 120P, Kitchen, Sensory, Occupational, Gym)
 */
function SixthFloorInterior({ mats }: { mats: DishariMaterialSet }) {
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);

  return (
    <group>
      {/* Front Continuous Brick Balcony Planter */}
      <PlanterBox position={[-4.0, 0, 8.75]} width={22.5} depth={0.5} height={0.35} brick mats={mats} />
      <PlanterBox position={[12.5, 0, 8.75]} width={7.2} depth={0.5} height={0.35} brick mats={mats} />

      {/* 13 RECEPTION (Clear of Fire Stair wall) */}
      <ReceptionDeskUnit position={[7.4, 0, -0.5]} mats={mats} />

      {/* 03 SENSORY INTEGRATION THERAPY (Front-Left Glazed Room) */}
      <group position={[-10.2, 0, 6.2]}>
        <mesh position={[0, 0.02, 0]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[10.4, 0.03, 4.5]} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[10.5, WALL_H, 0.1]} />
          <BoxEdges args={[10.5, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[10.5, WALL_H, 0.1]} />
          <BoxEdges args={[10.5, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[5.25, WALL_H * 0.5, 0]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[0.18, WALL_H, 4.6]} />
          <BoxEdges args={[0.18, WALL_H, 4.6]} mats={mats} />
        </mesh>
        {/* Colorful alphanumeric sensory play mat */}
        <mesh position={[0, 0.04, 0.1]} rotation={[-Math.PI / 2, 0, 0]} material={mats.sensoryMat} receiveShadow>
          <planeGeometry args={[6.8, 3.6]} />
        </mesh>
        {/* 3 Sensory therapy balls + cubby shelf */}
        <mesh position={[-3.6, 0.38, -0.8]} material={mats.foliageLight}>
          <sphereGeometry args={[0.38, 14, 12]} />
        </mesh>
        <mesh position={[-2.6, 0.34, -1.1]} material={mats.blueRug}>
          <sphereGeometry args={[0.34, 14, 12]} />
        </mesh>
        <mesh position={[-4.2, 0.3, -1.3]} material={mats.brickInterior}>
          <sphereGeometry args={[0.3, 12, 10]} />
        </mesh>
        <mesh position={[4.6, 0.55, 0.2]} material={mats.timberFurniture} castShadow>
          <boxGeometry args={[0.55, 1.1, 2.2]} />
          <BoxEdges args={[0.55, 1.1, 2.2]} mats={mats} />
        </mesh>
      </group>

      {/* 04 OCCUPATIONAL THERAPY (Front-Center Glazed Room) */}
      <group position={[-0.2, 0, 6.2]}>
        <mesh position={[0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[9.2, 0.03, 4.5]} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[9.2, WALL_H, 0.1]} />
          <BoxEdges args={[9.2, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[9.2, WALL_H, 0.1]} />
          <BoxEdges args={[9.2, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[4.6, WALL_H * 0.5, 0]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[0.18, WALL_H, 4.6]} />
          <BoxEdges args={[0.18, WALL_H, 4.6]} mats={mats} />
        </mesh>
        {/* Timber cubbies along left partition */}
        <mesh position={[-4.1, 0.55, 0]} material={mats.timberFurniture} castShadow>
          <boxGeometry args={[0.55, 1.1, 3.4]} />
          <BoxEdges args={[0.55, 1.1, 3.4]} mats={mats} />
        </mesh>
        {/* Central blue rug + 4 octagonal tables */}
        <mesh position={[0, 0.04, 0]} material={mats.blueRug} receiveShadow>
          <boxGeometry args={[3.6, 0.02, 2.4]} />
        </mesh>
        <OccupationalTableCluster position={[-2.2, 0.04, -0.8]} mats={mats} />
        <OccupationalTableCluster position={[2.2, 0.04, -0.8]} mats={mats} />
        <OccupationalTableCluster position={[-2.2, 0.04, 1.0]} mats={mats} />
        <OccupationalTableCluster position={[2.2, 0.04, 1.0]} mats={mats} />
      </group>

      {/* 05 PHYSIOTHERAPY / GYM MODERN EQUIPPED ZONE (L-shaped around 10 Lift to East Wall) */}
      <group position={[11.2, 0, 6.2]}>
        <mesh position={[0, 0.02, 0]} material={mats.gymRubber} receiveShadow>
          <boxGeometry args={[10.8, 0.03, 4.6]} />
        </mesh>
        <mesh position={[-3.2, WALL_H * 0.5, -2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[4.4, WALL_H, 0.1]} />
          <BoxEdges args={[4.4, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[2.6, WALL_H * 0.5, -2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[5.6, WALL_H, 0.1]} />
          <BoxEdges args={[5.6, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 2.3]} material={mats.interiorGlass}>
          <boxGeometry args={[10.8, WALL_H, 0.1]} />
          <BoxEdges args={[10.8, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        <GymEquipmentCluster position={[1.4, 0.04, 0]} mats={mats} />
      </group>

      {/* 06 AC OUTDOOR (Red-outlined square on ref) & 07 SERVICE AREA (with curved north wall) */}
      <group position={[14.7, 0, -1.8]}>
        <mesh position={[0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[3.8, 0.03, 3.4]} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, 1.7]} material={mats.plasterWall} castShadow receiveShadow>
          <boxGeometry args={[3.8, WALL_H, 0.16]} />
          <BoxEdges args={[3.8, WALL_H, 0.16]} mats={mats} />
        </mesh>
        <mesh position={[0, WALL_H * 0.5, -1.7]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[3.8, WALL_H, 0.16]} />
          <BoxEdges args={[3.8, WALL_H, 0.16]} mats={mats} />
        </mesh>
      </group>
      <group position={[14.7, 0, -5.2]}>
        <mesh position={[0, 0.02, 0]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[3.8, 0.03, 3.0]} />
        </mesh>
        {/* Signature curved partition wall enclosing 07 Service Area */}
        <mesh position={[-0.3, WALL_H * 0.5, -0.4]} material={mats.plasterTrim} castShadow receiveShadow>
          <cylinderGeometry args={[2.1, 2.1, WALL_H, 16, 1, true, Math.PI * 0.55, Math.PI * 0.85]} />
          <CylinderEdges
            args={[2.1, 2.1, WALL_H, 16, 1, true, Math.PI * 0.55, Math.PI * 0.85]}
            mats={mats}
          />
        </mesh>
      </group>

      {/* 01 DINING SPACE (120 P) + 02 KITCHEN + PANTRY along North/Rear Wing */}
      <group
        position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5 + 2.4]}
        rotation={[0, rearAngle, 0]}
      >
        {/* Glazed corridor wall divided into 3 bays by 2 structural column piers */}
        <mesh position={[-3.2, WALL_H * 0.5, 2.5]} material={mats.interiorGlass}>
          <boxGeometry args={[21.5, WALL_H, 0.1]} />
          <BoxEdges args={[21.5, WALL_H, 0.1]} mats={mats} variant="glass" />
        </mesh>
        {[-6.2, 0.4].map((px, i) => (
          <mesh key={`dp-${i}`} position={[px, WALL_H * 0.5, 2.5]} material={mats.plasterWall} castShadow receiveShadow>
            <boxGeometry args={[0.85, WALL_H, 0.55]} />
            <BoxEdges args={[0.85, WALL_H, 0.55]} mats={mats} />
          </mesh>
        ))}

        {/* 01 Dining wood floor (up to Kitchen partition) & 02 Kitchen roomFloor (#D2CFC7) */}
        <mesh position={[-3.1, 0.02, 0.2]} material={mats.woodFloor} receiveShadow>
          <boxGeometry args={[19.8, 0.03, 4.6]} />
        </mesh>
        <mesh position={[9.8, 0.02, 0.2]} material={mats.roomFloor} receiveShadow>
          <boxGeometry args={[5.8, 0.03, 4.6]} />
        </mesh>

        {/* Double-row 120P communal dining tables inside the 3 bays */}
        {[-12.2, -9.8, -7.6, -4.4, -2.0, 2.2, 4.6].map((dx, i) => (
          <group key={`dt-${i}`}>
            <DiningTableSet position={[dx, 0.03, -0.7]} rotationY={Math.PI / 2} mats={mats} />
            <DiningTableSet position={[dx, 0.03, 1.3]} rotationY={Math.PI / 2} mats={mats} />
          </group>
        ))}

        {/* Glazed front gallery café tables along 14 Circulation */}
        {[-11.0, -8.4, -4.0, -1.6, 2.4, 4.8].map((cx, i) => (
          <CafeTableSet key={`ct-${i}`} position={[cx, 0.03, 3.4]} mats={mats} />
        ))}

        {/* 02 KITCHEN + PANTRY (East end of north wing) */}
        <mesh position={[6.8, WALL_H * 0.5, 0.2]} material={mats.plasterTrim} castShadow receiveShadow>
          <boxGeometry args={[0.18, WALL_H, 4.8]} />
          <BoxEdges args={[0.18, WALL_H, 4.8]} mats={mats} />
        </mesh>
        <group position={[9.8, 0.03, 0]}>
          <mesh position={[-1.4, 0.5, 0.4]} material={mats.whiteFurniture} castShadow>
            <boxGeometry args={[0.7, 0.95, 3.2]} />
            <BoxEdges args={[0.7, 0.95, 3.2]} mats={mats} />
          </mesh>
          <mesh position={[0.4, 0.48, -1.2]} material={mats.darkSteel} castShadow>
            <boxGeometry args={[3.4, 0.9, 0.8]} />
            <BoxEdges args={[3.4, 0.9, 0.8]} mats={mats} variant="dark" />
          </mesh>
          <mesh position={[0.8, 0.48, 0.9]} material={mats.plasterTrim} castShadow>
            <boxGeometry args={[2.6, 0.9, 0.7]} />
            <BoxEdges args={[2.6, 0.9, 0.7]} mats={mats} />
          </mesh>
        </group>
      </group>

      {/* 08 TOILET (Enclosed inside Curved NE corner) */}
      <mesh position={[14.5, 0.02, -8.0]} material={mats.roomFloor} receiveShadow>
        <boxGeometry args={[3.3, 0.03, 3.0]} />
      </mesh>
      <mesh position={[12.8, WALL_H * 0.5, -8.5]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[0.18, WALL_H, 4.2]} />
        <BoxEdges args={[0.18, WALL_H, 4.2]} mats={mats} />
      </mesh>
      <mesh position={[14.7, WALL_H * 0.5, -6.5]} material={mats.plasterWall} castShadow receiveShadow>
        <boxGeometry args={[4.0, WALL_H, 0.18]} />
        <BoxEdges args={[4.0, WALL_H, 0.18]} mats={mats} />
      </mesh>
      <ToiletZoneFixtures position={[14.3, 0, -8.5]} mats={mats} />
    </group>
  );
}

/**
 * 3rd, 4th, and 5th FLOORS: Structural Placeholder Envelope ONLY (No Invented Partitions)
 */
function PlaceholderFloorInterior({
  mats,
}: {
  floor: FloorSpec;
  mats: DishariMaterialSet;
}) {
  const rearAngle = useMemo(() => getRearWallAngleRad(), []);

  return (
    <group>
      {/* Translucent perimeter bay guides showing confirmed structural span without inventing walls */}
      <mesh position={[0, 1.1, 6.2]} material={mats.placeholderShell}>
        <boxGeometry args={[31.5, 2.1, 4.4]} />
      </mesh>
      <group
        position={[0, 0, (BUILDING_DIMENSIONS.rearLeftZ + BUILDING_DIMENSIONS.rearRightZ) * 0.5 + 2.4]}
        rotation={[0, rearAngle, 0]}
      >
        <mesh position={[0, 1.1, 0]} material={mats.placeholderShell}>
          <boxGeometry args={[28.0, 2.1, 4.4]} />
        </mesh>
      </group>
    </group>
  );
}

export function FloorInteriorScene({ floor }: FloorInteriorSceneProps) {
  const isPlaceholder = floor.id === '3' || floor.id === '4' || floor.id === '5';
  const mats = useMemo(
    () => (isPlaceholder ? getPlaceholderInteriorMaterials() : getDishariMaterials()),
    [isPlaceholder],
  );

  return (
    <group>
      {/* Grounded contact plane beneath interior slab */}
      {floor.id !== 'G' && (
        <mesh
          position={[0, -0.34, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={mats.studioGroundPlane}
          receiveShadow
        >
          <planeGeometry args={[160, 160]} />
        </mesh>
      )}

      {/* Shared footprint, vertical lift shafts, fire stair, central stair & ramp */}
      <SharedFloorShell mats={mats} floorId={floor.id} />

      {/* Floor-specific verified 3D interior OR explicit placeholder */}
      {floor.id === 'G' && <GroundFloorInterior mats={mats} />}
      {floor.id === '1' && <FirstFloorInterior mats={mats} />}
      {floor.id === '2' && <SecondFloorInterior mats={mats} />}
      {isPlaceholder && <PlaceholderFloorInterior floor={floor} mats={mats} />}
      {floor.id === '6' && <SixthFloorInterior mats={mats} />}
    </group>
  );
}
