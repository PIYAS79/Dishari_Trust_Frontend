"use client";
"use no memo";
/* eslint-disable react-hooks/immutability -- imperative three.js / DOM updates inside useFrame, intentional */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { CameraPose } from '../../utils/geometryHelpers';
import { prefersReducedMotion } from '../../utils/webglCapabilities';

interface SceneLightingAndControlsProps {
  cameraPose: CameraPose;
  poseVersion: number;
  isSoftwareGl: boolean;
  lightingMode?: 'exterior' | 'interior';
  minDistance?: number;
  maxDistance?: number;
  maxPolarAngle?: number;
  shadowExtent?: number;
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
}

const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

export function SceneLightingAndControls({
  cameraPose,
  poseVersion,
  isSoftwareGl,
  lightingMode = 'exterior',
  minDistance = 8,
  maxDistance = 85,
  maxPolarAngle = Math.PI / 2 - 0.03,
  shadowExtent = 34,
  fogColor = '#d8e2dc',
  fogNear = 55,
  fogFar = 145,
}: SceneLightingAndControlsProps) {
  const { gl, scene, camera, size, invalidate } = useThree();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const transitioningRef = useRef(false);
  const lastPoseVersionRef = useRef<number>(-1);
  const isInterior = lightingMode === 'interior';
  const envIntensity = isInterior ? 0.2 : 0.56;

  // Keep horizontal framing comfortable even inside narrow portrait split canvases
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / Math.max(1, size.height);
      const baseFov = 44;
      const targetFov = aspect < 0.95 ? Math.min(64, baseFov / Math.max(0.68, aspect)) : baseFov;
      if (Math.abs(camera.fov - targetFov) > 0.25) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
        invalidate();
      }
    }
  }, [camera, size.width, size.height, invalidate]);

  // Studio PBR reflections via RoomEnvironment (mandatory on all devices)
  useEffect(() => {
    let cancelled = false;
    let envTexture: THREE.Texture | null = null;

    import('three/addons/environments/RoomEnvironment.js').then(
      ({ RoomEnvironment }) => {
        if (cancelled) return;
        const pmrem = new THREE.PMREMGenerator(gl);
        const room = new RoomEnvironment();
        const rt = pmrem.fromScene(room, 0.04);
        envTexture = rt.texture;
        scene.environment = envTexture;
        scene.environmentIntensity = envIntensity;
        room.dispose();
        pmrem.dispose();
        invalidate();
      },
    );

    return () => {
      cancelled = true;
      if (envTexture) {
        envTexture.dispose();
      }
    };
  }, [gl, scene, envIntensity, invalidate]);

  // Apply scene background & horizon-matched fog once
  useEffect(() => {
    scene.background = new THREE.Color(fogColor);
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
    invalidate();
  }, [scene, fogColor, fogNear, fogFar, invalidate]);

  // Trigger camera move whenever poseVersion increments (preset / reset / focus)
  useEffect(() => {
    if (lastPoseVersionRef.current === poseVersion) return;
    lastPoseVersionRef.current = poseVersion;

    _targetPos.set(...cameraPose.position);
    _targetLook.set(...cameraPose.target);

    if (isSoftwareGl || prefersReducedMotion() || poseVersion === 0) {
      camera.position.copy(_targetPos);
      if (controlsRef.current) {
        controlsRef.current.target.copy(_targetLook);
        controlsRef.current.update();
      } else {
        camera.lookAt(_targetLook);
      }
      transitioningRef.current = false;
      invalidate();
    } else {
      transitioningRef.current = true;
      invalidate();
    }
  }, [cameraPose, poseVersion, isSoftwareGl, camera, invalidate]);

  useFrame((_, delta) => {
    if (!transitioningRef.current || !controlsRef.current) return;
    const dt = Math.min(delta, 0.05);
    const lambda = 7.5;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      _targetPos.x,
      lambda,
      dt,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      _targetPos.y,
      lambda,
      dt,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      _targetPos.z,
      lambda,
      dt,
    );

    const tgt = controlsRef.current.target;
    tgt.x = THREE.MathUtils.damp(tgt.x, _targetLook.x, lambda, dt);
    tgt.y = THREE.MathUtils.damp(tgt.y, _targetLook.y, lambda, dt);
    tgt.z = THREE.MathUtils.damp(tgt.z, _targetLook.z, lambda, dt);

    controlsRef.current.update();

    const posDist = camera.position.distanceTo(_targetPos);
    const lookDist = tgt.distanceTo(_targetLook);
    if (posDist < 0.04 && lookDist < 0.04) {
      camera.position.copy(_targetPos);
      tgt.copy(_targetLook);
      controlsRef.current.update();
      transitioningRef.current = false;
    } else {
      invalidate();
    }
  });

  return (
    <>
      <hemisphereLight
        args={
          isInterior
            ? ['#e2eaf0', '#696257', 0.34]
            : ['#dcebfa', '#574e3d', 0.7]
        }
      />
      <directionalLight
        position={isInterior ? [26, 24, 20] : [26, 38, 28]}
        intensity={isInterior ? 1.15 : 1.75}
        color={isInterior ? '#fff1da' : '#fff2dc'}
        castShadow={!isSoftwareGl}
        shadow-mapSize-width={isSoftwareGl ? 1024 : 2048}
        shadow-mapSize-height={isSoftwareGl ? 1024 : 2048}
        shadow-bias={-0.0004}
        shadow-normalBias={0.025}
        shadow-radius={2.5}
        shadow-camera-near={2}
        shadow-camera-far={120}
        shadow-camera-left={-shadowExtent}
        shadow-camera-right={shadowExtent}
        shadow-camera-top={shadowExtent}
        shadow-camera-bottom={-shadowExtent}
      />
      <directionalLight
        position={isInterior ? [-24, 15, -20] : [-24, 18, -22]}
        intensity={isInterior ? 0.3 : 0.44}
        color="#c8ddf2"
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping={!isSoftwareGl}
        dampingFactor={0.08}
        minDistance={minDistance}
        maxDistance={maxDistance}
        maxPolarAngle={maxPolarAngle}
        onStart={() => {
          transitioningRef.current = false;
        }}
        onChange={() => {
          invalidate();
        }}
      />
    </>
  );
}
