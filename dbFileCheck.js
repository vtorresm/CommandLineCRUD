import fs from "fs";
import {exit} from "process";

export default function dbFileCheck() {
  if (fs.existsSync("db.json")) {
    console.log("La base de datos está vacía. ¡Crea algunos datos!");
    exit(1);
  }
}
