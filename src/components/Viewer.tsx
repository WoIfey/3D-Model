'use client'
import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from '@react-three/drei'
import { Loader2 } from 'lucide-react'
import { Vector3 } from 'three'
import Model from './Model'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

function Spinner() {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm">
			<div className="flex flex-col items-center gap-4">
				<Loader2 className="size-20 animate-spin text-white" />
				<p className="text-white text-lg font-medium">Loading Model...</p>
			</div>
		</div>
	)
}

export default function ModelViewer() {
	const [selectedAnimation, setSelectedAnimation] = useState<string>('')
	const [animationNames, setAnimationNames] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(true)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const controlsRef = useRef<any>(null)

	const handleModelLoad = (center: Vector3) => {
		if (controlsRef.current) {
			controlsRef.current.target.set(center.x, center.y, center.z)
			controlsRef.current.update()
			setIsLoading(false)
		}
	}

	return (
		<div className="w-full h-screen flex items-center flex-col relative bg-gray-800">
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
					<Select
						value={selectedAnimation}
						onValueChange={setSelectedAnimation}
						disabled={isLoading}
					>
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
					<PerspectiveCamera makeDefault position={[0, 1, 3]} />
					<Model
						selectedAnimation={selectedAnimation}
						setSelectedAnimation={setSelectedAnimation}
						setAnimationNames={setAnimationNames}
						onLoad={handleModelLoad}
					/>
					<OrbitControls ref={controlsRef} makeDefault />
					<Environment preset="studio" />
				</Canvas>
				{isLoading && <Spinner />}
			</div>
		</div>
	)
}
