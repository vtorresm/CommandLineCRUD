import fs from "fs";

export default async function consultarBD(funcionExterna) {
  try {
    let info = [];

    if (fs.existsSync("bd.json")) {
      await fs.readFile("bd.json", function (err, datos) {
        info = JSON.parse(datos.toString());
        console.log(info);

        if (err) {
          console.log(err);
          return;
        }

        if (funcionExterna && !err) {
          funcionExterna(info);
          return;
        }
      });
    } else {
      if (funcionExterna) {
        funcionExterna(info);
        return;
      }
    }
  } catch (error) {
    console.error(`Algo ocurrió: ${error.message}`);
  }
}
