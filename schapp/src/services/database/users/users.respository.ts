import firebase from "../config/fire";
import { IUser, IUserSchedule } from "./users.interface";

const db = firebase.database();

async function getUser(id: string): Promise<IUser | undefined> {
    let user = undefined

    try {
        await db.ref(`users/${id}`).once('value', (data) => {
            user = data.toJSON() as IUser;
        })
        return user
    } catch (err) {
        console.log(err);
    }

    return user
}

async function getUser_ID(): Promise<string | undefined> {
    try {
        const user_id = await firebase.auth().currentUser?.uid;

        return user_id;
    } catch (err) {
        console.log(err);
    }

    return undefined
}

async function addUser(user: IUser) {
    try {

        await db.ref(`users/${user.id}`).set(user);

        return true;

    } catch (err) {
        console.log(err);
    }

    return false;
}

async function addScheduleUser(id_user: string, id_sched: string, schedule: IUserSchedule) {
    try {
        await db.ref(`users/${id_user}/schedules/${id_sched}`).set(schedule);

        return true;

    } catch (err) {
        console.log(err);
    }

    return false;
}

async function remScheduleUser(id_user: string, id_sched: string) {
    try {
        await db.ref(`users/${id_user}/schedules/${id_sched}`).remove();

        return true;

    } catch (err) {
        console.log(err);
    }

    return false;
}

async function getAllSchedules(id_user: string): Promise<IUserSchedule[] | null> {
    try {
        const schedules: IUserSchedule[] = []

        await db.ref(`users/${id_user}/schedules`).once('value', (data) => {
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
    getUser,
    addUser,
    addScheduleUser,
    getAllSchedules,
    getUser_ID,
    remScheduleUser
}