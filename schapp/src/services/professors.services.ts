import ProfessorsRepository from "./database/professors/professors.repository";

const getAllProfessors = async () => {
    return ProfessorsRepository.getAllProfessor();
}

const getAllProfessorSchedules = async (id_professor: string, date: string) => {

    const schedules = await ProfessorsRepository.getAllSchedules(id_professor);

    if (!schedules) return [];

    return schedules.filter(schedule => schedule.date === date).map(schedule => schedule.turn);
}


export default {
    getAllProfessors,
    getAllProfessorSchedules
}


