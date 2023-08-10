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
        message: "Ingresa Registro ID:",
      },
    ]);

    let current;

    info.forEach((element) => {
      if (element.id === answers.recordID) {
        current = element;

        updateDetails(current, info);
      }
    });
  } catch (error) {
    console.log("Algo salió mal!", error);
  }
}

async function updateDetails(current, info) {
  try {
    const returns = await inquirer.prompt([
      {
        type: "number",
        default: current.wi,
        name: "wi",
        message: "Ingresa el WI:",
      },
      {
        type: "input",
        default: current.iprPet,
        name: "iprPet",
        message: "Ingresa la PET/IPR:",
      },
      {
        type: "list",
        default: current.tdp,
        name: "tdp",
        message: "Ingresa Coord. TDP:",
        choices: [
          {name: "Omar Loayza Becerra", value: "Omar Loayza Becerra"},
          {name: "Julio Carmen Rodriguez", value: "Julio Carmen Rodriguez"},
          {name: "Marco Espinoza Valencia", value: "Marco Espinoza Valencia"},
          {name: "Fiorella Florencio", value: "Fiorella Florencio Inga"},
          {name: "Saul Salhuana Machuca", value: "Saul Salhuana Machuca"},
          ],
      },
      {
        type: "input",
        default: current.fechaPaP,
        name: "fechaPaP",
        message: "Ingresa fecha de pase:",
      },
      {
        type: "input",
        default: current.horaPaPi,
        name: "horaPaPi",
        message: "Ingresa hora inicio:",
      },
      {
        type: "input",
        default: current.horaPaPf,
        name: "horaPaPf",
        message: "Ingresa hora fin:",
      },
       {
        type: "list",
         default: current.despliegue,
         name: "despliegue",
         message: "Desplegado por:",
        choices: [
           {name: "NTTDATA", value: "NTTDATA"},
           {name: "TDP", value: "TDP"}
        ],
       },
      {
        type: "input",
        default: current.sistema,
        name: "sistema",
        message: "Ingrese el Sistema:",
      },
      {
        type: "list",
        default: current.niubiz,
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
        default: current.menu,
        name: "menu",
        message: "¿Se modifico el Menu GECOI ?",
        choices: [
          {name: "S", value: "SI"},
          {name: "N", value: "NO"},
        ],
      },
      {
        type: "list",
        default: current.clearing,
        name: "clearing",
        message: "¿Clearing Controlado ?",
        choices: [
          {name: "S", value: "SI"},
          {name: "N", value: "NO"},
          ],
      },
    ]);

    current.wi = returns.wi;
    current.iprPet = returns.iprPet;
    current.tdp = returns.tdp;
    current.fechaPaP = returns.fechaPaP;
    current.horaPaPi = returns.horaPaPi;
    current.horaPaPf = returns.horaPaPf;
    current.despliegue = returns.despliegue;
    current.sistema = returns.sistema;
    current.niubiz = returns.niubiz;
    current.menu = returns.menu;
    current.clearing = returns.clearing;

    await fs.writeFile("bd.json", JSON.stringify(info), function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Datos actualizados correctamente!");
    });
  } catch (error) {
    console.log("¡Algo salió mal!", error);
  }
}

consultarBD(actualizarDatos)
