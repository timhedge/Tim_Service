const axios = require('axios');
const faker = require('faker');
const fs = require('fs');
const path = require('path');

let randomPhoto = faker.image.imageUrl(70, 70);

async function saveImage (url) {
  let counter = 0;
  let asynchRequests = [];

  while (counter < 1000) {

    let fileName = 'randomPhoto_' + counter + '.jpg';
    let localPath = path.resolve(__dirname, './randomImages/', fileName);
    console.log(fileName)

    let file = fs.createWriteStream(localPath);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    response.data.pipe(file);

    let downloadPromise = new Promise((resolve, reject) => {
      file.on('finish', resolve);
      file.on('error', reject);
    });

    asynchRequests.push(downloadPromise);
    counter++;

  }

  Promise.all(asynchRequests)
  .then((values) => {
    console.log('download complete');
  })

}

saveImage(randomPhoto);


