'use client'
import { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

export default function Model({
	selectedAnimation,
	setSelectedAnimation,
	setAnimationNames,
	onLoad,
}: any) {
	const modelRef = useRef(null)
	const { scene, animations } = useGLTF('/model.glb')
	const { actions, names } = useAnimations(animations, modelRef)

	useEffect(() => {
		if (names.length > 0 && !selectedAnimation) {
			setSelectedAnimation(names[0])
		}
		setAnimationNames(names)

		const box = new THREE.Box3().setFromObject(scene)
		const center = new THREE.Vector3()
		box.getCenter(center)

		onLoad(center)
	}, [
		names,
		selectedAnimation,
		setSelectedAnimation,
		setAnimationNames,
		onLoad,
		scene,
	])

	useEffect(() => {
		Object.values(actions).forEach(action => action?.stop())

		if (actions[selectedAnimation]) {
			actions[selectedAnimation].reset().play()
		}
	}, [actions, selectedAnimation])

	return <primitive object={scene} ref={modelRef} />
}
