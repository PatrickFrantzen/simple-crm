import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  userId:string = '';
  user$!:Observable<any>;
  user: any = {};
  docRefUser:any;
  
  constructor(private route:ActivatedRoute, private db: AngularFirestore,
    public dialog: MatDialog) {
      
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id')!;
      this.user$ = this.db.collection('users').doc(this.userId).valueChanges();
      this.getUser();
  })
  }

  getUser() {
    this.user$.subscribe((user: any) => {
      this.user = user;
    })
  }

  editUserMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent, {
      data: {
        user: this.user,
        userId: this.userId,
      }
    })
  }
}
