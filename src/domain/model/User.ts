type Role = 'ADMIN' | 'USER';

export interface User {
  id: string; // UUID
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
