import inquirer from "inquirer";
import fs from "fs";
import consultarBD from "./consultarBD.js";
import bdArchivoChequeo from "./bdArchivoChequeo.js";

export default async function actualizarDatos(info) {
  bdArchivoChequeo();

  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "registroID",
        message: "Ingresa Registro ID",
      },
    ]);

    let current;

    info.forEach((element) => {
      if (element.id === answers.recordID) {
        current = element;

        actualizarDetalles(current, info);
      }
    });
  } catch (error) {
    console.log("Algo salió mal!", error);
  }
}

async function actualizarDetalles(current, info) {
  try {
    const returns = await inquirer.prompt([
      {
        type: "input",
        default: current.nombre,
        name: "nombre",
        message: "Ingresa el nombre:",
      },
      {
        type: "input",
        default: current.apellido,
        name: "apellido",
        message: "Ingresa el apellido:",
      },
      {
        type: "number",
        default: current.telefono,
        name: "telefono",
        message: "Ingresa el Nro. de télefono:",
      },
      {
        type: "list",
        default: current.equipo,
        name: "equipo",
        message: "Ingresa tu equipo de trabajo:",
        choices: [
          {name: "D", value: "Desarrollo"},
          {name: "R", value: "Release"},
          {name: "S", value: "Soporte"},
        ],
      },
    ]);

    current.nombre = returns.nombre;
    current.apellido = returns.apellido;
    current.telefono = returns.telefono;
    current.equipo = returns.equipo;

    await fs.writeFile("bd.json", JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Datos actualizados correctamente");
    });
  } catch (error) {
    console.log("¡Algo salió mal!", error);
  }
}

consultarBD(actualizarDatos)
