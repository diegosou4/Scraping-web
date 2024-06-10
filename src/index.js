
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as jsonfile from 'jsonfile';
import * as readline from 'node:readline';
import fs from 'node:fs';


import { stdin as input, stdout as output } from 'node:process';

import { Geoinfo } from './geoinfo.js';



async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function keywordsearch(content,keyword, char)
{
    
    let keywordPosition = content.indexOf(keyword);

    if(keywordPosition !== -1)
    {
        let startPosition = content.indexOf(":", keywordPosition);
        let endPosition = content.indexOf(char, startPosition);
        let textAfterKeyword = content.substring(startPosition, endPosition).trim();
        return(textAfterKeyword);
    }
}

async function scrapeData(myinfo,rl,retries = 5) {

    try {
        const response = await axios.get(myinfo.getUrl(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        console.clear();
        console.log(`Nome: ${myinfo.getName()}`);
        myinfo.setlatitude(keywordsearch(html,"latitude",","));
        myinfo.setlongitude(keywordsearch(html,"longitude","}"));
        console.log(`Latitude: ${myinfo.getLatitude()}`);
        console.log(`Longitude: ${myinfo.getLongitude()}`);
        return(true);
        
    } catch (error) {
        if (error.response && error.response.status === 429 && retries > 0) {
            console.log(`Rate limit exceeded. Retrying in 5 seconds... (${retries} retries left)`);
            await delay(5000); // Wait for 5 seconds before retrying
            return scrapeData(url, retries - 1);
        } else {
            console.error('Failed to fetch data:', error.message);
        }
    }
}
  
// async function main_new() {

    
//     const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout
//     });
//     const myinfo = new Geoinfo("",0,0,"null");
//     console.log("Bem Vindo ao sistema Crapping Uber!!\n");
  
//     rl.question("Informe o Nome do restaurante: ", (name) => {
//         myinfo.setName(name);
//     rl.question("Informe o Url do restaurante: ", async (url) => {
//         myinfo.seturl(url);
//     await scrapeData(myinfo,rl);
//     rl.question("Deseja Adicionar ao Json: ?", async (check) =>
//     {
//         if(check === "1")
//         {
       
//             const file = "./example.json";
//             const data = jsonfile.readFile('example.json');
//             console.log(data);
//             console.log("Adicionado com sucesso");
//         }
//         rl.close();
//     })
//     })
//     });
// }  
//main_new();

function  new_f()
{
    fs.readFile('/home/diegmore/Desktop/git/take/Scaping-Uber/src/example.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
}

new_f();