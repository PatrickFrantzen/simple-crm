import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  allUsers$:Observable<any>;
  allUsers:any = [];

  constructor(public dialog: MatDialog, private db:AngularFirestore) {
    this.allUsers$ = this.db.collection('users').valueChanges({ idField: 'id'});
  }

  ngOnInit(): void {
    this.allUsers$.subscribe( (userCollection) => {
      this.allUsers = userCollection;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }


}
