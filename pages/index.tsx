import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import * as THREE from 'three'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/gltf/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

function Scene() {
  const island = useLoader(GLTFLoader, '/island.glb', (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  const cyclist = useLoader(GLTFLoader, '/cyclist.glb', (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  })

  return (
    <Suspense fallback={null}>
      <primitive object={island.scene} scale={[0.4, 0.4, 0.4]} ref={meshRef}/>
      <primitive object={cyclist.scene} scale={[0.5, 0.5, 0.5]} />
    </Suspense>
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>3D Demo</title>
        <meta name="description" content="3D Website Demo with Three.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>      
        <Canvas className={styles.canvas}>
          <ambientLight />
          <Scene />
        </Canvas>
      </main>
    </>
  )
}
