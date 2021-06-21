import { TurnType } from "../professors/professors.interface";

export interface IUser {
    id: string
    name: string
    password: string
    email: string
    schedules?: IUserSchedule[]
}

export interface ICreateUser {
    name: string
    password: string
    email: string
}

export interface IUpdateUser {
    name: string
    oldpassword?: string
    password?: string
}


export interface IUserSchedule {
    id: string
    date: string
    turn: TurnType
    professor: {
        name: string
        id: string
        email: string
        subject: string
    }
}