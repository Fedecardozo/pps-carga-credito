import Swal, { SweetAlertOptions } from 'sweetalert2';

export class Alert {
  private static base: SweetAlertOptions = {
    heightAuto: false,
    allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
    background: 'hsla(235, 14%, 19%, 1)', // Color de fondo oscuro
    color: 'hsla(46, 100%, 82%, 1)', // Texto en tono dorado
    confirmButtonColor: 'hsla(46, 100%, 82%, 1)', // Botón en dorado claro
    backdrop: `rgba(0, 0, 0, 0.4)`,
    confirmButtonText: 'Aceptar',

    customClass: {
      popup: 'custom-swal-popup',
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button',
    },
  };

  static error(titulo: string, texto: string) {
    Swal.fire(Alert.base);
    Swal.update({
      icon: 'error',
      title: titulo,
      text: texto,
    });
  }

  static bien(titulo: string, texto: string) {
    Swal.fire(Alert.base);
    Swal.update({
      icon: 'success',
      title: titulo,
      text: texto,
    });
  }

  static question(titulo: string, texto: string) {
    return Swal.fire({
      icon: 'question',
      title: titulo,
      text: texto,
      heightAuto: false,
      allowOutsideClick: false, // Impide cerrar al hacer clic fuera del modal
      background: 'hsla(235, 14%, 19%, 1)', // Color de fondo oscuro
      color: 'hsla(46, 100%, 82%, 1)', // Texto en tono dorado
      confirmButtonColor: 'hsla(46, 100%, 82%, 1)', // Botón en dorado claro
      backdrop: `rgba(0, 0, 0, 0.4)`,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showCancelButton: true,

      customClass: {
        popup: 'custom-swal-popup',
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    });
  }
}
