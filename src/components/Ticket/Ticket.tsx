import { useState, useEffect } from "react";
import { Mona_Sans } from "next/font/google";
import fontArray from "./fontArray";
import FaultyTerminal from "./FaultyTerminal";

const mona = Mona_Sans({
  subsets: ["latin"],
});

const Ticket = () => {
  const [fonts, setFonts] = useState(mona);

  return (
    <div className="everything">
      <div className="hero h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-[-1]">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>

            <FaultyTerminal
              scale={2.3}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.6}
              pause={false}
              scanlineIntensity={0.5}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.2}
              tint="#eb0028"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation
              brightness={0.8}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Ticket;
