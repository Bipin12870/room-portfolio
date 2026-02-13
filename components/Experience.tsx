"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import DeskScene from "./DeskScene";

interface ExperienceProps {
    focusTarget: string | null;
    onReset: () => void;
    onSelect: (id: string) => void;
}

const FOCUS_COORDS: Record<
  string,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  hero: {
    pos: [-1.5, 4, 10.2],        // calm entry, almost no zoom
    target: [-5, -2.25, 2],
  },
  projects: {
    pos: [-2, 4.5, 8.1],         // MOST zoom (laptop = main action)
    target: [-4.5, -2, -1],
  },
  skills: {
    pos: [2, 5, 8.8],            // strong but secondary
    target: [8.5, -2.2, -4],
  },
  about: {
    pos: [1.5, 4.5, 9.4],        // lighter zoom (books)
    target: [5.5, -2.2, 1],
  },
  contact: {
    pos: [0.5, 4, 9.7],          // subtle nudge only
    target: [2, -2.4, 3],
  },
};



const DEFAULT_CAMERA = { pos: [0, 5, 11] as [number, number, number], target: [0, 0, 0] as [number, number, number] };

function CameraRig({ focusTarget }: { focusTarget: string | null }) {
    const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));

    const target = focusTarget ? FOCUS_COORDS[focusTarget] : DEFAULT_CAMERA;

    const targetPos = useRef(new THREE.Vector3(...target.pos));
    const targetLook = useRef(new THREE.Vector3(...target.target));

    // Update targets only when focusTarget changes
    if (focusTarget) {
        targetPos.current.set(...FOCUS_COORDS[focusTarget].pos);
        targetLook.current.set(...FOCUS_COORDS[focusTarget].target);
    } else {
        targetPos.current.set(...DEFAULT_CAMERA.pos);
        targetLook.current.set(...DEFAULT_CAMERA.target);
    }

    useFrame((state) => {
        const cam = state.camera;

        // Distance-based damping (this is the key)
        const distance = cam.position.distanceTo(targetPos.current);

        // Stronger when far, softer when close
        const posLerp = THREE.MathUtils.clamp(distance * 0.08, 0.015, 0.05);
        const lookLerp = THREE.MathUtils.clamp(distance * 0.05, 0.01, 0.035);

        cam.position.lerp(targetPos.current, posLerp);
        lookAtRef.current.lerp(targetLook.current, lookLerp);
        cam.lookAt(lookAtRef.current);
    });

    return null;
}


export default function Experience({ focusTarget, onReset, onSelect }: ExperienceProps) {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full bg-transparent overflow-hidden">
            <Canvas
                shadows
                camera={{
                    position: DEFAULT_CAMERA.pos,
                    fov: 55,
                    near: 0.1,
                    far: 100,
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 2]}
                onPointerMissed={() => {
                    onReset();
                }}
            >
                <CameraRig focusTarget={focusTarget} />

                {/* 1. Low Ambient Light */}
                <ambientLight intensity={0.15} />

                {/* 2. Key Directional Light */}
                <directionalLight
                    position={[10, 15, 8]}
                    intensity={0.6}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                {/* 3. Fill Light (Opposite side) */}
                <pointLight position={[-10, 5, 5]} intensity={0.3} color="#f5e6d3" />

                {/* 4. Rim / Back Light */}
                <pointLight position={[0, 8, -10]} intensity={0.4} color="#ffffff" distance={25} />

                {/* 5. Floor Bounce / Under-glow */}
                <pointLight position={[0, -5, -2]} intensity={0.2} color="#d4c4a8" distance={15} />

                <DeskScene focusTarget={focusTarget} onSelect={onSelect} />
            </Canvas>
        </div>
    );
}