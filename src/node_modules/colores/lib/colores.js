const colors = require('./colors-code')

class color {
    constructor() {

    }
    static cyan(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.cyan.first}${string}${colors.cyan.final}`
    } 
    static yellow(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.yellow.first}${string}${colors.yellow.final}`
    }
   static black(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.black.first}${string}${colors.black.final}`
    }
     static white(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.white.first}${string}${colors.white.final}`
    }
    static red(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.red.first}${string}${colors.red.final}`
    }
    static magenta(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.magenta.first}${string}${colors.magenta.final}`
    }
    static green(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.green.first}${string}${colors.green.final}`
    }
    static blue(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.blue.first}${string}${colors.blue.final}`
    }
    static grey(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.grey.first}${string}${colors.grey.final}`
    }
    static gray(string) {
        if(typeof string !== 'string') throw new Error(`The param must be a string.`)
        return `${colors.grey.first}${string}${colors.grey.final}`
    }
}

module.exports = color