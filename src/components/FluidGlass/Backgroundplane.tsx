import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

interface BackgroundPlaneProps {
  isMobile?: boolean;
}

export default function BackgroundPlane({
  isMobile = false,
}: BackgroundPlaneProps) {
  const texture = useTexture("/images/Landing_Page/Logo_Bg.png");

  const blurMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uBlurAmount: { value: isMobile ? 0.004 : 0.004 }, // smaller = sharper
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform sampler2D uTexture;
      uniform float uBlurAmount;
      varying vec2 vUv;

      void main() {
        vec4 color = vec4(0.0);

        // Simple 9-tap blur (no brightness change)
        color += texture2D(uTexture, vUv + vec2(-uBlurAmount, -uBlurAmount));
        color += texture2D(uTexture, vUv + vec2( 0.0, -uBlurAmount));
        color += texture2D(uTexture, vUv + vec2( uBlurAmount, -uBlurAmount));

        color += texture2D(uTexture, vUv + vec2(-uBlurAmount, 0.0));
        color += texture2D(uTexture, vUv);
        color += texture2D(uTexture, vUv + vec2( uBlurAmount, 0.0));

        color += texture2D(uTexture, vUv + vec2(-uBlurAmount, uBlurAmount));
        color += texture2D(uTexture, vUv + vec2( 0.0, uBlurAmount));
        color += texture2D(uTexture, vUv + vec2( uBlurAmount, uBlurAmount));

        gl_FragColor = color / 9.0;
      }
    `,
    });
  }, [texture, isMobile]);

  // Adjust dimensions for mobile
  const width = isMobile ? 30 : 43;
  const height = isMobile ? 18 : 26;

  return (
    <group>
      {/* Background plane */}
      <mesh position={[0, 0, -60]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Vignette overlay */}
      <mesh position={[0, 0, -60]}>
        <planeGeometry args={[width, height]} />
        <primitive object={blurMaterial} attach="material" />
      </mesh>
    </group>
  );
}
