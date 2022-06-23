export type Gender = 'male' | 'female';
export type Status = 'active' | 'inactive';

export interface User {
  id: number,
  name: string,
  email: string,
  gender: Gender,
  status: Status,
}