"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import DeskScene from "./DeskScene";
import ElectricBorder from "./ElectricBorder";

interface ExperienceProps {
    focusTarget: string | null;
    onReset: () => void;
    onSelect: (id: string) => void;
    onCardClick: () => void;
}

const CARD_CONTENT: Record<string, { title: string; label: string }> = {
    hero: { title: "Hero Section", label: "Return to Top" },
    projects: { title: "Laptop", label: "Go to Projects" },
    skills: { title: "Desk Lamp", label: "View Skills" },
    about: { title: "Books & Notepad", label: "About Me" },
    contact: { title: "Phone", label: "Get in Touch" },
};

const FOCUS_COORDS: Record<
    string,
    { pos: [number, number, number]; target: [number, number, number] }
> = {
    hero: {
        pos: [-1.5, 4, 10.2],
        target: [-5, -2.25, 2],
    },
    projects: {
        pos: [-2, 4.5, 8.1],
        target: [-4.5, -2, -1],
    },
    skills: {
        pos: [2, 5, 8.8],
        target: [8.5, -2.2, -4],
    },
    about: {
        pos: [1.5, 4.5, 9.4],
        target: [5.5, -2.2, 1],
    },
    contact: {
        pos: [0.5, 4, 9.7],
        target: [2, -2.4, 3],
    },
};

const DEFAULT_CAMERA = { pos: [0, 5, 11] as [number, number, number], target: [0, 0, 0] as [number, number, number] };

function CameraRig({ focusTarget }: { focusTarget: string | null }) {
    const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));

    const target = focusTarget ? FOCUS_COORDS[focusTarget] : DEFAULT_CAMERA;

    const targetPos = useRef(new THREE.Vector3(...target.pos));
    const targetLook = useRef(new THREE.Vector3(...target.target));

    // Logic: Safe ref updates outside of render
    useEffect(() => {
        if (focusTarget) {
            targetPos.current.set(...FOCUS_COORDS[focusTarget].pos);
            targetLook.current.set(...FOCUS_COORDS[focusTarget].target);
        } else {
            targetPos.current.set(...DEFAULT_CAMERA.pos);
            targetLook.current.set(...DEFAULT_CAMERA.target);
        }
    }, [focusTarget]);

    useFrame((state) => {
        const cam = state.camera;
        const distance = cam.position.distanceTo(targetPos.current);
        const posLerp = THREE.MathUtils.clamp(distance * 0.08, 0.015, 0.05);
        const lookLerp = THREE.MathUtils.clamp(distance * 0.05, 0.01, 0.035);

        cam.position.lerp(targetPos.current, posLerp);
        lookAtRef.current.lerp(targetLook.current, lookLerp);
        cam.lookAt(lookAtRef.current);
    });

    return null;
}

export default function Experience({ focusTarget, onReset, onSelect, onCardClick }: ExperienceProps) {
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
                onPointerMissed={() => onReset()}
            >
                <CameraRig focusTarget={focusTarget} />

                {/* Projected Navigation Card */}
                {focusTarget && (
                    <Html
                        position={[
                            FOCUS_COORDS[focusTarget].target[0],
                            FOCUS_COORDS[focusTarget].target[1] + 1.2,
                            FOCUS_COORDS[focusTarget].target[2]
                        ]}
                        center
                        distanceFactor={10}
                        style={{ pointerEvents: 'auto' }}
                    >
                        <div className="animate-in fade-in zoom-in-95 duration-500 will-change-transform">
                            <ElectricBorder
                                color="#8b6f47"
                                speed={1}
                                chaos={0.15}
                                borderRadius={16}
                                className=""
                                style={{}}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCardClick();
                                    }}
                                    className="bg-[#fdfdfd]/95 backdrop-blur-md px-12 py-10 rounded-2xl border border-[#e8dcc8] shadow-2xl group transition-all hover:scale-105 active:scale-95 text-left w-80"
                                >
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b6f47]/60 mb-1">
                                        {CARD_CONTENT[focusTarget]?.title}
                                    </div>
                                    <div className="text-2xl font-bold text-[#4a3a28] flex items-center gap-3">
                                        <span>{CARD_CONTENT[focusTarget]?.label}</span>
                                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </button>
                            </ElectricBorder>
                        </div>
                    </Html>
                )}

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