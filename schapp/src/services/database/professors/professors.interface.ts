export interface IProfessor {
    id: string
    name: string
    subject: string
    email: string
    schedules?: IProfessorSchedule[]
}

export interface IProfessorSchedule {
    id: string
    date: string
    turn: TurnType
    student: {
        name: string
        email: string
    }
}

export interface ISelectedProfessor {
    id?: string,
    name?: string
}

export enum TurnType {
    MORNING = "Manhã",
    EVENING = "Tarde",
    NIGHT = "Noite"
}

