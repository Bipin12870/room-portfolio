"use client";

import { Canvas } from "@react-three/fiber";
import DeskScene from "./DeskScene";

export default function Experience() {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full bg-transparent overflow-hidden">
            <Canvas
                shadows
                camera={{
                    position: [0, 5, 11], // Slightly higher and back for downward tilt
                    fov: 55, // Wider FOV for more immersive perspective
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
                    // Return to landing view
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                {/* 1. Low Ambient Light - Cinematic baseline */}
                <ambientLight intensity={0.15} />

                {/* 2. Key Directional Light - Main source with soft shadows */}
                <directionalLight
                    position={[10, 15, 8]}
                    intensity={0.6}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-left={-15}
                    shadow-camera-right={15}
                    shadow-camera-top={15}
                    shadow-camera-bottom={-15}
                />

                {/* 3. Fill Light (Opposite side) - Softens core shadows */}
                <pointLight position={[-10, 5, 5]} intensity={0.3} color="#f5e6d3" />

                {/* 4. Rim / Back Light - Separates objects from background */}
                <pointLight position={[0, 8, -10]} intensity={0.4} color="#ffffff" distance={25} />

                {/* 5. Floor Bounce / Under-glow */}
                <pointLight position={[0, -5, -2]} intensity={0.2} color="#d4c4a8" distance={15} />

                <DeskScene />
            </Canvas>
        </div>
    );
}

// Separate lighting rig component for better organization in larger scenes
export function LightingRig() {
    return (
        <>
            <ambientLight intensity={0.15} />
            <directionalLight position={[10, 15, 8]} intensity={0.6} castShadow />
            <pointLight position={[-10, 5, 5]} intensity={0.3} color="#f5e6d3" />
            <pointLight position={[0, 8, -10]} intensity={0.4} color="#ffffff" distance={25} />
        </>
    );
}