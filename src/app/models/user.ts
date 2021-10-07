export interface IUser {
  id: number;
  role: ROLE | string;
  username: string;
  password: string;
  age: number;
  occupation: string;
  education: IEducation[];
  photo?: ArrayBuffer
}

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface IEducation {
  university: string;
  speciality: string;
  startDate: string;
  endDate: string
}
