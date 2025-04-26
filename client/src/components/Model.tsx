import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'

interface ModelProps {
    modelData: { model_url: string } | null
}

export default function Model({ modelData }: ModelProps) {
    const [displayError, setDisplayError] = useState<string | null>(null)

    // Component to render the GLTF model
    function GLTFModel({ url }: { url: string }) {
        const { scene } = useGLTF(url)
        console.log('GLTF model loaded successfully:', url)

        // Debug scene contents
        scene.traverse((child) => {
            console.log('Scene child:', child.name, child.type)
            if (child instanceof THREE.Mesh) {
                console.log('Mesh material:', child.material)
                // Ensure material for untextured meshes
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 'white',
                    })
                }
            }
        })

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = maxDim > 0 ? 2 / maxDim : 1
        scene.position.sub(center)
        scene.scale.set(scale, scale, scale)
        console.log('Model size:', size.x, size.y, size.z, 'Scale:', scale)

        return <primitive object={scene} />
    }

    useEffect(() => {
        if (!modelData || !modelData.model_url) {
            console.log('No model data available:', modelData)
            setDisplayError(null)
            return
        }

        console.log('Received model data:', modelData)

        // Verify model URL accessibility
        fetch(modelData.model_url, { method: 'HEAD' })
            .then((response) => {
                if (response.ok) {
                    console.log('Model URL is accessible:', modelData.model_url)
                    setDisplayError(null)
                } else {
                    console.error(
                        'Model URL is not accessible:',
                        modelData.model_url,
                        response.status
                    )
                    setDisplayError(
                        'Failed to load 3D model: File not found or inaccessible'
                    )
                }
            })
            .catch((err) => {
                console.error(
                    'Error checking model URL:',
                    modelData.model_url,
                    err
                )
                setDisplayError('Failed to load 3D model: Network error')
            })
    }, [modelData])

    return (
        <div className="p-4 flex flex-col gap-4 h-full">
            <h1>Model</h1>
            {displayError ? (
                <span className="flex m-auto text-red-500">{displayError}</span>
            ) : modelData && modelData.model_url ? (
                <div style={{ height: '100%', width: '100%' }}>
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />
                        <directionalLight
                            position={[-5, 5, 5]}
                            intensity={0.5}
                        />
                        <directionalLight
                            position={[0, -5, 5]}
                            intensity={0.3}
                        />
                        <Suspense
                            fallback={
                                <mesh>
                                    <boxGeometry />
                                    <meshStandardMaterial color="gray" />
                                </mesh>
                            }
                        >
                            <GLTFModel url={modelData.model_url} />
                            <Environment preset="city" />
                        </Suspense>
                        <OrbitControls />
                    </Canvas>
                </div>
            ) : (
                <span className="flex m-auto text-tertiary">
                    Please select an image and generate a model
                </span>
            )}
        </div>
    )
}
