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

const CARD_CONTENT: Record<string, { title: string; subtitle: string; description: string; label: string }> = {
    hero: {
        title: "WELCOME",
        subtitle: "The Creative Space",
        description: "Step into a world where design meets functionality. This is where the journey begins.",
        label: "Return to Top"
    },
    projects: {
        title: "PORTFOLIO",
        subtitle: "Digital Craftsmanship",
        description: "Explore a collection of projects built with precision, passion, and modern technologies.",
        label: "Go to Projects"
    },
    skills: {
        title: "EXPERTISE",
        subtitle: "Technical Arsenal",
        description: "A deep dive into the tools and frameworks that power my creative process.",
        label: "View Skills"
    },
    about: {
        title: "STORY",
        subtitle: "Behind the Scenes",
        description: "Learning the philosophy and the person behind the code. A balance of logic and art.",
        label: "About Me"
    },
    contact: {
        title: "CONNECT",
        subtitle: "Let's Collaborate",
        description: "Have an idea or just want to say hi? My lines are always open for new opportunities.",
        label: "Get in Touch"
    },
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
                                color="#22d3ee"
                                speed={1.2}
                                chaos={0.2}
                                borderRadius={24}
                                className=""
                                style={{}}
                            >
                                <div
                                    className="bg-[#0f172a]/95 backdrop-blur-2xl p-7 rounded-[24px] border border-white/10 shadow-[2xl] text-left w-[250px] h-[250px] flex flex-col overflow-hidden relative group/card"
                                >
                                    {/* Subtle top accent line */}
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/40 to-transparent"></div>
                                    
                                    {/* Category Badge - Top Right */}
                                    <div className="absolute top-5 right-5">
                                        <span className="text-[8px] font-bold text-[#22d3ee]/70 tracking-[0.15em] uppercase px-2 py-0.5 bg-[#22d3ee]/5 rounded border border-[#22d3ee]/20">
                                            {CARD_CONTENT[focusTarget]?.title}
                                        </span>
                                    </div>

                                    {/* Icon and Title Section */}
                                    <div className="flex items-start gap-3 mb-4">
                                        {/* Icon */}
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22d3ee]/10 via-[#22d3ee]/5 to-transparent border border-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee] relative overflow-hidden group/icon flex-shrink-0">
                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
                                            {focusTarget === 'hero' && <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                                            {focusTarget === 'projects' && <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
                                            {focusTarget === 'skills' && <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
                                            {focusTarget === 'about' && <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                            {focusTarget === 'contact' && <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                        </div>
                                        
                                        {/* Title */}
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <h2 className="text-[22px] font-black leading-[1.15] tracking-tight">
                                                <span className="text-white/90">{CARD_CONTENT[focusTarget]?.subtitle.split(' ')[0]}</span>
                                                <br />
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-[#06b6d4] to-[#0891b2]">
                                                    {CARD_CONTENT[focusTarget]?.subtitle.split(' ').slice(1).join(' ')}
                                                </span>
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-400 text-[11px] leading-relaxed mb-auto font-light">
                                        {CARD_CONTENT[focusTarget]?.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-7 h-7 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-[#f0db4f] to-[#f0db4f] flex items-center justify-center text-[9px] text-black font-black shadow-lg shadow-yellow-500/20">JS</div>
                                            <div className="w-7 h-7 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-[#61dafb] to-[#61dafb] flex items-center justify-center text-[9px] text-black font-black shadow-lg shadow-cyan-400/20">R</div>
                                            <div className="w-7 h-7 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-[#3178c6] to-[#3178c6] flex items-center justify-center text-[9px] text-white font-black shadow-lg shadow-blue-500/20">TS</div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onCardClick();
                                            }}
                                            className="group/btn relative bg-white hover:bg-[#22d3ee] text-slate-900 hover:text-white font-bold px-4 py-2 rounded-lg text-[11px] uppercase tracking-wide transition-all duration-200 active:scale-95 shadow-lg hover:shadow-[#22d3ee]/30 flex items-center gap-1.5 overflow-hidden"
                                        >
                                            <span className="relative z-10">Enter</span>
                                            <svg className="w-3 h-3 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
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