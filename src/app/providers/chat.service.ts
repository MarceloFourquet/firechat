import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[];
  public usuario: any;

  constructor( private afs: AngularFirestore, public auth: AngularFireAuth ) {
    this.chats = [];
    this.usuario = {};
    this.auth.authState.subscribe( user => {
      if ( !user ) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login( proveedor: string ) {
    switch (proveedor) {
      case 'google':
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'twitter':
        // this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
        console.log('No implementado por carecer de cuenta como desarrollador');
        break;
    }
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs
      .collection<Mensaje>('chats', ref => ref
        .orderBy( 'fecha', 'desc' )
        .limit(5));
    return this.itemsCollection
      .valueChanges()
      .pipe( map( mensajes => {
        this.chats = [];
        for ( const mensaje of mensajes ) {
          this.chats.unshift( mensaje );
        }
      }));
  }

  agregarMensaje( texto: string ) {
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    return this.itemsCollection.add( mensaje );
  }

}
