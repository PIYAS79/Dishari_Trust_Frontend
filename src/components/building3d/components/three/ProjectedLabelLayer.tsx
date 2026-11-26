"use client";
"use no memo";
/* eslint-disable react-hooks/refs, react-hooks/immutability -- imperative three.js / DOM updates inside useFrame, intentional */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export interface ProjectedLabelItem {
  id: string;
  position: [number, number, number];
}

const _projVec = new THREE.Vector3();

/**
 * Projects 3D world positions to 2D viewport CSS coordinates and updates
 * DOM node transforms directly without calling React setState at 60Hz
 * and without nested ReactDOM roots (avoiding React 19 Html unmount errors).
 */
export function LabelProjector({
  items,
  buttonRefs,
}: {
  items: ProjectedLabelItem[];
  buttonRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}) {
  const { camera, size } = useThree();
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const projectAll = () => {
    const list = itemsRef.current;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const el = buttonRefs.current[item.id];
      if (!el) continue;

      _projVec.set(item.position[0], item.position[1], item.position[2]);
      _projVec.project(camera);

      // Behind camera or outside clip range
      if (_projVec.z > 1 || _projVec.z < -1) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        continue;
      }

      const x = (_projVec.x * 0.5 + 0.5) * size.width;
      const y = (-_projVec.y * 0.5 + 0.5) * size.height;

      // Hide when outside viewport bounds with small margin
      if (x < -40 || x > size.width + 40 || y < -24 || y > size.height + 24) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
      } else {
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
    }
  };

  useEffect(() => {
    camera.updateMatrixWorld();
    projectAll();
  });

  useFrame(() => {
    projectAll();
  });

  return null;
}
