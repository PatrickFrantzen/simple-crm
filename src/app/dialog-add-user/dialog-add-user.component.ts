import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CustomerFormService } from '../customer-form.service';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit{

  user: User = new User();
  loading = false;
  userForm: FormGroup;
  panelOpenState = false;
  
  constructor (public dialogRef: MatDialogRef<DialogAddUserComponent>, private db: AngularFirestore, public addCustomerService: CustomerFormService) {
    this.userForm = addCustomerService.createFormGroup(this.user);
  }

  ngOnInit(): void {
    
  }

  saveUser() {
    this.loading = true; 
    const userRef = this.db.collection('users');
    userRef.add(this.user.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close(DialogAddUserComponent);
    })
  }

  onNoClick(): void {
    this.dialogRef.close(DialogAddUserComponent);
  }
}
