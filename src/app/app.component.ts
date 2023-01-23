import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firebaseui from 'firebaseui';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'simple-crm';

  constructor() {
  }

  ngOnInit(): void {
    
}

}
