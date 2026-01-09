import { useTexture, Center } from "@react-three/drei";

export default function BackgroundPlane() {
  const texture = useTexture("/images/Landing_Page/Logo_Day.png");
  const logoTexture = useTexture("/images/Landing_Page/TEDx LOGO (NO BG).png");

  return (
    <group>
      {/* Background plane */}
      <mesh position={[0, 0, -60]}>
        <planeGeometry args={[50, 30]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Logo plane - only visible through refraction scene */}
      <mesh position={[0, 0, -59.5]} scale={1.5}>
        <planeGeometry args={[15, 9]} />
        <meshBasicMaterial map={logoTexture} transparent />
      </mesh>
    </group>
  );
}
