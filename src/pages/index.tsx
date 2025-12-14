import { useState, useEffect } from "react";
import LiquidEther from "../components/LiquidEther";

export default function Maintenance() {
  const [clickRipples, setClickRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [rippleId, setRippleId] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = { id: rippleId, x: e.clientX, y: e.clientY };
      setClickRipples((prev) => [...prev, newRipple]);
      setRippleId((prev) => prev + 1);
      setTimeout(() => {
        setClickRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1000);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [rippleId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
          <LiquidEther
            // colors={["#ff0000ff", "#e00e0eff", "#e94d4dff"]}
            mouseForce={10}
            cursorSize={140}
            isViscous={false}
            viscous={35}
            iterationsViscous={32}
            iterationsPoisson={22}
            resolution={0.3}
            isBounce={true}
            autoDemo={true}
            autoSpeed={1.0}
            autoIntensity={1.5}
            takeoverDuration={0.02}
            autoResumeDelay={0}
            autoRampDuration={0.05}
          />
        </div>

      {clickRipples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: "absolute",
            top: ripple.y - 100,
            left: ripple.x - 100,
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 180, 255, 0.4) 0%, rgba(0, 150, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            pointerEvents: "none",
            animation: "clickRipple 1s ease-out forwards",
            zIndex: 1,
          }}
        />
      ))}

      <div className="fg">
        <span className="logo">
          <img src="/images/logo-white.png" alt="TEDx" />
        </span>
        <span className="text-overlay">
          <h1 className="main-title">Website Under Maintenance</h1>
          <h3 className="cooking-text">Stay curious. We will be live soon!</h3>
        </span>
      </div>

      <style jsx>{`
        @keyframes clickRipple {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          30% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          70% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .fg {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          align-items: center;
          z-index: 2;
          position: relative;
          pointer-events: none;
        }

        .logo img {
          width: 700px;
          height: auto;
          opacity: 1;
          pointer-events: none;
        }

        .text-overlay {
          background: rgba(0, 0, 0, 0.55);
          padding: 3rem 3rem;
          border-radius: 20px;
          backdrop-filter: blur(6px);
          z-index: 2;
          position: relative;
          max-width: 800px;
          margin-top: 2.5rem;
          text-align: center;
          pointer-events: none;
          box-shadow:
            inset 1px 1px 4px rgba(255, 255, 255, 0.15),
            inset -1px -1px 4px rgba(0, 0, 0, 0.5),
            2px 2px 8px rgba(0, 0, 0, 0.6),
            -2px -2px 8px rgba(255, 255, 255, 0.05);
        }

        .main-title,
        .cooking-text {
          font-family: "Helvetica", "Poppins", "Arial Black", Arial, sans-serif;
          text-transform: uppercase;
          pointer-events: none;
        }

        .main-title {
          font-size: 3.8rem;
          font-weight: 800;
          color: #eb0028;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }

        .cooking-text {
          color: #e8e8e8;
          font-size: 1.3rem;
          font-weight: 400;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.2rem;
          }
          .cooking-text {
            font-size: 1.1rem;
          }
          .text-overlay {
            margin-top: 2rem;
            padding: 2rem 1.5rem;
          }
          .logo img {
            width: 70vw;
            max-width: 350px;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 1.7rem;
          }
          .cooking-text {
            font-size: 1rem;
          }
          .text-overlay {
            margin-top: 1.5rem;
            padding: 1.5rem 1rem;
          }
          .logo img {
            width: 90vw;
            max-width: 350px;
          }
        }
      `}</style>

      
    </div>
  );
}
