import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user!:User;
  userId!: string;
  loading = false;


  constructor(public dialogRef:MatDialogRef<DialogEditAddressComponent>, private db: AngularFirestore,) {}

  ngOnInit(): void {
  }

  editAddress() {
    this.loading = true; 
    const userRef = this.db.collection('users');
    userRef.doc(this.userId).update(this.user.toJSON())
    .then( () => {
      this.loading = false; 
      this.dialogRef.close(DialogEditAddressComponent);
    })
  
  }

  onNoClick() {
    this.dialogRef.close(DialogEditAddressComponent);
  }

}
