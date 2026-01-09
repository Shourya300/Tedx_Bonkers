import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import BackgroundPlane from "./Backgroundplane";

import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ mode = 'lens', lensProps = {}, ...props }) {
    
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 }}>
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

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / (geoWidthRef.current || 1);
      ref.current.scale.setScalar(Math.min(0.1, desired));
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
          thickness={thickness ?? 1.1}
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
