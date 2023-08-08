import fs from 'fs';
import { exit } from "process"

if (!fs.existsSync("bd.json")) {
    console.log("El archivo existe!");
    exit(1);
}
