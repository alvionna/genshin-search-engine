import fs from 'fs';
import path from 'path';

const jsonDirectory = path.join(process.cwd(), 'json');

export async function getAllDataIds() { 
  // Get the directory of the json files
  const fileNames = fs.readdirSync(jsonDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ''),
      },
    };
  });
}

//MODIFY getFileData SO THAT THE HTML CODE WOULD BE ACCORDING TO THE TYPE: 
//ARTIFACTS, STORY, CHARACTERS, AND WEAPONS


//id: specified the type
export function getFileData(id) {
  const filePath = path.join(jsonDirectory, `${id}.json`);
  // Read the json file
  const jsonData = fs.readFileSync(filePath, 'utf8');
  // Parse data as json
  const objectData = JSON.parse(jsonData);
  var contentHtml = ""
  objectData.forEach(function(val) {
    var keys = Object.keys(val);
    contentHtml += `<div className = ${id}>`;
    keys.forEach(function(key) {
      if (key!='id') { 
        contentHtml += "<strong>" + key + "</strong>: " + val[key] + "<br>";
      }
    });
    contentHtml += "</div><br>";
  });
  return { 
    id,
    contentHtml, 
    ...objectData
  }
}
