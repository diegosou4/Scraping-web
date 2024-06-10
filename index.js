import axios from 'axios';
import * as cheerio from 'cheerio';

const url = 'https://www.ubereats.com/pt/store/kfc-colombo/y-hkt0EKTIuJ5QC1irzLFA';

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
        console.log("Texto após a palavra-chave: " + textAfterKeyword);
    }
}

async function scrapeData(url, retries = 5) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const html = response.data;
        const $ = cheerio.load(html);

        keywordsearch(html,"latitude",",");
        keywordsearch(html,"longitude","}");
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

scrapeData(url);
