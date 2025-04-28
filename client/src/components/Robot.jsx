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
            <color attach="background" args={['#fff']} />

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
                        position={[0, -4.5, 0]}
                        scale={0.35}
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

export default function Robot() {
    const [modelLoading, setModelLoading] = useState(true)

    const handleError = (e) => {
        console.error('Error loading model:', e)
        setModelLoading(false)
    }

    return (
        <>
            <div className="h-full w-full">
                <div className="border-tertiary relative h-full w-full">
                    <div className="absolute top-3 right-3 z-10">
                        <div className="bg-secondary h-3 w-3" />
                    </div>

                    {modelLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                            <div className="border-secondary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
                            <span className="text-tertiary ml-2">
                                Loading 3D preview...
                            </span>
                        </div>
                    )}

                    <Canvas
                        className="h-full w-full"
                        onCreated={() => setModelLoading(false)}
                        onError={handleError}
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        dpr={[1, 2]}
                        gl={{ antialias: true }}
                    >
                        <Suspense fallback={null}>
                            <ModelViewer />
                            <OrbitControls
                                enablePan={false}
                                enableZoom={false}
                                autoRotate
                                autoRotateSpeed={0.5}
                                minPolarAngle={Math.PI / 2.5}
                                maxPolarAngle={Math.PI / 1.5}
                            />
                            <Preload all />
                        </Suspense>
                    </Canvas>

                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                        <div className="bg-secondary h-2 w-2" />
                        <p className="text-xs uppercase">
                            Interactive 3D Preview
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
