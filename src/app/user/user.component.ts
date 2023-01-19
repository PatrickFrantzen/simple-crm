import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  user: User = new User();
  db = getFirestore();
  dbRef = collection(this.db,'users');
  allUsers$:Observable<any>;
  allUsers:any = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {
    this.allUsers$ = collectionData(this.dbRef, { idField: 'id'});
  }

  ngOnInit(): void {
    this.allUsers$.subscribe( (userCollection) => {
      this.allUsers = userCollection;
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
