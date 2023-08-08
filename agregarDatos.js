import inquirer from "inquirer"
import fs from "fs"
import {v4 as uuidv4} from "uuid"
import consultarBD from "./consultarBD.js"

export default async function agregarDatos(info) {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "nombre",
        message: "Ingresa el nombre:",
      },
      {
        type: "input",
        name: "apellido",
        message: "Ingresa los apellidos:",
      },
      {
        type: "number",
        name: "telefono",
        message: "Ingresa el Nro. de télefono:",
      },
      {
        type: "list",
        name: "equipo",
        message: "Ingresa tu equipo de trabajo:",
        choices: [
          {name: "Desarrollo", value: "Desarrollo"},
          {name: "Release", value: "Release"},
          {name: "Soporte", value: "Soporte"}
        ],
      },
    ])

    const data = {
      id: uuidv4(),
      nombre: answers.nombre,
      apellido: answers.apellido,
      telefono: answers.telefono,
      equipo: answers.equipo,
    }
    info.push(data)

    if (fs.existsSync("bd.json")) {
      crearDetalles(info);
    } else {
      fs.appendFile("bd.json", "[]", (err) => {
        if (err) {
          console.log("No se pudo crear bd.json", err);
          return;
        }
        crearDetalles(info);
      });
    }

  } catch (error) {
    console.log("¡Algo salió mal!", error)
  }
}

async function crearDetalles(info) {
  await fs.writeFile("bd.json", JSON.stringify(info), function (err) {
    if (err) {
      console.log(err);
    }
    console.log("¡Datos Guardados correctamente!");
  });
}

consultarBD(agregarDatos);
