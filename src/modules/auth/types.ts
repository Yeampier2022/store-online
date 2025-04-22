export interface LoginForm {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  // export interface RegisterForm {
  //   name: string;
  //   email: string;
  //   password: string;
  //   c_password: string;
  // }