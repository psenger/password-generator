#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const clipboardy = require('clipboardy');

const {version} = require('./package.json');

const createPassword = ( length = 8, hasNumbers = true, hasSymbols = true ) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_-++{}|[]:;<>,.?/';
    let chars = alpha;
    hasNumbers ? ( chars += numbers ) : undefined
    hasSymbols ? ( chars += symbols ) : undefined;
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt( Math.floor(Math.random() * chars.length) )
    }
    return password;
}

program
    .version(version)
    .option('-l, --length <number>', 'length of password', parseInt )
    // .option('-s, --save', 'save the password to password.txt')
    .option('-nn, --no-numbers', 'remove numbers')
    .option('-ns, --no-symbols', 'remove symbols')
    .parse(process.argv);

const { length = 8, numbers, symbols, save } = program.opts();

console.log(chalk.blue('Length: ') + ' ' + chalk.red(length) );
console.log(chalk.blue('Numbers: ') + ' ' + chalk.red(numbers) );
console.log(chalk.blue('Symbols: ') + ' ' + chalk.red(symbols) );
const password = createPassword( length, numbers, symbols );
console.log(chalk.blue('Generate password: ' ) + chalk.bold( password ));
clipboardy.writeSync( password );
console.log(chalk.yellowBright('Password copied to clipboard' ) );
