import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectFormService {
projectId:string = '';
loading = false;


  constructor(private db: AngularFirestore) { }

  setId(id:string){
    this.projectId = id;
  }

  createFormGroup(value: any) {
    return new FormGroup({
      projectName: new FormControl(value.projectName, [Validators.required, Validators.minLength(2)]),
      status: new FormControl(value.status, Validators.required),
      customer: new FormControl(value.customer, Validators.required),
      details: new FormControl(value.details,[Validators.required, Validators.minLength(2)])
    })
  }

  async saveProject(projectForm: { valid: any; }, project: any, dialogRef: any, newProject: boolean, projectId:string) {
    
    this.loading = true;
    if (projectForm.valid) {
      await this.setCustomer(projectForm, project, dialogRef, newProject, projectId)
    }
    this.loading = false;
  }

  async setCustomer(projectForm: any, project: any, dialogRef: any, newProject:boolean, projectId:string) {
    this.getProjectData(projectForm.value, project);
    if (newProject) {
      await this.sendNewProjectDataToServer(project);
    } else {
      await this.sendEditProjectDataToServer(project, projectId);
    }
    dialogRef.close();
  }

  getProjectData(projectFormValue: any, project: any) {
    project.projectName = projectFormValue.projectName;
    project.status = projectFormValue.status;
    project.customer = projectFormValue.customer;
    project.details = projectFormValue.details;
  }

  async sendNewProjectDataToServer(project: any) {
    const projectRef = this.db.collection('projects');
    await projectRef.add(project.toJSON());
  }

  async sendEditProjectDataToServer(project: any, projectId:string) {
    const editProjectRef = this.db.collection('projects').doc(projectId);
    await editProjectRef.update(project);
  }
}
