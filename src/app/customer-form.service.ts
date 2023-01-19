import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {
  loading = false;
  phoneNoPattern = /([+(\d]{1})(([\d+() -.]){5,16})([+(\d]{1})/gm;
  numberPattern = /^(0|[1-9][0-9]*)$/;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  constructor(private db: AngularFirestore,) { }

  createFormGroup(value:any) {
    return new FormGroup({
      firstName: new FormControl(value.title, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(value.lastName, [Validators.required, Validators.minLength(2)]),
      street: new FormControl(value.street, Validators.required),
      zipCode: new FormControl(value.zipCode, [Validators.required, Validators.pattern(this.numberPattern)]),
      city: new FormControl(value.city, Validators.required),
      email: new FormControl(value.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      interest: new FormControl(value.interest),
      liquidation: new FormControl(value.liquidation),
      liquidationScore: new FormControl(value.liquidationScore, Validators.pattern(this.numberPattern)),
      reasons: new FormControl(value.reasons),
      aquisition: new FormControl(value.aquisition),
    })
  }

  async saveCustomer(userForm: { valid: any; }, user: any, dialogRef: any) {
    this.loading = true;
    if (userForm.valid) {
      await this.setCustomer(userForm, user, dialogRef)
    }
    this.loading = false;
  }

  async setCustomer(userForm: any, user: any, dialogRef: any) {
    this.getCustomerData(userForm.value, user)
    await this.sendNewCustomerDataToServer(user)
    dialogRef.close();
  }

  getCustomerData(userFormValue:any, user:any) {
    user.firstName = userFormValue.firstName;
    user.lastName = userFormValue.lastName;
    user.street = userFormValue.street;
    user.zipCode = userFormValue.zipCode;
    user.city = userFormValue.city;
    user.email = userFormValue.email;
    user.interest = userFormValue.interest;
    user.liquidation = userFormValue.liquidation;
    user.liquidationScore = userFormValue.liquidationScore;
    user.reasons = userFormValue.reasons;
    user.aquisition = userFormValue.aquisition;
  }

  async sendNewCustomerDataToServer(user: any) {
    const userRef = this.db.collection('users');
    await userRef.add(user.toJSON());
    console.log(user);
    console.log(user.toJSON())
  }
}


