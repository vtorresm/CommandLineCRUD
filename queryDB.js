import fs from 'fs';

export default async function queryDB(externalFunction) {
  try {
    let info = [];

    if (fs.existsSync('bd.json')) {
      await fs.readFile('bd.json', function (err, data) {
        info = JSON.parse(data.toString());
        console.log(info);

        if (err) {
          console.log(err);
          return;
        }

        if (externalFunction && !err) {
          externalFunction(info);
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction(info);
        return;
      }
    }
  } catch (error) {
    console.error(`Algo ocurrió: ${error.message}`);
  }
}
