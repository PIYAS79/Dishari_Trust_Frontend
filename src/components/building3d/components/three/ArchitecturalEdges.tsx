"use client";
"use no memo";
/* eslint-disable react-hooks/exhaustive-deps -- geometry args are intentionally keyed by value */

import { useMemo } from 'react';
import * as THREE from 'three';
import { DishariMaterialSet } from '../../materials/proceduralMaterials';

const boxEdgeCache = new Map<string, THREE.EdgesGeometry>();
const cylEdgeCache = new Map<string, THREE.EdgesGeometry>();

function getBoxEdgeGeometry(w: number, h: number, d: number): THREE.EdgesGeometry {
  const key = `${w.toFixed(3)}_${h.toFixed(3)}_${d.toFixed(3)}`;
  const cached = boxEdgeCache.get(key);
  if (cached) return cached;

  const box = new THREE.BoxGeometry(w, h, d);
  const edges = new THREE.EdgesGeometry(box, 20);
  box.dispose();
  boxEdgeCache.set(key, edges);
  return edges;
}

function getCylinderEdgeGeometry(
  rTop: number,
  rBottom: number,
  height: number,
  radialSegments: number,
  openEnded: boolean,
  thetaStart: number,
  thetaLength: number,
): THREE.EdgesGeometry {
  const key = `${rTop.toFixed(2)}_${rBottom.toFixed(2)}_${height.toFixed(2)}_${radialSegments}_${openEnded}_${thetaStart.toFixed(3)}_${thetaLength.toFixed(3)}`;
  const cached = cylEdgeCache.get(key);
  if (cached) return cached;

  const cyl = new THREE.CylinderGeometry(
    rTop,
    rBottom,
    height,
    radialSegments,
    1,
    openEnded,
    thetaStart,
    thetaLength,
  );
  // 28° threshold draws clean top/bottom arcs and open ends without vertical facet clutter
  const edges = new THREE.EdgesGeometry(cyl, 28);
  cyl.dispose();
  cylEdgeCache.set(key, edges);
  return edges;
}

const noopRaycast = () => null;

/**
 * Lightweight, cached edge lines for architectural box elements (walls, partitions,
 * structural columns, stair treads, counters) to sharpen corners without cartoon outlines.
 */
export function BoxEdges({
  args,
  mats,
  variant = 'wall',
}: {
  args: [number, number, number];
  mats: DishariMaterialSet;
  variant?: 'wall' | 'glass' | 'dark';
}) {
  const geo = useMemo(
    () => getBoxEdgeGeometry(args[0], args[1], args[2]),
    [args[0], args[1], args[2]],
  );

  const material =
    variant === 'glass'
      ? mats.edgeGlass
      : variant === 'dark'
        ? mats.edgeDark
        : mats.edgeWall;

  return <lineSegments geometry={geo} material={material} raycast={noopRaycast} />;
}

/**
 * Lightweight, cached edge lines for curved architectural wall arcs & cylindrical landings.
 */
export function CylinderEdges({
  args,
  mats,
}: {
  args: [number, number, number, number, number?, boolean?, number?, number?];
  mats: DishariMaterialSet;
}) {
  const [
    rTop,
    rBottom,
    height,
    radialSegments,
    ,
    openEnded = false,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
  ] = args;

  const geo = useMemo(
    () =>
      getCylinderEdgeGeometry(
        rTop,
        rBottom,
        height,
        radialSegments,
        openEnded,
        thetaStart,
        thetaLength,
      ),
    [rTop, rBottom, height, radialSegments, openEnded, thetaStart, thetaLength],
  );

  return <lineSegments geometry={geo} material={mats.edgeWall} raycast={noopRaycast} />;
}
