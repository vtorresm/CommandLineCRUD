import inquirer from "inquirer";
import fs from "fs";
import consultarBD from "./consultarBD.js";
import bdArchivoChequeo from "./bdArchivoChequeo.js";

export default async function removerDatos(info) {
  bdArchivoChequeo();

  try {
    const respuestas = await inquirer.prompt([
      {
        type: "input",
        name: "registroID",
        message: "Ingresa el ID del Registro",
      },
    ]);

    let datosRestantes = [];
    info.forEach((elemento) => {
      if (elemento.id !== respuestas.registroID) {
        datosRestantes.push(elemento);
      }
    });

    fs.writeFile("bd.json", JSON.stringify(datosRestantes), function (err) {
      if (err) {
        console.log(err);
      }
      console.log("¡Eliminado!");
    });
  } catch (error) {
    console.log("¡Algo salió mal!", error);
  }
}

consultarBD(removerDatos)
