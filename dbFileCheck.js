import fs from 'fs';
import chalk from 'chalk';
import { exit } from 'process';

export default function dbFileCheck() {
  if (fs.existsSync('db.json')) {
    console.log('');
    console.log(
      chalk.black.bgYellow('La base de datos está vacía. ¡Crea algunos datos!')
    );
    exit(1);
  }
}
