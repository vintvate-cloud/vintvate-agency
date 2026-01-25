"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "./Model";

function Scene() {
    return (
        <>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Basketball - Top Left */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Model
                    path="/models/basketball.glb"
                    position={[-3, 2, 0]}
                    scale={0.8}
                    fallbackColor="orange"
                />
            </Float>

            {/* Knight - Top Right */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
                <Model
                    path="/models/knight.glb"
                    position={[3, 2, -1]}
                    scale={0.8}
                    fallbackColor="#1a1a1a"
                />
            </Float>

            {/* Panther - Bottom Left */}
            <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
                <Model
                    path="/models/panther.glb"
                    position={[-3.5, -2, 1]}
                    scale={1}
                    fallbackColor="#111"
                />
            </Float>

            {/* Helmet - Bottom Right */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Model
                    path="/models/helmet.glb"
                    position={[3.5, -2, 0]}
                    scale={1}
                    fallbackColor="silver"
                />
            </Float>

            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </>
    );
}

export default function Experience() {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
