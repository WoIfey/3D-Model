'use client'
import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from '@react-three/drei'
import { Spinner } from '@/components/ui/spinner'
import { Vector3 } from 'three'
import type { OrbitControls as OrbitControlsTypes } from 'three-stdlib'
import Model from './Model'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

function Loader({ isLoading }: { isLoading: boolean }) {
	return (
		<div
			className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-200 ${
				isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div className="flex flex-col items-center gap-4">
				<Spinner className="size-10" />
			</div>
		</div>
	)
}

export default function ModelViewer() {
	const [selectedAnimation, setSelectedAnimation] = useState<string>('')
	const [animationNames, setAnimationNames] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const controlsRef = useRef<OrbitControlsTypes>(null)

	const handleModelLoad = (center: Vector3) => {
		if (controlsRef.current) {
			controlsRef.current.target.set(center.x, center.y, center.z)
			controlsRef.current.update()
		}

		setTimeout(() => {
			setIsLoading(false)
		}, 200)
	}

	return (
		<div className="w-full h-screen flex items-center flex-col relative bg-black">
			<div className="fixed mt-10 z-50">
				<div className="hidden sm:block">
					<Tabs value={selectedAnimation} onValueChange={setSelectedAnimation}>
						<TabsList className="h-auto rounded-none border-b border-border bg-transparent p-0">
							{animationNames.map(name => (
								<TabsTrigger
									key={name}
									value={name}
									className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
								>
									{name}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
				<div className="block sm:hidden">
					<Select value={selectedAnimation} onValueChange={setSelectedAnimation}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Animation" />
						</SelectTrigger>
						<SelectContent>
							{animationNames.map(name => (
								<SelectItem key={name} value={name}>
									{name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="w-full flex-grow relative">
				<Canvas shadows>
					<PerspectiveCamera makeDefault position={[0, 1, 3]} fov={50} />
					<fog attach="fog" args={['#0a0a0f', 10, 20]} />
					<ambientLight intensity={0.5} />
					<Model
						selectedAnimation={selectedAnimation}
						setSelectedAnimation={setSelectedAnimation}
						setAnimationNames={setAnimationNames}
						onLoad={handleModelLoad}
					/>
					<OrbitControls
						ref={controlsRef}
						makeDefault
						enableDamping
						dampingFactor={0.05}
						rotateSpeed={0.5}
						minDistance={1}
						maxDistance={10}
						maxPolarAngle={Math.PI / 1.5}
					/>
					<Environment preset="city" background={false} />
				</Canvas>
				<Loader isLoading={isLoading} />
			</div>
		</div>
	)
}
