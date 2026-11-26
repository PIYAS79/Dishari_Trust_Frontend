/**
 * Centralized architectural color palette & PBR material calibration for DISHARI.
 * Avoids pure white (#FFFFFF) on large interior surfaces to prevent washout and
 * maintains clear figure-ground contrast across floors, walls, partitions, and props.
 */
export const ARCHITECTURAL_PALETTE = {
  // Core Interior Surfaces (Detailed Floors: G, 1, 2, 6)
  interiorFloor: '#C9C6BE', // Muted Warm Grey (Main Interior Floor)
  roomFloor: '#D2CFC7', // Light Warm Grey (Enclosed Non-Wood Room Floor)
  interiorWall: '#EEE9DF', // Warm Off-White (Main Interior Walls)
  roomPartition: '#DAD6CC', // Light Beige Grey (Secondary Partitions)
  concreteStructure: '#BFC1BA', // Muted Concrete (Stairs, Ramps, Shafts)
  brickTerracotta: '#B85F43', // Existing Terracotta Brick
  glassPartition: '#A9BEC0', // Subtle Blue Grey Glass
  woodFurniture: '#B58C65', // Natural Wood Furniture
  metalElement: '#626A68', // Muted Dark Grey Metal

  // Subtle architectural tonal variants (no decorative patterns)
  woodFloor: '#C6A37D', // Warm oak flooring (contrasts cleanly with #B58C65 furniture)
  whiteFurniture: '#E5DFD3', // Matte warm ivory-stone (never #FFFFFF)
  bedLinen: '#C2C7C7', // Soft cool linen
  sofaFabric: '#8D644B', // Muted warm cognac-taupe fabric
  blueRug: '#3E5F8A', // Desaturated architectural slate blue
  gymRubber: '#464B49', // Charcoal gym rubber
  studioGroundPlane: '#AEB6B1', // Slightly deeper neutral studio ground plane so #C9C6BE slab pops
  interiorBackdrop: '#BDC5C0', // Interior viewport & fog color

  // Subtle architectural edge & intersection definition (never harsh black)
  edgeWall: '#847E72',
  edgeGlass: '#6C8488',
  edgeDark: '#3A403F',

  // Untouched Placeholder Floors (3rd, 4th, 5th) — preserved neutral envelope
  placeholderFloor: '#D8D5CC',
  placeholderWall: '#F1EEE6',
  placeholderPartition: '#E3E0D8',
  placeholderConcrete: '#C7C9C3',
  placeholderShell: '#8EA598',
  placeholderWire: '#DFB248',

  // Preserved Exterior Landscape, Road & Facade (100% unchanged)
  exteriorBackdrop: '#CFE0ED',
  exteriorSlab: '#E3E0D8',
  exteriorConcrete: '#C7C9C3',
  exteriorLawn: '#4B7034',
  exteriorFoliageLight: '#4D7B2F',
  exteriorFoliageDark: '#2F531D',
  exteriorFoliageDeep: '#234115',
  exteriorBark: '#523E2C',
  exteriorAsphalt: '#2E3238',
  exteriorGlass: '#3B4E57',
  exteriorBalconyGlass: '#5D7480',
  exteriorStonePlinth: '#B9B4AA',
  exteriorNeighbor: '#C7CCD1',
  exteriorWarmInterior: '#F2D4A7',

  // Selection Accents
  goldHighlight: '#F1C24B',
  goldOutline: '#F5C84C',
} as const;

export const ARCHITECTURAL_PBR = {
  interiorFloor: { roughness: 0.9, metalness: 0.0, envMapIntensity: 0.28 },
  roomFloor: { roughness: 0.88, metalness: 0.0, envMapIntensity: 0.28 },
  interiorWall: { roughness: 0.92, metalness: 0.0, envMapIntensity: 0.34 },
  roomPartition: { roughness: 0.92, metalness: 0.0, envMapIntensity: 0.32 },
  concreteStructure: { roughness: 0.95, metalness: 0.0, envMapIntensity: 0.28 },
  brickInterior: { roughness: 0.9, metalness: 0.02, envMapIntensity: 0.36 },
  brickExterior: { roughness: 0.88, metalness: 0.02, envMapIntensity: 0.55 },
  glassPartition: { roughness: 0.18, metalness: 0.08, opacity: 0.46, envMapIntensity: 0.8 },
  woodFurniture: { roughness: 0.8, metalness: 0.0, envMapIntensity: 0.38 },
  woodFloor: { roughness: 0.86, metalness: 0.0, envMapIntensity: 0.3 },
  metalElement: { roughness: 0.44, metalness: 0.54, envMapIntensity: 0.85 },
  whiteFurniture: { roughness: 0.8, metalness: 0.02, envMapIntensity: 0.35 },
} as const;
