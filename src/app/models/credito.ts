export class Credito {
  user: string;
  credito: number;
  rol: string;
  private creditos: string[];
  constructor(user: string, credito: number, rol: string = 'admin') {
    this.creditos = [
      '8c95def646b6127282ed50454b73240300dccabc',
      'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172',
      '2786f4877b9091dcad7f35751bfcf5d5ea712b2f',
    ];
    this.user = user;
    this.credito = credito;
    this.rol = rol;
  }
}
