import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title = 'firechat';
  public chats: Observable<any[]>;

  constructor( firestore: AngularFirestore, public chatService: ChatService ) {
    this.chats = firestore.collection('chats').valueChanges();
  }

}
