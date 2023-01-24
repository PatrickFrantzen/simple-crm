import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogEditProjectComponent } from '../dialog-edit-project/dialog-edit-project.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit{
  projectId:string = '';
  project$!: Observable<any>;
  project: any = {};
  allUsers$:Observable<any>;
  allUsers:any = [];
  
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private db: AngularFirestore) {
    this.allUsers$ = this.db.collection('users').valueChanges();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.projectId = paramMap.get('id')!;
    })
    this.project$ = this.db.collection('projects').doc(this.projectId).valueChanges();
    this.getProject();
    this.getUser();
  }

  getProject() {
    this.project$.subscribe( (project:any)=> {
      this.project = project;
    }) 
  }

  getUser() {
    this.allUsers$.subscribe( (userCollection) => {
      this.allUsers = userCollection;
    });
  }

  editProjectMenu() {
    const dialog = this.dialog.open(DialogEditProjectComponent, {
      data: {
        project: this.project,
        projectId: this.projectId,
        allUsers: this.allUsers,
      }
    })
  }
}
