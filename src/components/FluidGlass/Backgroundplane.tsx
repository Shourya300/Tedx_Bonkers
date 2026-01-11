import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

interface BackgroundPlaneProps {
  isMobile?: boolean;
}

export default function BackgroundPlane({ isMobile = false }: BackgroundPlaneProps) {
  const texture = useTexture("/images/Landing_Page/Logo_Bg.png");

  // Adjust dimensions for mobile
  const width = isMobile ? 30 : 43;
  const height = isMobile ? 18 : 26;

  // Create vignette shader material
  const vignetteMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        vignetteStrength: { value: 1.2 },
        vignetteSize: { value: 0.3 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float vignetteStrength;
        uniform float vignetteSize;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          float vignette = smoothstep(vignetteSize, vignetteSize + 0.6, dist);
          float alpha = vignette * vignetteStrength;
          gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
        }
      `,
    });
  }, []);

  return (
    <group>
      {/* Background plane */}
      <mesh position={[0, 0, -60]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Vignette overlay */}
      <mesh position={[0, 0, -59.9]}>
        <planeGeometry args={[width, height]} />
        <primitive object={vignetteMaterial} attach="material" />
      </mesh>
    </group>
  );
}
