import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CustomBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return () => {};

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    const mouseWorld = new THREE.Vector3();
    let lastMouseUpdateTime = 0;
    const THROTTLE_MS = 16;

    const onMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdateTime < THROTTLE_MS) return;
      lastMouseUpdateTime = now;
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(
        new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
        mouseWorld
      );
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const dots: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>[] = [];
    const geometry = new THREE.CircleGeometry(0.015, 12);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });

    for (let x = -10; x <= 10; x += 0.5) {
      for (let y = -5; y <= 5; y += 0.5) {
        const dot = new THREE.Mesh(geometry, material.clone());
        dot.position.set(x, y, 0);
        dot.userData.originalPosition = dot.position.clone();
        scene.add(dot);
        dots.push(dot);
      }
    }

    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;
    const influenceRadiusSq = 1.5 * 1.5;
    const tempVec = new THREE.Vector3();
    const tempVec2 = new THREE.Vector3();

    const animate = () => {
      requestAnimationFrame(animate);

      dots.forEach((dot) => {
        const originalPosition = dot.userData.originalPosition;
        tempVec.subVectors(originalPosition, mouseWorld);
        const distanceSq = tempVec.lengthSq();

        if (distanceSq < influenceRadiusSq) {
          const distance = Math.sqrt(distanceSq);
          const influence = 1 - distance / 1.5;
          const influenceSq = influence * influence;
          tempVec2.subVectors(mouseWorld, originalPosition).multiplyScalar(influenceSq * 0.6);
          dot.position.lerp(tempVec.copy(originalPosition).add(tempVec2), 0.15);
          dot.scale.setScalar(0.8 + influence * 1.5);
          dot.material.opacity = 0.4 + influence * 0.3;
          dot.material.color.setHex(0xff0000);
        } else {
          dot.position.lerp(originalPosition, 0.1);
          dot.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          dot.material.opacity = lerp(dot.material.opacity, 0.4, 0.1);
          dot.material.color.setHex(0x424242);
        }
      });

      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default CustomBackground;
