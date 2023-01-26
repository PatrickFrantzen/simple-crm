import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
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
  interestValue!: number;
  liquidationValue!:number;
  liquidationScoreValue!:number;
  reasonsValue!:number;
  aquisitionValue!:number;
  customerID!:string;

  interest = new FormControl('');
  interestList: string[] = ['very interested', 'interested', 'bad timing', 'not interested'];
  liquidation = new FormControl('');
  liquidationList: string[] = ['liquid', 'not liquid'];
  reasons = new FormControl('');
  reasonList: string[] = ['Customer wants do expand business fields', 'Customer wants to improve business field', 'Customer wants to explore new business fields', 'Exchange of Knowledge'];
  aquisition = new FormControl('');
  aquisitionList: string[] = ['Expand own portfolio', 'Reduce of operation cost', 'Raw material second source'];
  userForm!: FormGroup;

  customerColor:string[] = ['#da4141', '#1cf338', '#1cf3ba', '#1ce1f3', '#1c92f3', '#201cf3', '#ba1cf3', '#f31cf3', '#f31c99', '#000000'];
  constructor(private db: AngularFirestore,) {
  }

  setId(id:string){
    this.customerID = id;
  }

  createFormGroup(value: any) {
    return new FormGroup({
      firstName: new FormControl(value.firstName, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(value.lastName, [Validators.required, Validators.minLength(2)]),
      street: new FormControl(value.street, Validators.required),
      zipCode: new FormControl(value.zipCode, [Validators.required, Validators.pattern(this.numberPattern)]),
      city: new FormControl(value.city, Validators.required),
      email: new FormControl(value.email, [Validators.required, Validators.pattern(this.emailPattern)]),
      interest: new FormControl(value.interest),
      liquidation: new FormControl(value.liquidation),
      liquidationScore: new FormControl(value.liquidationScore, [Validators.pattern(this.numberPattern),Validators.max(100), Validators.min(0)]),
      reasons: new FormControl(value.reasons),
      aquisition: new FormControl(value.aquisition),
    })
  }

  async saveCustomer(userForm: { valid: any; }, user: any, dialogRef: any, newCustomer: boolean, userId:string) {
    
    this.loading = true;
    if (userForm.valid) {
      await this.setCustomer(userForm, user, dialogRef, newCustomer, userId)
    }
    this.loading = false;
  }

  async setCustomer(userForm: any, user: any, dialogRef: any, newCustomer:boolean, userId:string) {
    if (newCustomer) {
      this.getCustomerData(userForm.value, user, newCustomer);
      await this.sendNewCustomerDataToServer(user);
    } else {
      this.getCustomerData(userForm.value, user, newCustomer);
      await this.sendEditCustomerDataToServer(user, userId);
    }

    dialogRef.close();
  }

  getCustomerData(userFormValue: any, user: any, newCustomer:boolean) {
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
    user.status = this.calculateCustomerStatus(userFormValue.interest, userFormValue.liquidation, userFormValue.liquidationScore, userFormValue.reasons, userFormValue.aquisition);
    if (newCustomer) {
      user.color = this.customerColor[Math.floor(Math.random() * this.customerColor.length)];
    }
  }

  calculateCustomerStatus(interest: string, liquidation: string, score:number, reasons:string[], aquisition:string): any {
    this.calculateInterest(interest);
    this.calculateLiquidation(liquidation);
    this.calculateLiquidationScore(score);
    this.calculateReasons(reasons);
    this.calculateAquisition(aquisition);
    return this.sumOfValues();
  }

  calculateInterest(interest: string) {
    switch (interest) {
      case 'very interested':
        this.interestValue = 20;
        break;

      case 'interested':
        this.interestValue = 15;
        break;

      case 'bad timing':
        this.interestValue = 10;
        break;

      case 'not interested':
        this.interestValue = 0;
        break;
    }
  }

  calculateLiquidation(liquidation:string) {
    if (liquidation == 'liquid') {
      this.liquidationValue = 20;
    } else {
      this.liquidationValue = 0;
    }
  }

  calculateLiquidationScore(score:number) {
    if (score == 100) {
      this.liquidationScoreValue = 20;
    } else if (score >= 80 && score < 100){
      this.liquidationScoreValue = 25;
    }else if (score >=50 && score <80) {
      this.liquidationScoreValue = 10;
    } else {
      this.liquidationScoreValue = 0;
    }
  }

  calculateReasons(reasons:string[]){
    if (reasons.length >= 2) {
      this.reasonsValue = 20;
    } else if (reasons.length == 1){
      this.reasonsValue = 10;
    } else {
      this.reasonsValue = 0
    }
  }

  calculateAquisition(aquisition:string) {
    switch (aquisition) {
      case 'Expand own portfolio':
        this.aquisitionValue = 20;
        break;

      case 'Reduce of operation cost':
        this.aquisitionValue = 15;
        break;

      case 'Raw material second source':
        this.aquisitionValue = 10;
        break;
    }
  }

  sumOfValues() {
    return this.interestValue + this.liquidationValue + this.liquidationScoreValue + this.reasonsValue + this.aquisitionValue;
  }

  async sendNewCustomerDataToServer(user: any) {
    const userRef = this.db.collection('users');
    await userRef.add(user.toJSON());
  }

  async sendEditCustomerDataToServer(user: any, userId:string) {
    const editUserRef = this.db.collection('users').doc(userId);
    await editUserRef.update(user);
  }
}


