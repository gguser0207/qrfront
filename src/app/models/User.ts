export class User {
    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    birth: string;
}

export class Login {
    username: string;
    password: string;
}

export class UserNoPW {
    name: string;
    email: string;
    username: string;
}

export class business {
    name: string;
    email: string;
    username: string;
    password: string;
    birth: string;
    licenseNum: string;
}

export class Businesslogin {
    username: string;
    password: string;
    licenseNum: string;
}