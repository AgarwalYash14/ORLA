import Marquee from 'react-fast-marquee'
import { Canvas } from '@react-three/fiber'
import {
    OrbitControls,
    Environment,
    useGLTF,
    Preload,
    useAnimations,
    BakeShadows,
    ContactShadows,
    SpotLight,
    Float,
} from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { hunyuan, hunyuan_logo, stability_ai } from '../assets'
import { useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

function ModelViewer() {
    const group = useRef()
    const { scene, animations } = useGLTF('/model.glb')
    const { actions, names } = useAnimations(animations, group)

    useEffect(() => {
        if (names.length > 0) {
            actions[names[0]]?.reset().fadeIn(0.5).play()
        }

        scene.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true
                object.receiveShadow = true

                if (object.material) {
                    object.material.envMapIntensity = 1.5
                    object.material.needsUpdate = true

                    if (
                        object.name.includes('eye') ||
                        object.name.includes('light') ||
                        object.name.includes('glow') ||
                        object.name.includes('screen')
                    ) {
                        object.material.emissive = new THREE.Color('#4361ee')
                        object.material.emissiveIntensity = 0.8
                    }
                }
            }
        })
    }, [scene, actions, names])

    return (
        <>
            <ambientLight intensity={0.2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.3}
                penumbra={1}
                intensity={0.8}
                castShadow
                shadow-mapSize={2048}
            />
            <spotLight
                position={[-10, 5, -10]}
                angle={0.5}
                penumbra={1}
                intensity={0.5}
                castShadow
                color="#4361ee"
            />
            <pointLight position={[0, 5, 0]} intensity={0.3} />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <group ref={group}>
                    <primitive
                        object={scene}
                        position={[0, -5.15, 0]}
                        scale={0.3}
                        rotation={[0, Math.PI / 5, 0]}
                    />
                </group>
            </Float>
            <Environment preset="warehouse" />
            <BakeShadows />
        </>
    )
}

useGLTF.preload('/model.glb')

export default function Hero() {
    const [modelLoading, setModelLoading] = useState(true)
    const navigate = useNavigate()

    const handleError = (e) => {
        console.error('Error loading model:', e)
        setModelLoading(false)
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="border-tertiary h-16 w-1/2 border-x-2">
                    <div className="border-tertiary h-16 w-1/2 border-r" />
                </div>
                <div className="relative flex w-full justify-center">
                    <div className="border-tertiary absolute h-full w-1/2 border-x-2" />
                    <div className="absolute top-3 flex w-full justify-between">
                        <div className="bg-secondary ms-4 h-3 w-3" />
                        {/* <div className="bg-secondary me-4 h-3 w-3" /> */}
                    </div>
                    <Marquee
                        speed={30}
                        gradient={false}
                        className="font-secondary marquee border-tertiary border-y pt-4 pb-10 text-[10rem] leading-[1] uppercase"
                    >
                        <span className="px-6" />
                        Type. Build. Render.
                    </Marquee>
                    <div className="absolute bottom-3 flex w-full justify-between">
                        <div className="ms-4 flex items-center gap-6 uppercase">
                            <div className="bg-secondary h-3 w-3" />
                            <h1 className="text-sm">
                                Type.<span className="px-6">Build.</span>Render.
                            </h1>
                        </div>
                        <div className="bg-secondary me-4 h-3 w-3" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <p className="border-tertiary border-b p-8 text-sm leading-6 tracking-wide">
                        ORLA redefines digital creation by transforming simple
                        text into stunning 3D models in seconds. Our AI-powered
                        platform bridges imagination and reality for creators,
                        designers, and developers.
                    </p>
                    <div className="border-tertiary relative col-span-1 flex-1 bg-white md:col-span-2 md:border-x-2">
                        <div className="absolute top-3 right-3 z-10">
                            <div className="bg-secondary h-3 w-3" />
                        </div>
                    </div>
                    <div className="border-tertiary border-b p-8">
                        <h2 className="mb-3 text-lg font-medium uppercase">
                            Transform Text to Reality
                        </h2>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="bg-secondary h-2 w-2" />
                                <span>Type your description</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-secondary h-2 w-2" />
                                <span>Our AI generates images</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="bg-secondary h-2 w-2" />
                                <span>Convert to 3D in one click</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => navigate('/generate')}
                            className="border-tertiary hover:bg-secondary mt-6 flex cursor-pointer items-center gap-3 border px-6 py-2 text-sm uppercase transition hover:text-white"
                        >
                            Try Now
                            <BsArrowRight />
                        </button>
                    </div>
                </div>
                <div className="border-tertiary flex h-20 max-h-40 w-full border-b-2">
                    <div className="flex h-full w-full items-center justify-between">
                        <div className="relative flex h-full w-1/4 items-center justify-center bg-stone-50 p-3">
                            <img
                                src={stability_ai}
                                alt="Stability AI"
                                className="max-h-full w-auto object-contain invert"
                            />
                            <div className="absolute right-32 bottom-[30px] h-[5px] w-[6px] rounded-full bg-red-600" />
                        </div>
                        <div className="flex h-full w-1/4 items-center justify-center bg-stone-50 p-4">
                            <img
                                src={hunyuan_logo}
                                alt="Hunyuan"
                                className="max-h-full w-auto"
                            />
                            <img
                                src={hunyuan}
                                alt="Hunyuan"
                                className="max-h-full w-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 h-full w-1/2">
                    <div className="border-tertiary relative h-full w-full">
                        <Canvas
                            className="z-50 h-full w-full"
                            onCreated={() => setModelLoading(false)}
                            onError={handleError}
                            camera={{ position: [0, -3.5, 5], fov: 50 }}
                            dpr={[1, 2]}
                            gl={{ antialias: true }}
                        >
                            <Suspense fallback={null}>
                                <ModelViewer />
                                <OrbitControls
                                    enablePan={false}
                                    enableZoom={false}
                                    // autoRotate
                                    autoRotateSpeed={0.5}
                                    minPolarAngle={Math.PI / 2.5}
                                    maxPolarAngle={Math.PI / 1.5}
                                />
                                <Preload all />
                            </Suspense>
                        </Canvas>
                        <div className="border-tertiary absolute bottom-0 h-[25vh] w-full border-x-2 bg-white 2xl:h-[40vh]" />
                        <div className="absolute bottom-24 -left-16 z-10 flex rotate-270 items-center gap-2">
                            <div className="bg-secondary h-2 w-2" />
                            <p className="text-xs uppercase">
                                Interactive 3D Preview
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
