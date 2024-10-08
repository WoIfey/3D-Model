'use client'
import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
	OrbitControls,
	Environment,
	PerspectiveCamera,
} from '@react-three/drei'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { Vector3 } from 'three'
import Model from './Model'

function Spinner() {
	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<Loader2 className="size-16 animate-spin text-primary" />
		</div>
	)
}

export default function ModelViewer() {
	const [selectedAnimation, setSelectedAnimation] = useState('')
	const [animationNames, setAnimationNames] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const controlsRef = useRef<any>(null)

	const handleModelLoad = (center: Vector3) => {
		if (controlsRef.current) {
			controlsRef.current.target.set(center.x, center.y, center.z)
			controlsRef.current.update()
			setIsLoading(false)
		}
	}

	return (
		<div className="w-full h-screen flex items-center flex-col relative bg-gray-950">
			<div className="pt-4 absolute z-50">
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
