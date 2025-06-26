import { IsNotEmpty, IsString } from "class-validator";
import { stringify } from "querystring";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string

}