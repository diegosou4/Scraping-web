
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as jsonfile from 'jsonfile';
import * as readline from 'node:readline';
import fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import { Geoinfo } from './geoinfo.js';
import { replace } from 'replace-json-property';


export async function updateJson(jsonData, myinfo, id)
{
    if(myinfo.getID() === 0)
    {
        jsonData.version = 1;
    }else{
      delete jsonData.version;
    }
  
    jsonData.locations[0].address = myinfo.getAdress();
    jsonData.locations[0].longitude = parseFloat(myinfo.getLongitude());
    jsonData.locations[0].elementType = 1;
    jsonData.locations[0].orderIndex = myinfo.getID();
    jsonData.locations[0].latitude = parseFloat(myinfo.getLatitude());
    jsonData.locations[0].groupId = 0;
    jsonData.locations[0].name = myinfo.getName();
    jsonData.locations[0].locationId = myinfo.getID();
}

export function myjsonData() {
    return new Promise((resolve, reject) => {
      fs.readFile('/home/diegmore/Desktop/git/Scaping-Uber/src/example.json', 'utf8', (err, data) => {
        if (err) {
          reject(err); // Rejeita a Promise com o erro
        } else {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData); // Resolve a Promise com os dados parseados
          } catch (parseErr) {
            reject(parseErr); // Rejeita a Promise com o erro de análise
          }
        }
      });
    });
  }
  
