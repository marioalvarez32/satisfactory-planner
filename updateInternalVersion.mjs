import fs from 'fs';
import { readFile } from 'fs/promises';

async function updateVersion(newVersion) {
  console.log('🚀 ~ file: updateInternalVersion.js:5 ~ updateVersion ~ newVersion:', newVersion);
  const customJsonFile = './public/internalVersion.json';

  try {
    const data = await readFile(customJsonFile, 'utf8');
    const customJson = JSON.parse(data);

    customJson.version = newVersion;

    fs.writeFileSync(customJsonFile, JSON.stringify(customJson, null, 2));
    console.log(`Updated version in ${customJsonFile} to ${newVersion}`);
  } catch (error) {
    console.error(`Error updating version: ${error}`);
  }
}

// eslint-disable-next-line no-undef
const newVersion = process.argv[2];
updateVersion(newVersion);
