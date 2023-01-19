import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { async } from '@firebase/util';
import { doc, getDoc, getFirestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  db = getFirestore();
  dbRef = collection(this.db,'users');
  userId:string = '';
  user$:Observable<any> = collectionData(this.dbRef);
  user:User = new User;
  docRefUser:any;
  
  constructor(private route:ActivatedRoute, 
    private firestore: Firestore, 
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id')!;
      this.getUser();
  })
  }

  getUser() {
    this.user$.subscribe(async() => {
      this.docRefUser = doc(this.db, 'users', this.userId!);
      let docSnap = await getDoc(this.docRefUser);
      let userData = docSnap.data();
      this.user = new User(userData);
    })
  }

  editUserMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddressMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
