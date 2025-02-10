"use client";

import React from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

type Vector<T> = [T, T, T];

type GlbModelType = {
  src: string;
  scale?: Vector<number>;
  position?: Vector<number>;
  animation?: {
    rotation?: Vector<number>;
  };
};

export const GlbModel = ({ src, scale, position, animation }: GlbModelType) => {
  const ref = React.useRef<THREE.Mesh>(null);

  const { scene } = useGLTF(src);

  useFrame(() => {
    if (!ref.current) return;
    if (!animation) return;
    if (!animation.rotation) return;

    ref.current.rotation.x += animation.rotation[0];
    ref.current.rotation.y += animation.rotation[1];
    ref.current.rotation.z += animation.rotation[2];
  });

  return (
    <primitive ref={ref} object={scene} scale={scale} position={position} />
  );
};
