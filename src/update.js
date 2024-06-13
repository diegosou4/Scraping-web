
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
    }
 
    jsonData.locations[id - 1].address = myinfo.getAdress();
    jsonData.locations[id - 1].longitude = myinfo.getLongitude();
    jsonData.locations[id - 1].elementType = 1;
    jsonData.locations[id - 1].orderIndex = myinfo.getID();
    jsonData.locations[id - 1].latitude = myinfo.getLatitude();
    jsonData.locations[id - 1].groupId = 0;
    jsonData.locations[id - 1].name = myinfo.getName();
    jsonData.locations[id - 1].locationId = myinfo.getID();
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
  
