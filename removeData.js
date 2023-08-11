import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import queryDB from './queryDB.js';
import dbFileCheck from './dbFileCheck.js';

export default async function removeData(info) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'recordID',
        message: chalk.blue('Ingresa el ID del Registro:'),
      },
    ]);

    let remnantData = [];

    info.forEach((element) => {
      if (element.id !== answers.recordID) {
        remnantData.push(element);
      }
    });

    fs.writeFile('bd.json', JSON.stringify(remnantData), function (err) {
      if (err) {
        console.log(chalk.red(err));
      }
      console.log(chalk.red('¡Dato eliminado correctamente!'));
    });
  } catch (error) {
    console.log(chalk.white.bgRed('¡Algo salió mal!', error));
  }
}

queryDB(removeData);
