import inquirer from "inquirer"
import fs from "fs"
import {v4 as uuidv4} from "uuid"
import consultarBD from "./consultarBD.js"

export default async function agregarDatos(info) {
  try {
    const respuestas = await inquirer.prompt([
      {
        type: "input",
        name: "nombre",
        message: "¿Cómo te llamas?",
      },
      {
        type: "number",
        name: "telefono",
        message: "¿Cuál es tu teléfono?",
      },
      {
        type: "list",
        name: "edad",
        message: "¿Eres adulto?",
        choices: [
          {name: "S", value: "Adulto"},
          {name: "N", value: "Menor"}
        ],
      },
    ])

    const datos = {
      id: uuidv4(),
      nombre: respuestas.nombre,
      telefono: respuestas.telefono,
      edad: respuestas.edad,
    }
    info.push(datos)

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
    console.log("¡Guardado!");
  });
}

consultarBD(agregarDatos);
