export class User {
    userType: UserType;
    isAuthenticated: boolean;

    constructor(userType: UserType, isAuthenticated: boolean){
        this.userType = userType;
        this.isAuthenticated = isAuthenticated;
    }
}

export enum UserType {
    None = 'None',
    Trader = 'Trader',
    Developer = 'Developer'
}
