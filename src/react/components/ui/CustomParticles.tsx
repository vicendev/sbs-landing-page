import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const CustomParticles = () => {
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    //background: linear-gradient(135deg, #0C134F, #1D267D);
    <Particles
      className="absolute inset-0 w-full h-full gradient-bg" // Ocupa todo el contenedor padre
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
          zIndex: 0,
        },
        particles: {
          number: {
            value: 70,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            outModes: {
              default: "bounce",
            },
          },
          size: {
            value: { min: 1, max: 5 },
          },
          opacity: {
            value: 0.3,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
