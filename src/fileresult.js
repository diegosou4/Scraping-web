

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as jsonfile from 'jsonfile';
import * as readline from 'node:readline';
import fs from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';
import { Geoinfo } from './class/geoinfo.js';
import { replace } from 'replace-json-property';
import { myjsonData, updateJson } from './update.js';
import * as util from 'util';

export function createFileF(combinetJson)
{
    const jsonToString = JSON.stringify(combinetJson);
    fs.writeFile("ready/finish.json",jsonToString, function(err){
      if(err){
            return console.log('erro')
        }
        console.clear();
        console.log('Arquivo Criado'.blue);
        console.log("Ate a proxima".blue)
    });
}

