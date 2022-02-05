console.log("Test_db"); 
//import User = require( "../models/index");  	
//import Course = require( "../models/index");  	

//import { User, Course } from  "../models/index";
import { list } from "./user_tests";


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
rl.log = (msg: any) => console.log(msg);  // Add console.log to rl interface

rl.questionP = function (string: string) {   // Add questionP to rl interface
    return new Promise ( (resolve) => {
        this.question(`  ${string}: `, (answer: string) => resolve(answer.trim()))
    })
};

rl.prompt();


rl.on('line', async (line: string) => { 
    try{
        let cmd = line.trim()

        if      ('' ===cmd)   {}
        else if (['lu', 'ul', 'u'].includes(cmd)) { await list(rl);}        
        else if ('e'===cmd)  { rl.log('Bye!'); process.exit(0);}
        else                 {  rl.log('UNSUPPORTED COMMAND!');
                                // help output
                             };
    } catch (err) { rl.log(`  ${err}`);}
    finally       { rl.prompt(); }
});

        
