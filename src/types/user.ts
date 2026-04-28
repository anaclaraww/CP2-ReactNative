export type UserRole = 'admin' | 'user';
export type Tratamento = 'Sr.' | 'Sra.' | 'Srta.';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

export interface UserPreferences {
  tratamento: Tratamento;
  darkMode: boolean;
}
