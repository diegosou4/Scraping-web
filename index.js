import axios from 'axios';
import * as cheerio from 'cheerio';
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';


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
        console.log(keyword + textAfterKeyword);
    }
}

async function scrapeData(url, name ,retries = 5) {

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);
        console.clear();
        console.log("Nome:");
        keywordsearch(html,"latitude",",");
        keywordsearch(html,"longitude","}");
        console.log("Comandos:");
        console.log("1- Adicionar o Json");
        console.log("2- Voltar ao Menu Inicial");
        console.log("3- Finalizar o progama");
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

// scrapeData(process.argv[2]);


function boa_test()
{
    let name_res;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log("Bem Vindo ao sistema Crapping Uber!!\n");
    // rl.question("Informe o Nome do restaurante:", (name) => {
    //     name_res = name;
    // });
    rl.question("Informe o Url do site:", (url) => {
        scrapeData(url,name_res);
        rl.close();
    });
 
}

boa_test();