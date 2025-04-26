import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

interface ModelProps {
    modelData: { type: string; path: string } | null
}

export default function Model({ modelData }: ModelProps) {
    const renderModel = () => {
        if (!modelData || !modelData.path) return null
        try {
            const { scene } = useGLTF(modelData.path)
            return <primitive object={scene} />
        } catch (error) {
            console.error('Error loading 3D model:', error)
            return null
        }
    }

    return (
        <div className="p-4 flex flex-col gap-4 h-full">
            <h1>Model</h1>
            {modelData ? (
                <Canvas style={{ height: '400px' }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    {renderModel() || (
                        <span className="flex m-auto text-tertiary">
                            Failed to load 3D model
                        </span>
                    )}
                    <OrbitControls />
                </Canvas>
            ) : (
                <span className="flex m-auto text-tertiary">
                    Please select an image and generate a model
                </span>
            )}
        </div>
    )
}

useGLTF.preload('/static/models/sample.glb') // Preload a sample model if needed
