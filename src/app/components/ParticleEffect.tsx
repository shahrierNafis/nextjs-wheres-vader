import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { memo } from "react";

function ParticleEffect() {
  const [init, setInit] = useState(false);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    setNumber(innerWidth / 10);
  }, []);

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "black",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,

                  parallax: {
                    enable: true,
                    force: 5,
                    smooth: 25,
                  },
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              collisions: { enable: true },
              move: {
                size: true,
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: 0.25,
                straight: false,
              },
              number: {
                value: number,
              },
              opacity: {
                value: 1,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 2.5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}
export default memo(ParticleEffect);
