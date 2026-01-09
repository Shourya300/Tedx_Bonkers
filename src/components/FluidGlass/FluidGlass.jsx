import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import BackgroundPlane from "./Backgroundplane";

import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  useTexture,
} from '@react-three/drei';
import { easing } from 'maath';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, ...props }) {
    
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
        <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="city" />
            <Lens modeProps={lensProps} />
        </Canvas>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);
  const scrollProgressRef = useRef(0);
  const logoRef = useRef();
  
  const logoTexture = useTexture("/images/Landing_Page/TEDx LOGO (NO BG).png");

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "+=5000", // Matches the current slowed down scroll range
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    let geo = nodes[geometryKey]?.geometry;
    if (!geo) {
        const firstMesh = Object.values(nodes).find(n => n.type === 'Mesh');
        if (firstMesh) geo = firstMesh.geometry;
    }
    if (geo) {
        geo.computeBoundingBox();
        geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const sp = scrollProgressRef.current;
    
    // Stage 1: Move to center (0 -> 0.3)
    const centerFactor = Math.min(1, sp / 0.3);
    const destX = followPointer ? ((pointer.x * v.width) / 2) * (1 - centerFactor) : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? ((pointer.y * v.height) / 2) * (1 - centerFactor) : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    // Stage 1: Scale to max (0 -> 0.3)
    const baseScale = Math.min(0.1, (v.width * 0.9) / (geoWidthRef.current || 1));
    const maxScale = (v.width * 2.5) / (geoWidthRef.current || 1);
    const scalingFactor = Math.min(1, sp / 0.3);
    const targetScale = THREE.MathUtils.lerp(baseScale, maxScale, scalingFactor);

    // Stage 2: Logo shifts left (0.3 -> 1.0)
    const logoShiftFactor = Math.max(0, (sp - 0.3) / 0.7);
    const targetLogoX = logoShiftFactor * -25;
    if (logoRef.current) {
      easing.damp(logoRef.current.position, 'x', targetLogoX, 0.4, delta);
    }

    if (modeProps.scale == null) {
      easing.damp(ref.current.scale, 'x', targetScale, 0.4, delta); // Increased damping to 0.4
      easing.damp(ref.current.scale, 'y', targetScale, 0.4, delta);
      easing.damp(ref.current.scale, 'z', targetScale, 0.4, delta);
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;
  const geometry = nodes[geometryKey]?.geometry || Object.values(nodes).find(n => n.type === 'Mesh')?.geometry;

  return (
    <>
      {createPortal(
        <>
          <BackgroundPlane />
          <mesh ref={logoRef} position={[0, 0, -59.5]} scale={1.5}>
            <planeGeometry args={[15, 9]} />
            <meshBasicMaterial map={logoTexture} transparent />
          </mesh>
          {children}
        </>,
        scene
      )}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={children ? 1 : 0} />
      </mesh>
      <mesh ref={ref} position-z={1} scale={scale ?? 0.1} rotation-x={Math.PI / 2} geometry={geometry} {...props}>
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.1}
          thickness={thickness ?? 0.7}
          anisotropy={anisotropy ?? 0.1}
          chromaticAberration={chromaticAberration ?? 0.05}
          transmission={1}
          roughness={0}
          attenuationDistance={0.8}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }) {
  return <ModeWrapper glb="/assets/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}
