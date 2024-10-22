import { inject, Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Credito } from '../models/credito';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private firestore: AngularFirestore) {}
  user: UsersService = inject(UsersService);

  //Agregar una imagen a la base de datos
  async agregarCreditonDb(credito: Credito) {
    const colImagenes = this.firestore.collection('creditos');
    const documento = colImagenes.doc(this.user.correo || '');
    // user.setId(documento.ref.id);
    await documento.set({ ...credito });
  }

  //Obtener las imagenes
  getCreditos() {
    const col = this.firestore.collection('creditos');
    return col;
  }

  //Agregar credito
  updateCredito(credito: Credito) {
    const doc = this.firestore.doc('creditos/' + credito.user);
    doc.update({
      codigosCargados: credito.codigosCargados,
      credito: credito.credito,
    });
  }

  //Eliminar creditos
  deleteCredito(user: string) {
    const doc = this.firestore.doc('creditos/' + user);
    doc.delete();
  }
}
