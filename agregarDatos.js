import inquirer from "inquirer"
import fs from "fs"
import {v4 as uuidv4} from "uuid"
import consultarBD from "./consultarBD.js"

export default async function agregarDatos(info) {
  try {
    const answers = await inquirer.prompt([
      {
        type: "number",
        name: "wi",
        message: "Ingresa el WI:",
      },
      {
        type: "input",
        name: "iprPet",
        message: "Ingresa la PET/IPR:",
      },
      {
        type: "list",
        name: "tdp",
        message: "Ingresa Coord. TDP:",
        choices: [
          {name: "Omar Loayza Becerra", value: "Omar Loayza Becerra"},
          {name: "Julio Carmen Rodriguez", value: "Julio Carmen Rodriguez"},
          {name: "Marco Espinoza Valencia", value: "Marco Espinoza Valencia"},
          {name: "Fiorella Florencio Inga", value: "Fiorella Florencio Inga"},
          {name: "Saul Salhuana Machuca", value: "Saul Salhuana Machuca"},
        ],
      },
      {
        type: "input",
        name: "fechaPaP",
        message: "Ingresa fecha de pase:",
      },
      {
        type: "input",
        name: "horaPaPi",
        message: "Ingresa hora inicio:",
      },
      {
        type: "input",
        name: "horaPaPf",
        message: "Ingresa hora fin:",
      },
      {
        type: "list",
        name: "despliegue",
        message: "Desplegado por:",
        choices: [
          {name: "NTTDATA", value: "NTTDATA"},
          {name: "TDP", value: "TDP"}
        ],
      },
      {
        type: "input",
        name: "sistema",
        message: "Ingrese el Sistema:",
      },
      {
        type: "list",
        name: "niubiz",
        message: "Ingresa Coord. Niubiz:",
        choices: [
          {name: "Cesar Curitomay", value: "Cesar Curitomay"},
          {name: "Brando Avila", value: "Brando Avila"},
          {name: "Lucia Escudero", value: "Lucia Escudero"},
          {name: "Javier Bautista", value: "Javier Bautista"},
          {name: "JJaime Alvarado", value: "Jaime Alvarado"},
          ],
      },
      {
        type: "list",
        name: "menu",
        message: "¿Se modifico el Menu GECOI ?",
        choices: [
          {name: "S", value: "SI"},
          {name: "N", value: "NO"}
        ],
      },
      {
        type: "list",
        name: "clearing",
        message: "¿Clearing Controlado?",
        choices: [
          {name: "S", value: "SI"},
          {name: "N", value: "NO"}
        ],
      },
    ])

    const data = {
      id: uuidv4(),
      wi: answers.wi,
      petipr: answers.petipr,
      tdp: answers.tdp,
      fechapap: answers.fechapap,
      horapapi: answers.horapapi,
      horapapf: answers.horapapf,
      despliegue: answers.despliegue,
      sistema: answers.sistema,
      niubiz: answers.niubiz,
      menu: answers.menu,
      clearing: answers.clearing,
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
