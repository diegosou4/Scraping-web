
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as jsonfile from 'jsonfile';
import * as readline from 'node:readline';
import fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import { Geoinfo } from './geoinfo.js';
import { replace } from 'replace-json-property';
import { myjsonData, updateJson } from './update.js';
import * as util from 'util';



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

     
        myinfo.setlatitude(keywordsearch(html,"latitude",","));
        myinfo.setlongitude(keywordsearch(html,"longitude","}"));
        myinfo.setAdress(keywordsearch(html,"streetAddress","}"));
        console.log(`Nome: ${myinfo.getName()}`);
        console.log(`Endereco: ${myinfo.getAdress()}`)
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


async function ask(rl, jsonData, numId,myInfo) {
   
    myInfo = new Geoinfo("", 0, 0, "null");
    myInfo.setID(numId);
  
    const question = util.promisify(rl.question).bind(rl);
  
    const name = await question("Informe o Nome do restaurante: ");
    myInfo.setName(name);
  
    const url = await question("Informe o Url do restaurante: ");
    myInfo.seturl(url);
  
    await scrapeData(myInfo, rl);
  
    const check = await question("Deseja Adicionar ao Json: (1 - Sim, 2 - Não, 3 - Sim e Sair): ");
  
    if (check === "1") {
      await updateJson(jsonData, myInfo, numId);
      return 1;
    } else if(check === "3") {
        await updateJson(jsonData, myInfo, numId);
        return 0;
    }else{
        return 0;
    }
  }



  async function main_new() {
    let numId = 0;
    const myInfo = new Array(100).fill(null).map(() => ({}));
    const jsonData = new Array(100).fill(null).map(() => ({}));
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    try {
      
      console.log("Bem Vindo ao sistema Crapping Uber!!\n");
      while (true) {
        jsonData[numId] = await myjsonData();
        const result = await ask(rl, jsonData[numId], numId,myInfo[numId]);
        numId++;
        if (result === 0) {
        break;
        }
     
      }
    } catch (error) {
      console.error("Deu ruim", error);
    } finally {
      rl.close();
     
    }
   const combinetJson = {
        version : jsonData[0].version,
        locations : jsonData[0].locations.concat(jsonData[1].locations)
   };
   console.log(combinetJson);
  }
  
main_new();
  



