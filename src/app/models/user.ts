export class User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    attributes: string[];
    credentials: string[];
    requiredActions: string[];
    realmRoles: string[];
    clientRoles: string[];
    groupIds: string[];
    password:string;
    pwd:string;
    photo:string;
    isResponsable = false;
    isScrumMaster = false;
    isDevelopper = false;

    constructor() { }
}
