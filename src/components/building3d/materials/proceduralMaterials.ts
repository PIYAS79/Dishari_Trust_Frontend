import * as THREE from 'three';
import { ARCHITECTURAL_PALETTE, ARCHITECTURAL_PBR } from './architecturalTheme';

export interface DishariMaterialSet {
  brickExterior: THREE.MeshStandardMaterial;
  brickInterior: THREE.MeshStandardMaterial;
  plasterWall: THREE.MeshStandardMaterial;
  plasterTrim: THREE.MeshStandardMaterial;
  stonePlinth: THREE.MeshStandardMaterial;
  floorTile: THREE.MeshStandardMaterial;
  roomFloor: THREE.MeshStandardMaterial;
  woodFloor: THREE.MeshStandardMaterial;
  timberFurniture: THREE.MeshStandardMaterial;
  concreteRamp: THREE.MeshStandardMaterial;
  exteriorSlab: THREE.MeshStandardMaterial;
  exteriorConcrete: THREE.MeshStandardMaterial;
  asphaltRoad: THREE.MeshStandardMaterial;
  lawnGrass: THREE.MeshStandardMaterial;
  foliageLight: THREE.MeshStandardMaterial;
  foliageDark: THREE.MeshStandardMaterial;
  foliageDeep: THREE.MeshStandardMaterial;
  bark: THREE.MeshStandardMaterial;
  glass: THREE.MeshStandardMaterial;
  interiorGlass: THREE.MeshStandardMaterial;
  balconyGlass: THREE.MeshStandardMaterial;
  warmInterior: THREE.MeshStandardMaterial;
  neighborBuilding: THREE.MeshStandardMaterial;
  darkSteel: THREE.MeshStandardMaterial;
  whiteFurniture: THREE.MeshStandardMaterial;
  bedLinen: THREE.MeshStandardMaterial;
  sofaFabric: THREE.MeshStandardMaterial;
  blueRug: THREE.MeshStandardMaterial;
  gymRubber: THREE.MeshStandardMaterial;
  sensoryMat: THREE.MeshStandardMaterial;
  studioGroundPlane: THREE.MeshStandardMaterial;
  goldHighlight: THREE.MeshStandardMaterial;
  goldOutline: THREE.MeshBasicMaterial;
  placeholderShell: THREE.MeshStandardMaterial;
  placeholderWire: THREE.LineBasicMaterial;
  edgeWall: THREE.LineBasicMaterial;
  edgeGlass: THREE.LineBasicMaterial;
  edgeDark: THREE.LineBasicMaterial;
}

let cachedMaterials: DishariMaterialSet | null = null;
let cachedPlaceholderMaterials: DishariMaterialSet | null = null;

function createBrickTextures(variant: 'exterior' | 'interior'): {
  map: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
} {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  const isInterior = variant === 'interior';
  ctx.fillStyle = isInterior ? '#8a6f62' : '#755f52';
  ctx.fillRect(0, 0, size, size);
  bCtx.fillStyle = '#262626';
  bCtx.fillRect(0, 0, size, size);

  const rows = 24;
  const cols = 12;
  const rowH = size / rows;
  const colW = size / cols;
  const mortar = 2.2;

  let seed = isInterior ? 67 : 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let r = 0; r < rows; r++) {
    const offset = (r % 2) * (colW * 0.5);
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset + mortar * 0.5;
      const y = r * rowH + mortar * 0.5;
      const w = colW - mortar;
      const h = rowH - mortar;

      const tone = rand();
      const isDarkClinker = tone < 0.14;

      let red: number;
      let green: number;
      let blue: number;

      if (isInterior) {
        // Calibrated directly around Terracotta (#B85F43 => 184, 95, 67)
        red = isDarkClinker
          ? Math.round(156 + tone * 30)
          : Math.round(174 + tone * 24);
        green = isDarkClinker
          ? Math.round(78 + tone * 18)
          : Math.round(88 + tone * 18);
        blue = isDarkClinker
          ? Math.round(54 + tone * 14)
          : Math.round(62 + tone * 14);
      } else {
        // Exterior burnt terracotta brick matching DISHARI reference
        red = isDarkClinker
          ? Math.round(118 + tone * 60)
          : Math.round(150 + tone * 42);
        green = isDarkClinker
          ? Math.round(45 + tone * 28)
          : Math.round(62 + tone * 24);
        blue = isDarkClinker
          ? Math.round(30 + tone * 18)
          : Math.round(38 + tone * 16);
      }

      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.fillRect(x, y, w, h);

      ctx.fillStyle = `rgba(48, 16, 8, ${0.04 + rand() * 0.07})`;
      ctx.fillRect(x + 1, y + 1, w * 0.45, h * 0.55);

      const bumpVal = Math.round(170 + tone * 75);
      bCtx.fillStyle = `rgb(${bumpVal}, ${bumpVal}, ${bumpVal})`;
      bCtx.fillRect(x, y, w, h);
    }
  }

  const map = new THREE.CanvasTexture(colorCanvas);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(2.2, 2.2);
  map.anisotropy = 8;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(2.2, 2.2);
  bumpMap.anisotropy = 8;

  return { map, bumpMap };
}

function createSensoryGridTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d')!;

  const palette = [
    ['#d9b74a', '#e88bb4', '#86c97a', '#6eb8df'],
    ['#e86f58', '#6eb8df', '#e5c64f', '#82c868'],
    ['#86c97a', '#e97352', '#8e7cc3', '#d9b74a'],
  ];
  const labels = [
    ['1', '2', 'C', ''],
    ['0', 'B', '1', 'B'],
    ['', '0', 'A', ''],
  ];

  const cols = 4;
  const rows = 3;
  const cw = canvas.width / cols;
  const ch = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = palette[r][c];
      ctx.fillRect(c * cw, r * ch, cw, ch);
      ctx.strokeStyle = 'rgba(235, 232, 224, 0.45)';
      ctx.lineWidth = 3;
      ctx.strokeRect(c * cw, r * ch, cw, ch);

      const lbl = labels[r][c];
      if (lbl) {
        ctx.fillStyle = 'rgba(30, 41, 59, 0.72)';
        ctx.font = 'bold 54px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(lbl, c * cw + cw * 0.5, r * ch + ch * 0.5);
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function createAsphaltTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = ARCHITECTURAL_PALETTE.exteriorAsphalt;
  ctx.fillRect(0, 0, size, size);

  let seed = 91;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 3200; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const v = Math.round(38 + rand() * 28);
    ctx.fillStyle = `rgb(${v},${v + 2},${v + 4})`;
    ctx.fillRect(x, y, 2, 2);
  }

  // Crisp road center dashes
  ctx.fillStyle = '#d8dade';
  for (let x = 20; x < size; x += 96) {
    ctx.fillRect(x, size * 0.5 - 5, 44, 10);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(7, 1);
  tex.anisotropy = 8;
  return tex;
}

export function getDishariMaterials(): DishariMaterialSet {
  if (cachedMaterials) return cachedMaterials;

  const brickExt = createBrickTextures('exterior');
  const brickInt = createBrickTextures('interior');
  const sensoryMap = createSensoryGridTexture();
  const asphaltMap = createAsphaltTexture();

  const brickExterior = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: brickExt.map,
    bumpMap: brickExt.bumpMap,
    bumpScale: 0.055,
    roughness: ARCHITECTURAL_PBR.brickExterior.roughness,
    metalness: ARCHITECTURAL_PBR.brickExterior.metalness,
    envMapIntensity: ARCHITECTURAL_PBR.brickExterior.envMapIntensity,
  });

  const brickInterior = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: brickInt.map,
    bumpMap: brickInt.bumpMap,
    bumpScale: 0.04,
    roughness: ARCHITECTURAL_PBR.brickInterior.roughness,
    metalness: ARCHITECTURAL_PBR.brickInterior.metalness,
    envMapIntensity: ARCHITECTURAL_PBR.brickInterior.envMapIntensity,
  });

  cachedMaterials = {
    brickExterior,
    brickInterior,
    plasterWall: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.interiorWall,
      roughness: ARCHITECTURAL_PBR.interiorWall.roughness,
      metalness: ARCHITECTURAL_PBR.interiorWall.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.interiorWall.envMapIntensity,
    }),
    plasterTrim: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.roomPartition,
      roughness: ARCHITECTURAL_PBR.roomPartition.roughness,
      metalness: ARCHITECTURAL_PBR.roomPartition.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.roomPartition.envMapIntensity,
    }),
    stonePlinth: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorStonePlinth,
      roughness: 0.86,
      metalness: 0.02,
    }),
    // Main interior floor in Muted Warm Grey (#C9C6BE)
    floorTile: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.interiorFloor,
      roughness: ARCHITECTURAL_PBR.interiorFloor.roughness,
      metalness: ARCHITECTURAL_PBR.interiorFloor.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.interiorFloor.envMapIntensity,
    }),
    // Enclosed room floor in Light Warm Grey (#D2CFC7)
    roomFloor: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.roomFloor,
      roughness: ARCHITECTURAL_PBR.roomFloor.roughness,
      metalness: ARCHITECTURAL_PBR.roomFloor.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.roomFloor.envMapIntensity,
    }),
    woodFloor: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.woodFloor,
      roughness: ARCHITECTURAL_PBR.woodFloor.roughness,
      metalness: ARCHITECTURAL_PBR.woodFloor.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.woodFloor.envMapIntensity,
    }),
    timberFurniture: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.woodFurniture,
      roughness: ARCHITECTURAL_PBR.woodFurniture.roughness,
      metalness: ARCHITECTURAL_PBR.woodFurniture.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.woodFurniture.envMapIntensity,
    }),
    concreteRamp: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.concreteStructure,
      roughness: ARCHITECTURAL_PBR.concreteStructure.roughness,
      metalness: ARCHITECTURAL_PBR.concreteStructure.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.concreteStructure.envMapIntensity,
    }),
    exteriorSlab: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorSlab,
      roughness: 0.9,
      metalness: 0.0,
    }),
    exteriorConcrete: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorConcrete,
      roughness: 0.95,
      metalness: 0.0,
    }),
    asphaltRoad: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: asphaltMap,
      roughness: 0.92,
      metalness: 0.02,
    }),
    lawnGrass: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorLawn,
      roughness: 0.95,
      metalness: 0.0,
    }),
    foliageLight: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorFoliageLight,
      roughness: 0.82,
      metalness: 0.0,
      envMapIntensity: 0.35,
    }),
    foliageDark: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorFoliageDark,
      roughness: 0.86,
      metalness: 0.0,
      envMapIntensity: 0.35,
    }),
    foliageDeep: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorFoliageDeep,
      roughness: 0.9,
      metalness: 0.0,
      envMapIntensity: 0.35,
    }),
    bark: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorBark,
      roughness: 0.92,
      metalness: 0.0,
    }),
    glass: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorGlass,
      transparent: true,
      opacity: 0.46,
      roughness: 0.08,
      metalness: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    interiorGlass: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.glassPartition,
      transparent: true,
      opacity: ARCHITECTURAL_PBR.glassPartition.opacity,
      roughness: ARCHITECTURAL_PBR.glassPartition.roughness,
      metalness: ARCHITECTURAL_PBR.glassPartition.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.glassPartition.envMapIntensity,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    balconyGlass: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorBalconyGlass,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    warmInterior: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorWarmInterior,
      emissive: 0xd99e4e,
      emissiveIntensity: 0.38,
      roughness: 0.78,
      metalness: 0.0,
    }),
    neighborBuilding: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.exteriorNeighbor,
      roughness: 0.88,
      metalness: 0.04,
    }),
    darkSteel: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.metalElement,
      roughness: ARCHITECTURAL_PBR.metalElement.roughness,
      metalness: ARCHITECTURAL_PBR.metalElement.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.metalElement.envMapIntensity,
    }),
    whiteFurniture: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.whiteFurniture,
      roughness: ARCHITECTURAL_PBR.whiteFurniture.roughness,
      metalness: ARCHITECTURAL_PBR.whiteFurniture.metalness,
      envMapIntensity: ARCHITECTURAL_PBR.whiteFurniture.envMapIntensity,
    }),
    bedLinen: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.bedLinen,
      roughness: 0.88,
      metalness: 0.0,
      envMapIntensity: 0.3,
    }),
    sofaFabric: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.sofaFabric,
      roughness: 0.9,
      metalness: 0.0,
      envMapIntensity: 0.3,
    }),
    blueRug: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.blueRug,
      roughness: 0.92,
      metalness: 0.0,
      envMapIntensity: 0.28,
    }),
    gymRubber: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.gymRubber,
      roughness: 0.9,
      metalness: 0.02,
      envMapIntensity: 0.28,
    }),
    sensoryMat: new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: sensoryMap,
      roughness: 0.78,
      metalness: 0.02,
      envMapIntensity: 0.3,
    }),
    studioGroundPlane: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.studioGroundPlane,
      roughness: 0.96,
      metalness: 0.0,
      envMapIntensity: 0.22,
    }),
    goldHighlight: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.goldHighlight,
      emissive: 0x9b6d10,
      emissiveIntensity: 0.55,
      roughness: 0.32,
      metalness: 0.62,
    }),
    goldOutline: new THREE.MeshBasicMaterial({
      color: ARCHITECTURAL_PALETTE.goldOutline,
      transparent: true,
      opacity: 0.95,
    }),
    placeholderShell: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.placeholderShell,
      transparent: true,
      opacity: 0.28,
      roughness: 0.65,
      metalness: 0.1,
      depthWrite: false,
    }),
    placeholderWire: new THREE.LineBasicMaterial({
      color: ARCHITECTURAL_PALETTE.placeholderWire,
      transparent: true,
      opacity: 0.75,
    }),
    edgeWall: new THREE.LineBasicMaterial({
      color: ARCHITECTURAL_PALETTE.edgeWall,
      transparent: true,
      opacity: 0.52,
    }),
    edgeGlass: new THREE.LineBasicMaterial({
      color: ARCHITECTURAL_PALETTE.edgeGlass,
      transparent: true,
      opacity: 0.6,
    }),
    edgeDark: new THREE.LineBasicMaterial({
      color: ARCHITECTURAL_PALETTE.edgeDark,
      transparent: true,
      opacity: 0.48,
    }),
  };

  return cachedMaterials;
}

/**
 * Preserves the exact prior neutral structural placeholder material set for
 * Floors 3, 4, and 5 (whose interior plans were not supplied) so the new
 * interior material palette applies strictly to detailed floors (G, 1, 2, 6).
 */
export function getPlaceholderInteriorMaterials(): DishariMaterialSet {
  const base = getDishariMaterials();
  if (cachedPlaceholderMaterials) return cachedPlaceholderMaterials;

  cachedPlaceholderMaterials = {
    ...base,
    floorTile: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.placeholderFloor,
      roughness: 0.85,
      metalness: 0.0,
    }),
    plasterWall: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.placeholderWall,
      roughness: 0.9,
      metalness: 0.0,
    }),
    plasterTrim: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.placeholderPartition,
      roughness: 0.9,
      metalness: 0.0,
    }),
    concreteRamp: new THREE.MeshStandardMaterial({
      color: ARCHITECTURAL_PALETTE.placeholderConcrete,
      roughness: 0.95,
      metalness: 0.0,
    }),
    edgeWall: new THREE.LineBasicMaterial({
      color: '#9C968A',
      transparent: true,
      opacity: 0.44,
    }),
  };

  return cachedPlaceholderMaterials;
}
