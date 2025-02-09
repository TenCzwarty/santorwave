"use client";

import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

type ModelType = {
  src: string;
};

export const Model = ({ src }: ModelType) => {
  const ref = React.useRef<THREE.Mesh>(null);

  const { scene } = useGLTF(src);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.01;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[0.02, 0.02, 0.02]}
      position={[0, -1.5, 0]}
    />
  );
};
