import { StyleSheet, Text, View } from 'react-native'
import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Plane, useGLTF } from '@react-three/drei'
import { BufferGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
import useControls from 'r3f-native-orbitcontrols'
import { SafeAreaView } from 'react-native-safe-area-context'
// import {Physics, useBox, useSphere, usePlane} from '@react-three/cannon'
// import modelPath from '../assets/model.glb'

// function Model(props) {
//     const gltf = useGLTF(modelPath)
//     return <primitive {...props} object={gltf.scene} />
// }

function Ball() {
  const ball = useRef()
    const {camera} = useThree()
    useFrame((state, delta) => {
      // console.log(camera.getWorldPosition(new Vector3()))
      const t = state.clock.getElapsedTime()
      // ball.current.position.y = (2.3 + Math.sin(t * 10)) / 5
    })

    const [ref] = useSphere(() => (
      {
        mass: 10,
        position: [0, 4, 0],
        args: [0.2, 64, 64]
      }
    ))
    return (
      <mesh ref={ref} castShadow receiveShadow position={new Vector3(0, 0.3, 0)}>
          <sphereGeometry args={[0.2, 64, 64]} />
          <meshStandardMaterial color={'#299aff'} />
        </mesh>
    )
}

function Board({positionY, index}: {positionY: number, index: number}) {
  const board = useRef()
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    // board.current.rotation.set(0, -((index * 0.05) + t), 0)
  })

  const [ref] = useBox(() => ({
    mass: 10,
    type: 'Static',
    position: [0,0,0]
  }))
  return (
  <mesh ref={ref} castShadow receiveShadow position={new Vector3(0, positionY, 0)}>
            {/* <Plane args={[2, 2]} /> */}
            {/* <bufferGeometry attach="geometry" {...geometry} /> */}
            {/* <meshBasicMaterial attach="material" {...material} /> */}
            <boxGeometry args={[2.5, 0.25, 3]} />
            <meshStandardMaterial color={'#fe7f28'} />
        </mesh>
  )
}

export default function Game() {
    // const geometry = new BufferGeometry()
    // const vertices = [0,0,0]
    // for (let i =0; i < 5; i++) {
    //     const angle = (i / 5) * Math.PI * 2
    //     vertices.push(Math.cos(angle), Math.sin(angle), 0)
    // }
    // geometry.setAttribute('position', new Float32Array(vertices))

    // const material = new MeshBasicMaterial({color: 0x00ff00, side: 2})

    const [OrbitControls, events] = useControls()
    
    
  return (
    <View style={{flex: 1}} {...events}>
      <SafeAreaView style={{flex: 1, width: '100%', height: '100%', zIndex: 10, position: 'absolute', top: 0, left: 0}}>
        <View style={{justifyContent: 'flex-end', flex: 1, marginBottom: 40}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 26, fontWeight: '700'}}>TAP AND HOLD TO PLAY</Text>
        </View>
      </SafeAreaView>
    <Canvas camera={{aspect: 0.46208530805687204, far: 1000, fov: 75, near: 0.1, position: [4.467824882373289, 2.2187742779302237, 3.597303822213644]}}>
      <color attach="background" args={['#f8ef76']} />
      <ambientLight color={'#ffffff'} intensity={0.7} />
      {/* <pointLight position={[2, 1, 2]} intensity={20} /> */}
      <directionalLight position={[10, 20, 0]} intensity={1.5} />

      <Suspense>
        {/* <Model /> */}
        {/* <mesh geometry={geometry} material={material}> */}
        <Physics>
        <Ball />
        {Array.from({length: 60}, (_, i) => <Board index={i} key={i} positionY={i == 0 ? 0 : -i * 0.4}/>)}
        </Physics>
      </Suspense>
      {/* <OrbitControls  /> */}
      {/* <OrbitControls /> */}
    </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({})