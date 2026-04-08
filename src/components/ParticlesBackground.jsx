import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="neon-particles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        detectRetina: false,
        particles: {
          number: {
            value: 24,
            density: { enable: true, area: 1200 }
          },
          color: {
            value: ['#00f0ff', '#ff003c', '#333333']
          },
          shape: {
            type: ['circle', 'square']
          },
          opacity: {
            value: { min: 0.18, max: 0.45 }
          },
          size: {
            value: { min: 1.2, max: 3.2 }
          },
          move: {
            enable: true,
            speed: 0.35,
            direction: 'top',
            random: true,
            straight: false,
            outModes: { default: 'out' }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
            resize: true
          }
        },
        background: {
          color: 'transparent'
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticlesBackground;
