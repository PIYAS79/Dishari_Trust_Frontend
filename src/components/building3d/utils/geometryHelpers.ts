import * as THREE from 'three';

export type FloorId = 'G' | '1' | '2' | '3' | '4' | '5' | '6';

/**
 * Shared architectural coordinate system (1 unit = 1 meter).
 * Origin (0, 0, 0) sits near the center of the main floorplate at ground level.
 * +X = Right (toward Main Entry / Vehicular Ramp / Curved Corner)
 * -X = Left (toward Pedestrian Ramp / Secondary Entry)
 * +Z = Front (facing the street / main exterior facade)
 * -Z = Rear (facing the rear lawn / angled rear elevation)
 * +Y = Up
 */
export const BUILDING_DIMENSIONS = {
  minX: -17.0,
  maxX: 17.0,
  frontZ: 9.0,
  rearLeftZ: -7.2,
  rearRightZ: -11.4,
  cornerRadius: 3.0,
  groundFloorHeight: 4.6,
  typicalFloorHeight: 3.45,
  slabThickness: 0.24,
  parapetHeight: 1.25,
} as const;

export const FLOOR_ELEVATIONS: Record<
  FloorId,
  { index: number; baseY: number; height: number }
> = {
  G: { index: 0, baseY: 0, height: BUILDING_DIMENSIONS.groundFloorHeight },
  '1': {
    index: 1,
    baseY: BUILDING_DIMENSIONS.groundFloorHeight,
    height: BUILDING_DIMENSIONS.typicalFloorHeight,
  },
  '2': {
    index: 2,
    baseY:
      BUILDING_DIMENSIONS.groundFloorHeight +
      BUILDING_DIMENSIONS.typicalFloorHeight * 1,
    height: BUILDING_DIMENSIONS.typicalFloorHeight,
  },
  '3': {
    index: 3,
    baseY:
      BUILDING_DIMENSIONS.groundFloorHeight +
      BUILDING_DIMENSIONS.typicalFloorHeight * 2,
    height: BUILDING_DIMENSIONS.typicalFloorHeight,
  },
  '4': {
    index: 4,
    baseY:
      BUILDING_DIMENSIONS.groundFloorHeight +
      BUILDING_DIMENSIONS.typicalFloorHeight * 3,
    height: BUILDING_DIMENSIONS.typicalFloorHeight,
  },
  '5': {
    index: 5,
    baseY:
      BUILDING_DIMENSIONS.groundFloorHeight +
      BUILDING_DIMENSIONS.typicalFloorHeight * 4,
    height: BUILDING_DIMENSIONS.typicalFloorHeight,
  },
  '6': {
    index: 6,
    baseY:
      BUILDING_DIMENSIONS.groundFloorHeight +
      BUILDING_DIMENSIONS.typicalFloorHeight * 5,
    height: BUILDING_DIMENSIONS.typicalFloorHeight,
  },
};

/**
 * Linear interpolation of the rear wall Z-coordinate along X.
 * The rear elevation splays from Z = -7.2 on the left (X = -17) to Z = -11.4 on the right (X = +17).
 */
export function rearZAtX(x: number): number {
  const { minX, maxX, rearLeftZ, rearRightZ } = BUILDING_DIMENSIONS;
  const t = Math.max(0, Math.min(1, (x - minX) / (maxX - minX)));
  return rearLeftZ + (rearRightZ - rearLeftZ) * t;
}

/**
 * Computes the rear wall angle in radians (in XZ plane) so rear rooms/balconies
 * align naturally with the splayed rear facade.
 */
export function getRearWallAngleRad(): number {
  const { minX, maxX, rearLeftZ, rearRightZ } = BUILDING_DIMENSIONS;
  return Math.atan2(rearRightZ - rearLeftZ, maxX - minX);
}

/**
 * Returns 2D footprint points (x, z) for the main building slab.
 * Note: Three.js Shape uses (x, y); when rotated -Math.PI/2 around X, shape +Y maps to -Z.
 * So we provide a helper that returns (x, shapeY = -z) directly for ExtrudeGeometry.
 */
export function createMainSlabShape(inset = 0): THREE.Shape {
  const minX = BUILDING_DIMENSIONS.minX + inset;
  const maxX = BUILDING_DIMENSIONS.maxX - inset;
  const frontZ = BUILDING_DIMENSIONS.frontZ - inset;
  const rearLeftZ = rearZAtX(minX) + inset;
  const rearRightZ = rearZAtX(maxX) + inset;
  const r = Math.max(0.4, BUILDING_DIMENSIONS.cornerRadius - inset);

  // In Shape coordinates: sx = x, sy = -z (so frontZ=+9 is sy=-9, rearZ=-11 is sy=+11)
  const shape = new THREE.Shape();
  shape.moveTo(minX, -frontZ);
  shape.lineTo(maxX, -frontZ);
  // Right wall up to curved top-right corner
  shape.lineTo(maxX, -(rearRightZ + r));
  // Smooth quarter-round arc at top-right (+X, -Z => +sx, +sy)
  shape.quadraticCurveTo(maxX, -rearRightZ, maxX - r, -rearRightZ);
  // Sloped rear wall to top-left
  shape.lineTo(minX, -rearLeftZ);
  shape.closePath();
  return shape;
}

/**
 * Ground & 1st floor have a slight front-left setback / recessed colonnade vs upper 2nd-6th floors.
 * Ground floor also connects to the stepped Main Entry on front-right.
 */
export function getFloorElevation(floorId: FloorId) {
  return FLOOR_ELEVATIONS[floorId];
}

export function getTotalBuildingHeight(): number {
  const top = FLOOR_ELEVATIONS['6'];
  return top.baseY + top.height + BUILDING_DIMENSIONS.parapetHeight;
}

export type CameraPresetKey = 'axonometric' | 'top' | 'front' | 'corner';

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
}

export function getInteriorCameraPreset(preset: CameraPresetKey): CameraPose {
  switch (preset) {
    case 'top':
      return {
        position: [0, 58, 0.01],
        target: [0, 0.6, -0.5],
      };
    case 'front':
      return {
        position: [0, 18, 46],
        target: [0, 1.0, -0.5],
      };
    case 'corner':
      return {
        position: [34, 24, 38],
        target: [0, 1.0, -0.5],
      };
    case 'axonometric':
    default:
      // Matches the axonometric viewing angle of the reference sheets while framing the full ramp-to-corner width
      return {
        position: [-5, 36, 42],
        target: [0, 0.6, -0.5],
      };
  }
}

export function getExteriorCameraPreset(preset: CameraPresetKey): CameraPose {
  switch (preset) {
    case 'top':
      return {
        position: [0, 78, 12],
        target: [0, 10, 0],
      };
    case 'front':
      return {
        position: [0, 15, 70],
        target: [0, 11.5, 0],
      };
    case 'axonometric':
      return {
        position: [-36, 32, 60],
        target: [0, 11.5, 0],
      };
    case 'corner':
    default:
      // Street-level architectural perspective matching the G+6 exterior reference render
      return {
        position: [34, 11.5, 54],
        target: [1.0, 12.2, 0],
      };
  }
}

/**
 * Shared structural core positions so every floor aligns vertically.
 */
export const STRUCTURAL_CORES = {
  leftLift: { x: -13.6, z: -4.2, w: 3.4, d: 2.6 },
  frontRightLift: { x: 7.4, z: 5.1, w: 3.6, d: 2.6 },
  fireStair: { x: 11.1, z: -2.0, w: 3.6, d: 4.2 },
  centralStair: { x: -0.6, z: 1.1, w: 7.4, d: 3.0 },
  rampPivot: { x: -18.2, z: 1.0 },
} as const;
