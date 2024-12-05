import Swal from "sweetalert2";

export const showSuccessModal = () => {
  Swal.fire({
    title: "¡Enviado!",
    text: "Su contacto ha sido enviado con éxito.",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#4ade80",
  });
};