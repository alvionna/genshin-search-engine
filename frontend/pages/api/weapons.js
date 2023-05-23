import path from 'path';
import { promises as fs } from 'fs';

//Find the absolute path of the json directory
const jsonDirectory = path.join(process.cwd(), 'json/weapons.json');

export default async function handler(req, res) {
  //Read the json data file data.json
  const fileData = await fs.readFile(jsonDirectory, 'utf-8');
  const objectData = JSON.parse(fileData);
  //Return the content of the data file in json format
  res.status(200).json(objectData);
}