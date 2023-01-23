export class Project {
    projectName: string;
    status: string;
    customer: string;
    details: string;


    constructor(obj?: any) {
    this.projectName = obj ? obj.projectName : '';
    this.status = obj ? obj.status : '';
    this.customer = obj ? obj.customer : '';
    this.details = obj ? obj.street : '';

}

    public toJSON(){
    return {
        projectName: this.projectName,
        status: this.status,
        customer: this.customer,
        details: this.details,
    }
}
}