
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
import { createFileF } from './fileresult.js';
import * as colors from 'colors';

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
                                                                                                
function keywordsearch(content,keyword, char, i)
{
    
    let keywordPosition = content.indexOf(keyword);

    if(keywordPosition !== -1)
    {
        let startPosition = content.indexOf(":", keywordPosition) + i;
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
        myinfo.setlatitude(keywordsearch(html,"latitude",",",1));
        myinfo.setlongitude(keywordsearch(html,"longitude","}",1));
        myinfo.setAdress(keywordsearch(html,"streetAddress","}",0));
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
            return(false);
        }
    }
}


async function ask(rl, jsonData, numId,myInfo) {
   
    myInfo = new Geoinfo("", 0, 0, "null");
    myInfo.setID(numId);
    let done = false;
    const question = util.promisify(rl.question).bind(rl);
  
    const name = await question("Informe o Nome do restaurante: ");
    myInfo.setName(name);
  
    const url = await question("Informe o Url do restaurante: ");
    myInfo.seturl(url);
  
    done = await scrapeData(myInfo, rl);
    while (done == false)
    {
        const url = await question("O url informado Esta incorreto, informe um novo: ");
        myInfo.seturl(url);
        done = await scrapeData(myInfo, rl);
    }
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
    const combinetJson = {
        version : null,
        locations : null
   };
    try {
        console.log("/******************************************************************************************\\".blue);
        console.log("/******************************************************************************************\\".blue);
        console.log("/******************************************************************************************\\".blue);
        console.log("/*************************Bem Vindo ao sistema Crapping Uber!!*****************************\\".blue);
        console.log("/******************************************************************************************\\".blue);
        console.log("/******************************************************************************************\\".blue);
        console.log("/*******************************************************************************diegmore***\\".blue);
        console.log("\n");
        await delay(3000);
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
    if(numId == 1)
    {
        combinetJson.version = jsonData[0].version;
        combinetJson.locations = jsonData[0].locations;
    }
    else{
        if(numId > 1)
        {
            combinetJson.locations = jsonData[0].locations.concat(jsonData[1].locations);
        }
        let i = 2;
        while(i != numId)
        {
            combinetJson.locations = combinetJson.locations.concat(jsonData[i].locations);
            i++;
        }

        }
        createFileF(combinetJson);
}
    
 
   
  
main_new();
  



