import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

export default function Maintenance() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);
  const [clickRipples, setClickRipples] = useState<{id: number, x: number, y: number}[]>([]);
  const [rippleId, setRippleId] = useState(0);

  useEffect(() => {
    const MAX_PARTICLES = 150;
    let lastTime = 0;
    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle particle creation to every 20ms (faster creation)
      if (now - lastTime < 20) return;
      lastTime = now;
      const newX = e.clientX;
      const newY = e.clientY;
      setMousePosition({ x: newX, y: newY });

      // Create more particles per move
      const newParticles: Particle[] = [];
      for (let i = 0; i < 2; i++) {
        newParticles.push({
          id: particleId + i,
          x: newX + (Math.random() - 0.5) * 25,
          y: newY + (Math.random() - 0.5) * 25,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.5,
          size: Math.random() * 6 + 3,
          opacity: 1,
          life: 1
        });
      }
      setParticles(prev => {
        const combined = [...prev, ...newParticles];
        return combined.length > MAX_PARTICLES ? combined.slice(combined.length - MAX_PARTICLES) : combined;
      });
      setParticleId(prev => prev + 2);
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: rippleId,
        x: e.clientX,
        y: e.clientY
      };
      setClickRipples(prev => [...prev, newRipple]);
      setRippleId(prev => prev + 1);
      
      // Remove ripple after animation
      setTimeout(() => {
        setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('click', handleClick);
    };
  }, [particleId, rippleId]);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.18, // gravity (slightly less)
          opacity: particle.opacity * 0.96,
          life: particle.life * 0.98,
          size: particle.size * 0.995
        })).filter(particle => particle.life > 0.1)
      );
    }, 24); // ~40fps for less CPU

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #181717ff 0%, #1b2230ff 50%, #160101ff 100%)",
      color: "#fff",
      padding: "20px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Watery texture background */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 150, 255, 0.1) 0%,
              rgba(0, 200, 255, 0.05) 30%,
              transparent 70%
            ),
            radial-gradient(circle 100px at ${mousePosition.x - 20}px ${mousePosition.y - 20}px, 
              rgba(255, 255, 255, 0.03) 0%,
              transparent 50%
            ),
            conic-gradient(from 0deg at ${mousePosition.x}px ${mousePosition.y}px, 
              transparent 0deg,
              rgba(0, 180, 255, 0.08) 90deg,
              rgba(0, 150, 255, 0.05) 180deg,
              rgba(255, 255, 255, 0.02) 270deg,
              transparent 360deg
            )
          `,
          pointerEvents: "none",
          transition: "background 0.1s ease-out"
        }}
      />
      
      {/* Click Ripple effects */}
      {clickRipples.map(ripple => (
        <div
          key={ripple.id}
          style={{
            position: "absolute",
            top: ripple.y - 100,
            left: ripple.x - 100,
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 180, 255, 0.4) 0%, rgba(0, 150, 255, 0.2) 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)",
            pointerEvents: "none",
            animation: "clickRipple 1s ease-out forwards"
          }}
        />
      ))}

      {/* Water particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              rgba(135, 206, 250, ${particle.opacity}) 0%, 
              rgba(0, 191, 255, ${particle.opacity * 0.8}) 30%, 
              rgba(30, 144, 255, ${particle.opacity * 0.6}) 60%,
              transparent 100%
            )`,
            boxShadow: `0 0 ${particle.size}px rgba(0, 191, 255, ${particle.opacity * 0.5})`,
            pointerEvents: "none",
            animation: "sparkle 0.8s ease-out forwards"
          }}
        />
      ))}
      
      {/* Animated TEDx logo that follows physics */}
      <div className="floating-logo">
        <img src="/images/logo.png" alt="TEDx" />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px #da9b9bff, 0 0 3px #ff2d92; }
          50% { text-shadow: 0 0 5px #ff0000ff, 0 0 3px #ffffffff; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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

        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.2) rotate(360deg);
            opacity: 0;
          }
        }
        
        .main-title {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(45deg, #8B0000, #DC143C, #B22222);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite alternate;
          margin-bottom: 2rem;
          margin-top: 8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: 'Arial Black', Arial, sans-serif;
        }
        
        .subtitle {
          font-size: 1.5rem;
          margin-top: 2rem;
          font-weight: 600;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          animation: fadeInUp 1s ease-out 0.5s both;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cooking-text {
          font-size: 2rem;
          font-weight: 700 !important;
          background: linear-gradient(45deg, #8B0000, #a30a28ff, #B22222);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow 3s ease-in-out infinite alternate;
          margin-top: 2rem;
          margin-bottom: 2rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Arial Black', 'Arial', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        
        .highlight {
          background: linear-gradient(45deg, #ff2d92, #ff6b6b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }
        
        .floating-logo {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-logo img {
          width: 600px;
          height: auto;
        }
        
        @keyframes float {
          0% {
            transform: translate(-50%, -50%) translateY(0) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-10px) rotate(-5deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(0) rotate(0deg);
          }
          75% {
            transform: translate(-50%, -50%) translateY(10px) rotate(5deg);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0) rotate(0deg);
          }
        }
        
        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem;
            margin-top: 4rem;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
          }
          .cooking-text {
            font-size: 1.3rem;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .subtitle {
            font-size: 1rem;
            margin-top: 1.5rem;
            line-height: 1.4;
            padding: 0 10px;
          }
          .floating-logo img {
            width: 300px;
          }
        }
        
        @media (max-width: 480px) {
          .main-title {
            font-size: 1.5rem;
            margin-top: 3rem;
            margin-bottom: 1rem;
          }
          .cooking-text {
            font-size: 1.1rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .subtitle {
            font-size: 0.9rem;
            margin-top: 1rem;
          }
          .floating-logo img {
            width: 250px;
          }
        }
      `}</style>
      
      <h1 className="main-title">
        Website Under Maintenance
      </h1>
      <h3 className="cooking-text">
        Stay curious. We will be live soon!
      </h3>
      <p className="subtitle">
        The new <span className="highlight">TEDx NIIT University</span> site is coming soon.<br />
        <strong>Stay tuned for something extraordinary!</strong>
      </p>
    </div>
  );
}
