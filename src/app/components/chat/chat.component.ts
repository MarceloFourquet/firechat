import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje: string;
  elemento: any;

  constructor( public chatService: ChatService ) {
    this.mensaje = '';
  }

  ngOnInit() {
    this.elemento = document.getElementById( 'app-mensajes' );
    this.chatService
      .cargarMensajes()
      .subscribe( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      });
  }

  enviarMensaje() {
    if  ( this.mensaje.length === 0 ) {
      return;
    }
    this.chatService
      .agregarMensaje( this.mensaje )
      .then( () => this.mensaje = '')
      .catch( (err) => console.log('Error al enviar', err) );
  }

}
