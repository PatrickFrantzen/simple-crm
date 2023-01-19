import { Component, OnInit } from '@angular/core';
import { getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'simple-crm';
  

  constructor() {}

  ngOnInit(): void {
    
  }
}
