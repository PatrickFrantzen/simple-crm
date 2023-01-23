import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(public dialogRef: MatDialogRef<DialogAddProjectComponent>,public addProjectService: ProjectFormService) {
    this.projectForm = addProjectService.createFormGroup(this.project);
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close(DialogAddProjectComponent);
  }
}
