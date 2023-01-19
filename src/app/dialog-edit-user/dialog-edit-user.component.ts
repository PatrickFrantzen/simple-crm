import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit{
  user!:User;
  userId!: string;
  loading = false;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private db: AngularFirestore) {}

  ngOnInit(): void {
    
  }

  editUser() {
    this.loading = true; 
    const userRef = this.db.collection('users');
    userRef.doc(this.userId).update(this.user.toJSON())
    .then( () => {
      this.loading = false; 
      this.dialogRef.close(DialogEditUserComponent);
    })

  }

  onNoClick(): void {
    this.dialogRef.close(DialogEditUserComponent);
  }

}
