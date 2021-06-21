import md5 from 'md5';
import { Alert } from "react-native";
import 'react-native-get-random-values';
import { LoginFormData } from "src/pages/Login";
import { v4 as uuidv4 } from 'uuid';
import firebase from "./database/config/fire";
import { TurnType } from "./database/professors/professors.interface";
import ProfessorRepository from './database/professors/professors.repository';
import { ICreateUser, IUpdateUser } from "./database/users/users.interface";
import UserRepository from './database/users/users.respository';


async function createSchedule(id_professor: string, date: string, turn?: TurnType) {
    try {
        const id = uuidv4();
        const id_user = await UserRepository.getUser_ID() as string;
        const userObj = await UserRepository.getUser(id_user);

        if (!turn) {
            Alert.alert(
                "Erro no cadastro do horário",
                `Selecione uma data`
            )
            return false;
        }

        if (!userObj) return false;

        const professorObj = await ProfessorRepository.getProfessor(id_professor);

        if (!professorObj) return false;

        await UserRepository.addScheduleUser(id_user, id, {
            id,
            date,
            turn,
            professor: {
                ...professorObj,
            }
        });

        await ProfessorRepository.addScheduleToProfessor(id_professor, id, {
            id,
            date,
            turn,
            student: userObj
        });

        return true;

    } catch (err) {
        Alert.alert(
            "Erro no cadastro do horário",
            `${console.log(err)}`
        )
    }

}

async function removeSchedule(id_professor: string, id_sched: string) {
    try {

        const id_user = await UserRepository.getUser_ID();

        if (id_user) {

            await UserRepository.remScheduleUser(id_user, id_sched);
            await ProfessorRepository.remScheduleProfessor(id_professor, id_sched);

            Alert.alert(
                "Agendamento apagado !",
                "Remoção do agendamento realizado."
            )

            return true;
        }

    } catch (err) {
        Alert.alert(
            "Erro no remoção do horário",
            `${console.log(err)}`
        )
    }

    return false;

}

async function createUser(data: ICreateUser) {
    try {

        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

        await firebase.auth().currentUser?.updateProfile({ displayName: data.name });

        const user = {
            id: await UserRepository.getUser_ID() as string,
            name: data.name,
            email: data.email,
            password: md5(data.password)
        }

        const result = await UserRepository.addUser(user);

        if (result) {
            Alert.alert(
                "Cadastro realizado !",
                "Você já pode acessar a aplicação.",
            );

            await firebase.auth().signOut()

            return true;
        }

    } catch (err) {
        if (err.code === 'auth/weak-password') {
            Alert.alert(
                "Senha inválida !",
                "Use uma senha com pelo menos 6 digitos.",
            );

        }

        if (err.code === 'auth/email-already-in-use') {
            Alert.alert(
                "Esse e-mail já está em uso :(",
                "Use um e-mail diferente para cadastro.",
            );
        }

        console.log(err.code);
    }

    return false;
}

async function updateUser(data: IUpdateUser) {
    try {

        const user = await firebase.auth().currentUser;

        let credential;

        if (user === null || user.email === null) return false;

        if (data.password && data.oldpassword) {

            credential = await firebase.auth.EmailAuthProvider.credential(user.email, data.oldpassword);

            if (await user.reauthenticateWithCredential(credential)) {
                await user.updatePassword(data.password);
                await firebase.database().ref(`users/${user?.uid}`).update({ password: md5(data.password) });

            }
        }

        if (data.name !== user?.displayName) {

            await firebase.auth().currentUser?.updateProfile({ displayName: data.name });
            await firebase.database().ref(`users/${user?.uid}`).update({ name: data.name });
        }

        Alert.alert(
            "Modificações confirmadas !",
            `Seu perfil já foi modificado.`,
        );

        return true;

    } catch (err) {

        if (err.code === 'auth/wrong-password') {
            Alert.alert(
                "Erro nas modificações !",
                "Sua senha atual está incorreta."
            )
        }

        if (err.code === 'auth/email-already-in-use') {
            Alert.alert(
                "Esse e-mail já está em uso :(",
                "Use um e-mail diferente para modificação.",
            );
        }
    }

    return false;
}

async function loginUser(data: LoginFormData) {
    try {

        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        const result = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        if (result) {
            Alert.alert(
                "Login realizado !",
                `Bem-vindo ${result.user?.displayName}.`,
            );

            return result;
        }

    } catch (err) {
        if (err.code === 'auth/user-not-found' ||
            err.code === 'auth/wrong-password') {
            Alert.alert(
                "Erro no login",
                "E-mail ou senha inválidos !",
            )
        }
    }

    return null;
}

async function logoutUser() {
    try {
        const result = await firebase.auth().signOut();;

        Alert.alert(
            "Você foi deslogado !",
            `Volte sempre :)`,
        );

        return result

    } catch (err) {
        console.log(err);
    }

    return false;
}

async function getAllUserSchedules(id_user: string) {
    const schedules = await UserRepository.getAllSchedules(id_user);

    return schedules;
}


export default {
    createUser,
    createSchedule,
    loginUser,
    getAllUserSchedules,
    updateUser,
    logoutUser,
    removeSchedule
}


