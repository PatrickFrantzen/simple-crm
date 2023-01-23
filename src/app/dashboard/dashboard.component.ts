import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

allProjects$:Observable<any>;
allProjects:any = [];
  
constructor(public dialog: MatDialog, private db:AngularFirestore) {
  this.allProjects$ = db.collection('projects').valueChanges({ idField: 'id'});
}

ngOnInit(): void {
  this.allProjects$.subscribe( (projectCollection) => {
    this.allProjects = projectCollection;
  });
}

openDialog() {
  this.dialog.open(DialogAddProjectComponent);
}

}
