import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Project } from 'src/models/project.class';
import { ProjectFormService } from '../project-form.service';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent implements OnInit {

  project: Project = new Project;
  loading = false;
  projectForm: FormGroup;
  panelOpenState = false;
  id:string = '';
  allUsers$:Observable<any>;
  allUsers:any = [];

  constructor(public dialogRef: MatDialogRef<DialogAddProjectComponent>,public addProjectService: ProjectFormService, private db: AngularFirestore) {
    this.projectForm = addProjectService.createFormGroup(this.project);
    this.allUsers$ = this.db.collection('users').valueChanges();
  }

  ngOnInit(): void {
    this.allUsers$.subscribe( (userCollection) => {
      this.allUsers = userCollection;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(DialogAddProjectComponent);
  }
}
