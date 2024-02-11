export interface LoginRequest{
  username?: string | undefined;
  password?: string | undefined;
}

export interface RegisterRequest {
  name : string;
  password : string;
  email : string;
}

export class JwtAuth {
  token : string = '';
  result : boolean = true;
  error : any;
}
