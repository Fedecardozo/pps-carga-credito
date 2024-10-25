import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonFab,
  IonFabButton,
  IonLabel,
  IonItem,
  IonInput,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { UsersService } from '../service/users.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { DbService } from '../service/db.service';
import { Credito } from '../models/credito';
import { Subscription } from 'rxjs';
import { Alert } from '../models/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonList,
    IonInput,
    IonItem,
    IonLabel,
    IonFabButton,
    IonFab,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage implements ViewWillEnter {
  public router: Router = inject(Router);
  public auth: UsersService = inject(UsersService);
  public db: DbService = inject(DbService);
  text: string[] = [
    '8c95def646b6127282ed50454b73240300dccabc',
    'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ',
    '2786f4877b9091dcad7f35751bfcf5d5ea712b2f',
  ];
  isSupported = false;
  barcodes: Barcode[] = [];
  cantidad: number = 0;
  categoria: string = '';
  rol: string = '';
  creditoUser?: Credito;
  index: number = 0;
  sub?: Subscription;
  usuario: string = '';

  constructor(private alertController: AlertController) {}

  asignarUsuario() {
    this.usuario = this.auth.correo || '';
    if (this.auth.correo === 'fede@gmail.com') {
      console.log('entro');
      this.categoria = 'Administrador';
      this.rol = 'admin';
      this.usuario = this.categoria;
    }
  }

  ionViewWillEnter() {
    this.asignarUsuario();
    this.getCredito();
    // BarcodeScanner.isSupported().then((result) => {
    //   this.isSupported = result.supported;
    // });
    // setTimeout(() => {
    //   this.cargarCredito('this.text[2]');
    // }, 5000);
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.cargarCredito(this.barcodes[this.index].rawValue); //original
    this.index++;
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  getCredito() {
    this.sub = this.db
      .getCreditos()
      .valueChanges()
      .subscribe((next) => {
        console.log(next);
        const aux = next as Credito[];
        aux.forEach((val) => {
          if (val.user === this.auth.correo) {
            this.creditoUser = new Credito(
              val.user,
              val.credito,
              val.rol,
              val.codigosCargados
            );
            this.cantidad = this.creditoUser.credito;
            console.log(this.creditoUser);
          }
        });
      });
  }

  cargarCredito(codigo: string) {
    const puntos: number = Credito.isCodigo(codigo);
    if (this.creditoUser) {
      const res = this.creditoUser.equals(codigo);
      if (res === '') {
        this.db.updateCredito(this.creditoUser);
        console.log('exito');
        Alert.bien(
          `Sumaste: ${puntos} puntos`,
          'Se cargó correctamente el código'
        );
      } else {
        console.log(res);
        Alert.error('Error!', res);
      }
    } else if (puntos > 0) {
      this.db.agregarCreditonDb(
        new Credito(this.auth.correo || '', puntos, this.rol, [codigo])
      );
      console.log('se cargo al vacio');
      Alert.bien(
        `Sumaste: ${puntos} puntos`,
        'Se cargó correctamente el código'
      );
    }
  }

  async limpiar() {
    if (
      (
        await Alert.question(
          '¿Estas seguro de eliminar los créditos?',
          'Si elimina los créditos se borraran permanentemente'
        )
      ).isConfirmed
    ) {
      this.db.deleteCredito(this.auth.correo || '');
      this.cantidad = 0;
      this.creditoUser = undefined;
      this.barcodes = [];
      this.index = 0;
      // setTimeout(() => {
      //   this.cargarCredito(this.text[2]);
      // }, 5000);
      // this.sub?.unsubscribe();
    }
  }

  async cerrarSesion() {
    await this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
    this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    console.log('destroy');
  }
}
