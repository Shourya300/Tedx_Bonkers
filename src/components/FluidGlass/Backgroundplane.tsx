import { useTexture } from "@react-three/drei";

export default function BackgroundPlane() {
  const texture = useTexture("/images/Landing_Page/Logo_Day.png");

  return (
    <group>
      {/* Background plane */}
      <mesh position={[0, 0, -60]}>
        <planeGeometry args={[50, 30]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </group>
  );
}
