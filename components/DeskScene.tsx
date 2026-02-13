"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface InteractiveObjectProps {
    children: React.ReactNode;
    sectionId: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}

interface InteractiveGroupProps extends InteractiveObjectProps {
    isMain?: boolean;
    hoverIntensity?: number;
}

function InteractiveGroup({
    children,
    sectionId,
    position,
    rotation = [0, 0, 0],
    scale = 1,
    isMain = false,
    hoverIntensity = 1.08,
}: InteractiveGroupProps) {
    const [hovered, setHovered] = useState(false);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const targetScale = hovered ? scale * hoverIntensity : scale;
            groupRef.current.scale.lerp(
                new THREE.Vector3(targetScale, targetScale, targetScale),
                0.15
            );

            // Subtle floating animation when hovered
            if (hovered) {
                groupRef.current.position.y =
                    position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            }
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (e: any) => {
        e.stopPropagation();
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            scale={isMain ? scale * 1.2 : scale}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = "default";
            }}
            onClick={handleClick}
        >
            {children}
            {/* Enhanced glow effect on hover */}
            {hovered && (
                <>
                    <pointLight
                        position={[0, 0.5, 0.5]}
                        intensity={2}
                        color="#60a5fa"
                        distance={4}
                        decay={2}
                    />
                    <pointLight
                        position={[0, -0.3, 0]}
                        intensity={0.5}
                        color="#3b82f6"
                        distance={2}
                        decay={2}
                    />
                </>
            )}
        </group>
    );
}

export function Desk() {
    return (
        <group position={[0, -2.5, -2]}>
            {/* Main wooden table top with simulated chamfered edges */}
            <mesh receiveShadow castShadow>
                <boxGeometry args={[26, 0.5, 12]} />
                <meshStandardMaterial
                    color="#8b6f47"
                    roughness={0.4}
                    metalness={0}
                />
            </mesh>

            {/* Subtle bevel highlight meshes (edges) */}
            <mesh position={[0, 0.23, 6]} rotation={[Math.PI / 4, 0, 0]}>
                <boxGeometry args={[26, 0.05, 0.05]} />
                <meshStandardMaterial color="#a68a64" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.23, -6]} rotation={[Math.PI / 4, 0, 0]}>
                <boxGeometry args={[26, 0.05, 0.05]} />
                <meshStandardMaterial color="#a68a64" roughness={0.3} />
            </mesh>

            {/* Darker wood edge detail */}
            <mesh position={[0, -0.26, 0]}>
                <boxGeometry args={[26.1, 0.02, 12.1]} />
                <meshStandardMaterial
                    color="#6b5536"
                    roughness={0.8}
                />
            </mesh>

            {/* Wooden desk legs */}
            {[
                [-12, -1.5, -5.5],
                [12, -1.5, -5.5],
                [-12, -1.5, 5.5],
                [12, -1.5, 5.5],
            ].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <cylinderGeometry args={[0.15, 0.18, 3, 16]} />
                    <meshStandardMaterial
                        color="#8b6f47"
                        roughness={0.6}
                        metalness={0}
                    />
                </mesh>
            ))}

            {/* Shadow catcher floor - lowered opacity and warmer tone */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -4.5, 0]}
                receiveShadow
            >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color="#e0d7c6"
                    transparent
                    opacity={0.12}
                />
            </mesh>
        </group>
    );
}

export function Laptop() {
    return (
        <InteractiveGroup
            sectionId="projects"
            position={[-4.5, -2.2, -1]}
            rotation={[0, 0.45, 0]}
            scale={2}
            isMain
            hoverIntensity={1.1}
        >
            {/* Laptop base */}
            <mesh castShadow>
                <boxGeometry args={[1.5, 0.06, 1.1]} />
                <meshStandardMaterial
                    color="#1e293b"
                    roughness={0.25}
                    metalness={0.8}
                />
            </mesh>

            {/* Hinge detail */}
            <mesh position={[0, 0.04, -0.53]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.03, 0.03, 1.4, 8]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Keyboard area */}
            <mesh position={[0, 0.04, 0.1]}>
                <planeGeometry args={[1.3, 0.8]} />
                <meshStandardMaterial
                    color="#0f172a"
                    roughness={0.4}
                />
            </mesh>

            {/* Thinner Screen */}
            <mesh position={[0, 0.55, -0.55]} rotation={[-0.2, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 1.1, 0.03]} />
                <meshStandardMaterial
                    color="#0f172a"
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>

            {/* Screen bezel */}
            <mesh position={[0, 0.55, -0.525]} rotation={[-0.2, 0, 0]}>
                <planeGeometry args={[1.45, 1.05]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>

            {/* Screen content glow */}
            <mesh position={[0, 0.55, -0.5]} rotation={[-0.2, 0, 0]}>
                <planeGeometry args={[1.35, 0.95]} />
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Screen light falloff */}
            <pointLight
                position={[0, 0.6, -0.2]}
                intensity={0.4}
                color="#60a5fa"
                distance={3}
            />
        </InteractiveGroup>
    );
}

export function Books() {
    const books = [
        { color: "#7c2d12", height: 0.12, offset: 0.05, rot: 0 },
        { color: "#1e3a8a", height: 0.12, offset: 0.18, rot: 0.12 },
        { color: "#065f46", height: 0.14, offset: 0.32, rot: -0.08 },
    ];

    return (
        <InteractiveGroup
            sectionId="about"
            position={[5.5, -2.2, 1]}
            rotation={[0, -0.4, 0]}
            scale={1.6}
        >
            {books.map((book, i) => (
                <group key={i} position={[0, book.offset, 0]} rotation={[0, book.rot, 0]}>
                    {/* Book body with subtle rounding simulation */}
                    <mesh castShadow>
                        <boxGeometry args={[0.7, book.height, 0.9]} />
                        <meshStandardMaterial
                            color={book.color}
                            roughness={0.65}
                            metalness={0}
                        />
                    </mesh>
                    {/* Rounded spine simulation */}
                    <mesh position={[-0.35, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[book.height / 2, book.height / 2, 0.9, 8]} />
                        <meshStandardMaterial color={book.color} roughness={0.65} />
                    </mesh>
                    {/* Pages edge */}
                    <mesh position={[0.36, 0, 0]}>
                        <boxGeometry args={[0.02, book.height - 0.02, 0.88]} />
                        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
                    </mesh>
                </group>
            ))}
        </InteractiveGroup>
    );
}

export function Phone() {
    return (
        <InteractiveGroup
            sectionId="contact"
            position={[2, -2.4, 3]}
            rotation={[-Math.PI / 2, 0, 0.4]}
            scale={1.3}
        >
            {/* Thinner Phone body */}
            <mesh castShadow>
                <boxGeometry args={[0.35, 0.7, 0.015]} />
                <meshStandardMaterial
                    color="#020617"
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>

            {/* Rounded edge effect (translucent border) */}
            <mesh scale={[1.05, 1.05, 1.1]} position={[0, 0, 0]}>
                <boxGeometry args={[0.35, 0.7, 0.01]} />
                <meshStandardMaterial color="#020617" transparent opacity={0.2} />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0, 0.008]}>
                <boxGeometry args={[0.33, 0.68, 0.001]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>

            {/* Screen glow */}
            <mesh position={[0, 0, 0.01]} rotation={[0, 0, 0]}>
                <planeGeometry args={[0.32, 0.65]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#3b82f6"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </InteractiveGroup>
    );
}

export function CoffeeMug() {
    return (
        <InteractiveGroup
            sectionId="hero"
            position={[-5, -2.25, 2]}
            rotation={[0, 0.8, 0]}
            scale={1.3}
        >
            {/* Mug body - white ceramic */}
            <mesh castShadow>
                <cylinderGeometry args={[0.2, 0.22, 0.5, 24]} />
                <meshStandardMaterial
                    color="#fdfdfd"
                    roughness={0.25}
                    metalness={0}
                />
            </mesh>

            {/* Refined handle (Torus) */}
            <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <torusGeometry args={[0.12, 0.035, 12, 16, Math.PI]} />
                <meshStandardMaterial
                    color="#fdfdfd"
                    roughness={0.25}
                />
            </mesh>

            {/* Coffee surface */}
            <mesh position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 0.01, 16]} />
                <meshStandardMaterial
                    color="#422006"
                    roughness={0.1}
                />
            </mesh>
        </InteractiveGroup>
    );
}

export function DeskLamp() {
    return (
        <InteractiveGroup sectionId="skills" position={[8.5, -2.2, -4]} scale={2.5}>
            {/* Base */}
            <mesh castShadow>
                <cylinderGeometry args={[0.4, 0.45, 0.08, 32]} />
                <meshStandardMaterial
                    color="#334155"
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Pole */}
            <mesh position={[0, 0.7, 0]} castShadow>
                <cylinderGeometry args={[0.03, 0.035, 1.4, 16]} />
                <meshStandardMaterial
                    color="#475569"
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Joint/Hinge */}
            <mesh position={[0, 1.4, 0]} castShadow>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>

            {/* Arm */}
            <mesh position={[-0.2, 1.4, 0]} rotation={[0, 0, 0.6]} castShadow>
                <cylinderGeometry args={[0.025, 0.03, 0.5, 8]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
            </mesh>

            {/* Lamp shade */}
            <mesh position={[-0.4, 1.4, 0]} rotation={[0, 0, 0.6]} castShadow>
                <cylinderGeometry args={[0.25, 0.15, 0.4, 24]} />
                <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>

            {/* Bulb (Sphere) */}
            <mesh position={[-0.5, 1.35, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#fffbe6" emissive="#fef08a" emissiveIntensity={2} />
            </mesh>

            {/* Soft Warm Light */}
            <pointLight
                position={[-0.6, 1.3, 0]}
                intensity={1.5}
                color="#fef08a"
                distance={6}
                decay={2}
            />
        </InteractiveGroup>
    );
}

export function Notepad() {
    return (
        <InteractiveGroup
            sectionId="about"
            position={[0, -2.22, 0.5]}
            rotation={[0, 0.2, 0]}
            scale={1.8}
        >
            <mesh castShadow>
                <boxGeometry args={[0.8, 0.03, 1]} />
                <meshStandardMaterial color="#fef3c7" roughness={0.8} />
            </mesh>

            {/* Pen */}
            <mesh position={[0.2, 0.03, 0]} rotation={[0, 0, 0.3]} castShadow>
                <cylinderGeometry args={[0.015, 0.015, 0.6, 12]} />
                <meshStandardMaterial
                    color="#1e40af"
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>
        </InteractiveGroup>
    );
}

export default function DeskScene() {
    const groupRef = useRef<THREE.Group>(null);
    const { mouse } = useThree();

    useFrame((state) => {
        if (groupRef.current) {
            // Smoother parallax effect
            const targetRotationY = mouse.x * 0.1;
            const targetRotationX = -mouse.y * 0.06;

            groupRef.current.rotation.y +=
                (targetRotationY - groupRef.current.rotation.y) * 0.03;
            groupRef.current.rotation.x +=
                (targetRotationX - groupRef.current.rotation.x) * 0.03;

            // Subtle breathing animation
            const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
            groupRef.current.position.y = breathe;
        }
    });

    return (
        <group ref={groupRef}>
            <Desk />
            <Laptop />
            <Books />
            <Phone />
            <CoffeeMug />
            <DeskLamp />
            <Notepad />
        </group>
    );
}