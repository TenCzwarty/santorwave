"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { GlbModel } from "../helpers/glb-model";

export const ModelDavidsHead = () => {
  return (
    <Canvas
      id="david"
      className="!pointer-events-none !absolute left-0 top-0 -z-10 h-full w-full opacity-50"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 1]} intensity={1} color="pink" />
      <Suspense
        fallback={
          <GlbModel
            src="/models/davids-head-low-quality.glb"
            scale={[0.02, 0.02, 0.02]}
            position={[0, -1.5, 0]}
          />
        }
      >
        <GlbModel
          src="/models/davids-head.glb"
          scale={[0.02, 0.02, 0.02]}
          position={[0, -1.5, 0]}
          animation={{ rotation: [0, 0.01, 0] }}
        />
      </Suspense>
    </Canvas>
  );
};
