
const connection = require('../config/dbConnection');


const createConsulta = async (task) => {
    const { dataConsulta, horaConsulta, tipoConsulta, obsPaciente, infosAdicionais, id_clinica, id_paciente, id_medico } = task;
    const query = "INSERT INTO consultas (dataConsulta, horaConsulta, tipoConsulta, obsPaciente, infosAdicionais, id_clinica, id_paciente, id_medico) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
    const [createdConsulta] = await connection.execute(query,  [dataConsulta, horaConsulta, tipoConsulta, obsPaciente, infosAdicionais, id_clinica, id_paciente, id_medico]);
    return createdConsulta;
}

const deleteConsulta = async (id) => {
    const deletedConsulta = await connection.execute("DELETE FROM consultas WHERE id = ?;",  [id]);
    return deletedConsulta;
}

const getAllConsultas = async () => {
    const tasks = await connection.execute("SELECT * FROM consultas;");
    return tasks[0];
}

const pegaTudo = async () => {

    const clinica = await connection.execute("SELECT * FROM clinicas;");
    const medico = await connection.execute("SELECT * FROM medicos;");
    const paciente = await connection.execute("SELECT * FROM pacientes;");

    const clinicaFinal = clinica[0];
    const medicoFinal = medico[0];
    const pacienteFinal = paciente[0];

    const task =  { clinicaFinal, medicoFinal, pacienteFinal };
    return task;
}

module.exports = {
    pegaTudo,
    createConsulta,
    deleteConsulta,
    getAllConsultas
};