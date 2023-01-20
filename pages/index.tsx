import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import React, { Suspense, useEffect } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/gltf/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const CameraController = () => {
  const { camera, gl } = useThree();
  
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement)
      controls.enablePan = false;
      controls.position0.set(0, 0, 0);
      
      controls.minPolarAngle = 0.43 * Math.PI;
      controls.maxPolarAngle = 0.45 * Math.PI;
      
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;
      controls.update();
      
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

function Island() {
  const island = useLoader(GLTFLoader, '/island.glb', (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <Suspense fallback={null}>
      <CameraController />
      <primitive 
        object={island.scene} 
        scale={[0.33, 0.33, 0.33]}
        rotation={[0, 0, 0]}
      />
    </Suspense>
  )
}

function Cyclist() {
  const cyclist = useLoader(GLTFLoader, '/cyclist.glb', (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  return (
    <Suspense fallback={null}>
      <primitive 
        object={cyclist.scene} 
        scale={[0.1, 0.1, 0.1]} 
        position={[0, 0, 3.8]
      }/>
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
          <Island />
          <Cyclist />
        </Canvas>
      </main>
    </>
  )
}
