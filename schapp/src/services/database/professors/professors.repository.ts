import firebase from "../config/fire";
import { IProfessor, IProfessorSchedule, TurnType } from "./professors.interface";

const db = firebase.database();

async function getAllProfessor() {
    const professors: IProfessor[] = [];

    try {
        await db.ref('professors').once('value', (data) => {
            const profs: any = data.toJSON();

            if (!profs) return [];

            for (let prof of Object.keys(profs)) {
                professors.push(profs[prof]);
            }
        })
    } catch (err) {
        console.log(err);
    } finally {
        return professors
    }
}

async function getProfessor(id: string): Promise<IProfessor | undefined> {
    let professor = undefined

    try {
        await db.ref(`professors/${id}`).once('value', (data) => {
            professor = data.toJSON() as IProfessor;
        })

        return professor
    } catch (err) {
        console.log(err);
    }

    return undefined
}

async function addScheduleToProfessor(id_professor: string, id_sched: string, schedule: IProfessorSchedule) {
    try {
        await db.ref(`professors/${id_professor}/schedules/${id_sched}`).set(schedule);

        return true;

    } catch (err) {
        console.log(err);
    }

    return false;
}

async function remScheduleProfessor(id_professor: string, id_sched: string) {
    try {
        await db.ref(`professors/${id_professor}/schedules/${id_sched}`).remove();

        return true;

    } catch (err) {
        console.log(err);
    }

    return false;
}



async function getAllNotAvailableTurns(id_professor: string, date: Date) {
    const not_available_turns: TurnType[] = []

    try {
        await db.ref(`professors/${id_professor}/schedules`).once('value', (data) => {
            const dates: any = data.toJSON();

            for (let d of Object.keys(dates)) {
                if (dates[d].date === date) {
                    not_available_turns.push(dates[d].turn);
                }
            }
        })

    } catch (err) {
        console.log(err)

    } finally {
        return not_available_turns
    }
}

async function getAllSchedules(id_user: string): Promise<IProfessorSchedule[] | null> {
    try {
        const schedules: IProfessorSchedule[] = []

        await db.ref(`professors/${id_user}/schedules`).once('value', (data) => {
            const sched: any = data.toJSON();

            if (!sched) return [];

            for (let sch of Object.keys(sched)) {
                schedules.push(sched[sch]);
            }
        })

        return schedules;

    } catch (err) {
        console.log(err);

        return null;
    }
}

export default {
    getAllProfessor,
    getProfessor,
    getAllNotAvailableTurns,
    addScheduleToProfessor,
    getAllSchedules,
    remScheduleProfessor
}