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
          enable: false, // Desactiva el modo de pantalla completa
          zIndex: 0, // Asegura que esté en el fondo
        },
        particles: {
          number: {
            value: 100,
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
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: {
              default: "bounce",
            },
          },
          size: {
            value: { min: 1, max: 5 },
          },
          opacity: {
            value: 0.5,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
