import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/models/project.class';
import { ProjectFormService } from '../project-form.service';

@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './dialog-edit-project.component.html',
  styleUrls: ['./dialog-edit-project.component.scss']
})
export class DialogEditProjectComponent implements OnInit{
  project: Project = new Project;
  loading = false;
  projectForm: FormGroup;
  panelOpenState = false;
  id:string = '';
  constructor(public dialogRef: MatDialogRef<DialogEditProjectComponent>, private db: AngularFirestore, public editProjectService: ProjectFormService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projectForm = editProjectService.createFormGroup(this.data.project);
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close(DialogEditProjectComponent);
  }
}
