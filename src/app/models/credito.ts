export class Credito {
  user: string;
  credito: number;
  rol: string;
  private codigos: any[];
  codigosCargados: string[];
  constructor(
    user: string,
    credito: number,
    rol: string = 'admin',
    codigosCargados: string[]
  ) {
    this.codigos = [
      { codigo: '8c95def646b6127282ed50454b73240300dccabc', puntos: 10 },
      { codigo: 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ', puntos: 50 },
      { codigo: '2786f4877b9091dcad7f35751bfcf5d5ea712b2f', puntos: 100 },
    ];
    this.user = user;
    this.credito = credito;
    this.rol = rol;
    this.codigosCargados = codigosCargados;
  }

  equals(codigo: string) {
    let respuesta: string = '';
    let brak: boolean = false;
    this.codigos.forEach((item) => {
      if (item.codigo === codigo && !brak) {
        brak = true;
        const res = this.evaluarCodigoCargado(codigo);
        if (this.rol === 'admin' && res.length > 1) {
          respuesta = 'El código ya se encuentra cargado 2 veces';
        } else if (this.rol !== 'admin' && res.length) {
          respuesta = 'El código ya se encuentra cargado';
        } else {
          this.credito = this.credito + item.puntos;
          this.codigosCargados.push(codigo);
          respuesta = '';
        }
      } else if (!brak) {
        respuesta = 'El código que intenta cargar no existe! ';
      }
    });

    return respuesta;
  }
  private evaluarCodigoCargado(codigo: string) {
    return this.codigosCargados.filter((value) => value === codigo);
  }

  static isCodigo(codigo: string) {
    let retorno = 0;
    const codigos = [
      { codigo: '8c95def646b6127282ed50454b73240300dccabc', puntos: 10 },
      { codigo: 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ', puntos: 50 },
      { codigo: '2786f4877b9091dcad7f35751bfcf5d5ea712b2f', puntos: 100 },
    ];
    codigos.forEach((item) => {
      if (item.codigo === codigo && !retorno) {
        retorno = item.puntos;
      }
    });
    return retorno;
  }
}
