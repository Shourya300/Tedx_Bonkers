import * as THREE from "three";
import { useRef, useState, useEffect, memo } from "react";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import BackgroundPlane from "./Backgroundplane";
import { scrollSync } from "@/lib/scrollStore";

import {
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PHASE_START = 0.45;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FluidGlass({
  mode = "lens",
  lensProps = {},
  ...props
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
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
  const [isMobile, setIsMobile] = useState(false);
  
  // Idle detection for initial state only
  const lastPointerMoveTime = useRef(Date.now());
  const idleTime = useRef(0);

  const logoTexture = useTexture("/images/Landing_Page/TEDx LOGO (NO BG).png");

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let geo = nodes[geometryKey]?.geometry;
    if (!geo) {
      const firstMesh = Object.values(nodes).find((n) => n.type === "Mesh");
      if (firstMesh) geo = firstMesh.geometry;
    }
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
    }
  }, [nodes, geometryKey]);
  
  // Track pointer movement
  useEffect(() => {
    const handlePointerMove = () => {
      lastPointerMoveTime.current = Date.now();
      idleTime.current = 0;
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('pointermove', handlePointerMove);
      return () => window.removeEventListener('pointermove', handlePointerMove);
    }
  }, []);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    // GSAP in index.tsx is the single source of truth
    const scrollProgress = scrollSync.rawProgress;

    // PHASE 1: Lens growth
    const lensProgress = Math.min(scrollProgress / PHASE_START, 1);

    // PHASE 2: Content movement (synced via scrollSync)
    const contentProgress = scrollSync.progress;
    
    // Check if user is idle ONLY before scrolling starts
    const timeSinceLastMove = Date.now() - lastPointerMoveTime.current;
    const isIdle = timeSinceLastMove > 2000 && scrollProgress === 0;
    
    if (isIdle) {
      idleTime.current += delta;
    }
    
    // Update shared state for cursor hiding
    scrollSync.isLensIdle = isIdle;

    /* ---------- LENS POSITION ---------- */
    
    let destX, destY;
    
    if (scrollProgress === 0 && isIdle) {
      // Before any scrolling, move randomly in small area at center to hint at hidden content
      const randomRadius = isMobile ? 0.3 : 0.19;
      const randomSpeed = 0.6;
      destX = Math.sin(idleTime.current * randomSpeed) * randomRadius * (isMobile ? 0.5 : 1);
      destY = Math.cos(idleTime.current * randomSpeed * 0.7) * randomRadius * (isMobile ? 0.8 : 0.5);
    } else if (lensProgress < 1) {
      // During lens growth, follow pointer
      destX = ((pointer.x * v.width) / 2) * (1 - lensProgress);
      destY = ((pointer.y * v.height) / 2) * (1 - lensProgress);
    } else {
      // After lens fully grown, stay centered
      destX = 0;
      destY = 0;
    }

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    /* ---------- LENS SCALE ---------- */

    const baseScale = Math.min(
      0.1,
      (v.width * 0.9) / (geoWidthRef.current || 1)
    );

    const maxScale = (v.width * 2.5) / (geoWidthRef.current || 1);

    const targetScale = THREE.MathUtils.lerp(baseScale, maxScale, lensProgress);

    if (modeProps.scale == null) {
      easing.damp(ref.current.scale, "x", targetScale, 0.4, delta);
      easing.damp(ref.current.scale, "y", targetScale, 0.4, delta);
      easing.damp(ref.current.scale, "z", targetScale, 0.4, delta);
    }

    /* ---------- LOGO MOVE (AFTER LENS FULL) ---------- */

    // Logo reaches destination in the first 50% of content scroll, then stays fixed
    const LOGO_PHASE_DURATION = 0.5;
    const logoShiftProgress = THREE.MathUtils.clamp(
      contentProgress / LOGO_PHASE_DURATION,
      0,
      1
    );

    // Target position - use actual viewport at logo's z position
    const logoViewport = viewport.getCurrentViewport(camera, [0, 0, -59.5]);
    
    if (logoRef.current) {
      if (isMobile) {
        // On mobile, move logo up slightly
        const targetLogoY = THREE.MathUtils.lerp(0, logoViewport.height * 0.15, logoShiftProgress);
        logoRef.current.position.x = 0;
        logoRef.current.position.y = targetLogoY;
      } else {
        // On desktop, move logo left
        const targetLogoX = THREE.MathUtils.lerp(0, -logoViewport.width * 0.25, logoShiftProgress);
        logoRef.current.position.x = targetLogoX;
        logoRef.current.position.y = 0;
      }
    }

    /* ---------- FBO RENDER ---------- */

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps;
  const geometry =
    nodes[geometryKey]?.geometry ||
    Object.values(nodes).find((n) => n.type === "Mesh")?.geometry;

  return (
    <>
      {createPortal(
        <>
          <BackgroundPlane isMobile={isMobile} />
          <mesh ref={logoRef} position={[0, isMobile ? -2 : -1, -59.5]} scale={isMobile ? 1 : 1.5}>
            <planeGeometry args={isMobile ? [10, 10] : [13, 13]} />
            <meshBasicMaterial map={logoTexture} transparent />
          </mesh>
          {children}
        </>,
        scene
      )}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          map={buffer.texture}
          transparent
          opacity={children ? 1 : 0}
        />
      </mesh>
      <mesh
        ref={ref}
        position-z={1}
        scale={scale ?? 0.1}
        rotation-x={Math.PI / 2}
        geometry={geometry}
        {...props}
      >
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
  return (
    <ModeWrapper
      glb="/assets/lens.glb"
      geometryKey="Cylinder"
      followPointer
      modeProps={modeProps}
      {...p}
    />
  );
}
