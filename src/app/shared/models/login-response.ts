import { User, UserType } from "src/app/user/user";

export class LoginResponse {
    user: User = new User(UserType.None, false)
    redirectUrl: string = ''
}