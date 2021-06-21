const express = require('express');
const {addProfessor, 
       getAllProfessors, 
       updateProfessor,
       deleteProfessor,
       getProfessor
      }= require('../controllers/profsController');

const router = express.Router();

router.get('/professor/:id', getProfessor);
router.post('/professor', addProfessor);
router.get('/professors', getAllProfessors);


module.exports = {
    routes: router
}