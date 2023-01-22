import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CustomerFormService } from '../customer-form.service';
import { FormGroup } from '@angular/forms';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit{
  user!:User;
  userId!: string;
  loading = false;
  userForm: FormGroup;
  panelOpenState = false;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private db: AngularFirestore, public editCustomerService: CustomerFormService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userForm = editCustomerService.createFormGroup(this.data.user);
  }

  ngOnInit(): void {
    
  }


  onNoClick(): void {
    this.dialogRef.close(DialogEditUserComponent);
  }

}
