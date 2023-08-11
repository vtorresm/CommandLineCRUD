import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

import queryDB from './queryDB.js';

export default async function addData(info) {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'number',
        name: 'wi',
        message: chalk.green('Ingresa el WI:'),
      },
      {
        type: 'input',
        name: 'iprPet',
        message: chalk.green('Ingresa la PET/IPR:'),
      },
      {
        type: 'input',
        name: 'description',
        message: chalk.green('Ingresa la descripción:'),
      },
      {
        type: 'list',
        name: 'tdp',
        message: chalk.green('Ingresa Coord. TDP:'),
        choices: [
          { name: 'Omar Loayza Becerra', value: 'Omar Loayza Becerra' },
          { name: 'Julio Carmen Rodriguez', value: 'Julio Carmen Rodriguez' },
          { name: 'Marco Espinoza Valencia', value: 'Marco Espinoza Valencia' },
          { name: 'Fiorella Florencio Inga', value: 'Fiorella Florencio Inga' },
          { name: 'Saul Salhuana Machuca', value: 'Saul Salhuana Machuca' },
        ],
      },
      {
        type: 'input',
        name: 'fechaPaP',
        message: chalk.green('Ingresa fecha de pase:'),
      },
      {
        type: 'input',
        name: 'horaPaPi',
        message: chalk.green('Ingresa hora inicio:'),
      },
      {
        type: 'input',
        name: 'horaPaPf',
        message: chalk.green('Ingresa hora fin:'),
      },
      {
        type: 'list',
        name: 'despliegue',
        message: chalk.green('Desplegado por:'),
        choices: [
          { name: 'NTTDATA', value: 'NTTDATA' },
          { name: 'TDP', value: 'TDP' },
        ],
      },
      {
        type: 'input',
        name: 'sistema',
        message: chalk.green('Ingrese el Sistema:'),
      },
      {
        type: 'list',
        name: 'niubiz',
        message: chalk.green('Ingresa Coord. Niubiz:'),
        choices: [
          { name: 'Cesar Curitomay', value: 'Cesar Curitomay' },
          { name: 'Brando Avila', value: 'Brando Avila' },
          { name: 'Lucia Escudero', value: 'Lucia Escudero' },
          { name: 'Javier Bautista', value: 'Javier Bautista' },
          { name: 'JJaime Alvarado', value: 'Jaime Alvarado' },
        ],
      },
      {
        type: 'checkbox',
        name: 'menu',
        message: chalk.green('¿Se modificó el Menu GECOI ?'),
        choices: [{ name: 'SI' }, { name: 'NO', checked: true }],
      },
      {
        type: 'checkbox',
        name: 'clearing',
        message: chalk.green('¿Clearing Controlado?'),
        choices: [{ name: 'SI' }, { name: 'NO', checked: true }],
      },
    ]);

    const data = {
      id: uuidv4(),
      wi: answers.wi,
      iprPet: answers.iprPet,
      description: answers.description,
      tdp: answers.tdp,
      fechaPaP: answers.fechaPaP,
      horaPaPi: answers.horaPaPi,
      horaPaPf: answers.horaPaPf,
      despliegue: answers.despliegue,
      sistema: answers.sistema,
      niubiz: answers.niubiz,
      menu: answers.menu,
      clearing: answers.clearing,
    };
    info.push(data);

    if (fs.existsSync('bd.json')) {
      createDetails(info);
    } else {
      fs.appendFile('bd.json', '[]', (err) => {
        if (err) {
          console.log(chalk.white.bgRed('No se pudo crear bd.json', err));
          return;
        }
        createDetails(info);
      });
    }
  } catch (error) {
    console.log(chalk.white.bgRed('¡Algo salió mal!', error));
  }
}

async function createDetails(info) {
  await fs.writeFile('bd.json', JSON.stringify(info), function (err) {
    if (err) {
      console.log(chalk.white.bgRedBright(err));
    }
    console.log('');
    console.log(chalk.black.bgBlue('¡Datos Guardados correctamente!'));
  });
}

queryDB(addData);
