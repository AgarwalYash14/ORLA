import { Canvas, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { FiDownload } from 'react-icons/fi'
import { IoCubeOutline } from 'react-icons/io5'
import { VscDebugRestart } from 'react-icons/vsc'

interface ModelProps {
    modelData: { model_url: string } | null
    isLoading?: boolean
}

export default function Model({ modelData, isLoading = false }: ModelProps) {
    const [displayError, setDisplayError] = useState<string | null>(null)
    const [modelLoading, setModelLoading] = useState(false)

    const handleDownload = () => {
        if (modelData?.model_url) {
            // Create a download link
            const link = document.createElement('a')
            link.href = modelData.model_url

            // Extract filename from URL
            const filename = modelData.model_url.split('/').pop() || 'model.glb'
            link.download = filename

            // Trigger download
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    const handleResetView = () => {
        if (window && (window as any).resetCamera) {
            ;(window as any).resetCamera()
        }
    }

    function CameraControls() {
        const { camera } = useThree()
        const controlsRef = useRef<any>(null)

        // Makes this ref available to the parent component
        useEffect(() => {
            if (window) {
                ;(window as any).resetCamera = () => {
                    if (controlsRef.current) {
                        // Reset camera position
                        camera.position.set(0, 0, 5)
                        camera.lookAt(0, 0, 0)
                        // Reset controls
                        controlsRef.current.reset()
                    }
                }
            }
        }, [camera])

        return <OrbitControls ref={controlsRef} />
    }

    // Component to render the GLTF model
    function GLTFModel({ url }: { url: string }) {
        const { scene } = useGLTF(url)
        console.log('GLTF model loaded successfully:', url)

        useEffect(() => {
            setModelLoading(false)
        }, [])

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
        setModelLoading(true)

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
                    setModelLoading(false)
                }
            })
            .catch((err) => {
                console.error(
                    'Error checking model URL:',
                    modelData.model_url,
                    err
                )
                setDisplayError('Failed to load 3D model: Network error')
                setModelLoading(false)
            })
    }, [modelData])

    return (
        <div className="flex h-full flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                Model
                <div className="flex items-center gap-2">
                    <VscDebugRestart
                        onClick={handleResetView}
                        className="hover:bg-tertiary cursor-pointer rounded-md p-1 transition duration-200 ease-in-out"
                        size={24}
                    />
                    <FiDownload
                        onClick={handleDownload}
                        className="hover:bg-tertiary cursor-pointer rounded-md p-1 transition duration-200 ease-in-out"
                        size={24}
                    />
                </div>
            </div>
            {displayError ? (
                <span className="m-auto flex text-red-500">{displayError}</span>
            ) : isLoading ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                    <div
                        className="border-tertiary absolute inset-0 rounded-md border bg-gradient-to-br from-blue-50 via-blue-200 to-blue-50 bg-[length:300%_300%]"
                        style={{
                            animation: 'gradientFlow 4s ease infinite',
                        }}
                    >
                        <div className="flex h-full flex-col items-center justify-center">
                            <IoCubeOutline className="mb-3 animate-bounce text-4xl text-blue-600 opacity-80" />
                            <p className="text-sm text-gray-600">
                                Generating model...
                            </p>
                        </div>
                    </div>
                </div>
            ) : modelData && modelData.model_url ? (
                <div
                    style={{ height: '100%', width: '100%' }}
                    className="relative"
                >
                    {modelLoading && (
                        <div
                            className="border-tertiary/50 absolute inset-0 z-10 rounded-md border bg-gradient-to-br from-blue-50 via-blue-200 to-blue-50 bg-[length:300%_300%]"
                            style={{
                                animation: 'gradientFlow 4s ease infinite',
                            }}
                        >
                            <div className="flex h-full items-center justify-center">
                                <p className="text-sm text-gray-600">
                                    Loading model...
                                </p>
                            </div>
                        </div>
                    )}
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
                        <CameraControls />
                    </Canvas>
                </div>
            ) : (
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                    <div className="border-tertiary absolute inset-0 rounded-md border bg-neutral-300">
                        <div className="flex h-full flex-col items-center justify-center">
                            <p className="mb-2 text-center text-sm text-gray-600">
                                No model generated yet
                            </p>
                            <p className="text-center text-xs text-gray-500">
                                Select an image and click "Generate Model"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
