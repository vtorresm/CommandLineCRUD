import inquirer from "inquirer";
import fs from "fs";
import consultarBD from "./consultarBD.js";
import bdArchivoChequeo from "./bdArchivoChequeo.js";

export default async function actualizarDatos(info) {
  bdArchivoChequeo();

  try {
    const respuestas = await inquirer.prompt([
      {
        type: "input",
        name: "registroID",
        message: "Ingresa Registro ID",
      },
    ]);

    let actual;

    info.forEach((elemento) => {
      if (elemento.id === respuestas.recordID) {
        actual = elemento;

        actualizarDetalles(actual, info);
      }
    });
  } catch (error) {
    console.log("Algo salió mal!", error);
  }
}

async function actualizarDetalles(actual, info) {
  try {
    const devoluciones = await inquirer.prompt([
      {
        type: "input",
        default: actual.nombre,
        name: "nombre",
        message: "¿Cuál es tu nombre?",
      },
      {
        type: "number",
        default: actual.telefono,
        name: "telefono",
        message: "¿Cuál es tu teléfono?",
      },
      {
        type: "list",
        default: actual.edad,
        name: "edad",
        message: "¿Eres un adulto?",
        choices: [
          {name: "S", value: "Adulto"},
          {name: "N", value: "Menor"},
        ],
      },
    ]);

    actual.nombre = devoluciones.nombre;
    actual.telefono = devoluciones.telefono;
    actual.edad = devoluciones.edad;

    await fs.writeFile("bd.json", JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
      }
      console.log("actualizado");
    });
  } catch (error) {
    console.log("¡Algo salió mal!", error);
  }
}

consultarBD(actualizarDatos)
