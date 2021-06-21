'use strict';

const firebase = require('../db');
const { v4: uuidv4 } = require('uuid');
const db = firebase.database();


const addProfessor = async (req, res, next) => {
    try {
        const data = req.body;
        const professor = {
            id: uuidv4(),
            name: data.name,
            subject: data.subject,
            email: data.email,
        }
        await db.ref(`professors/${professor.id}`).set(professor);
        res.status(200).send(professor);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getAllProfessors = async (req, res, next) => {
    try {
        const professors = [];

        await db.ref('professors').once('value', (data) => {
            professors.push(data.toJSON() || {});
        });

        if(professors.empty) {
            res.status(404).send('Nenhum professor encontrado.');
        }else{
            res.status(200).send(professors);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProfessor = async(req, res, next) => {
    const professors = [];
    try{    
        await db.ref(`professors/${req.params.id}`).once('value', (data) => {
            const profs = data.toJSON();
            res.json(profs);
        })
        res.status(200).send(profs)
    }catch(err){
        res.status(404).send("Professor não encontrado");
        console.log(err);
    }finally{
        return professors
    }
}

module.exports = {
    addProfessor,
    getProfessor,
    getAllProfessors,
}