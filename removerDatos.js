import inquirer from "inquirer";
import fs from "fs";
import consultarBD from "./consultarBD.js";
import bdArchivoChequeo from "./bdArchivoChequeo.js";

export default async function removerDatos(info) {
  bdArchivoChequeo();

  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "registroID",
        message: "Ingresa el ID del Registro",
      },
    ]);

    let datosRestantes = [];
    info.forEach((element) => {
      if (element.id !== answers.registroID) {
        datosRestantes.push(element);
      }
    });

    fs.writeFile("bd.json", JSON.stringify(datosRestantes), function (err) {
      if (err) {
        console.log(err);
      }
      console.log("¡Dato eliminado correctamente!");
    });
  } catch (error) {
    console.log("¡Algo salió mal!", error);
  }
}

consultarBD(removerDatos)
