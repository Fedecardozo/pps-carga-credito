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
}
