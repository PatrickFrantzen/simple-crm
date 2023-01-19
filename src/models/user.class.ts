export class User {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    zipCode: number;
    city: string;
    interest: string;
    liquidation: string;
    liquidationScore: number;
    reasons: string[];
    aquisition: string;

    constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : '';
    this.interest = obj ? obj.interest : '';
    this.liquidation = obj ? obj.liquidation : '';
    this.liquidationScore = obj ? obj.liquidationScore : '';
    this.reasons = obj ? obj.reason : '';
    this.aquisition = obj ? obj.aquisition : '';
}

    public toJSON(){
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        street: this.street,
        zipCode: this.zipCode,
        city: this.city,
        interest: this.interest,
        liquidation: this.liquidation,
        liquidationScore: this.liquidationScore,
        reasons: this.reasons,
        aquisition: this.aquisition
    }
}
}