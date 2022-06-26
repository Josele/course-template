console.log("Testing_db_with_cli"); 
import { list, searchUser, addOneUser, updateUser, deleteUser } from "./user_tests";
import { listCourses, searchCourse, addOneCourse, updateCourse, deleteCourse } from "./course_tests";
import { addStudentsToCourse } from "./association_tests";


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> "
});
rl.log = (msg: any) => console.log(msg);  // Add console.log to rl interface

rl.scanf = function (string: string) {   // Add questionP to rl interface
    return new Promise ( (resolve) => {
        this.question(`  ${string}: `, (answer: string) => resolve(answer.trim()))
    })
};

rl.prompt();


rl.on('line', async (line: string) => { 
    try{
        let cmd = line.trim()

        if      ('' ===cmd)   {}
        else if (['lu', 'ul', 'l'].includes(cmd)) { await list(rl);}        
        else if (['su', 'us', 's'].includes(cmd)) { await searchUser(rl);}        
        else if (['cu', 'uc', 'c'].includes(cmd)) { await addOneUser(rl);}        
        else if (['uu', 'uu', 'u'].includes(cmd)) { await updateUser(rl);}        
        else if (['du', 'du', 'd'].includes(cmd)) { await deleteUser(rl);}        
        else if (['lc', 'cl'].includes(cmd)) { await listCourses(rl);}        
        else if (['sc', 'cs'].includes(cmd)) { await searchCourse(rl);}        
        else if (['cc', 'cc'].includes(cmd)) { await addOneCourse(rl);}        
        else if (['mc', 'cm'].includes(cmd)) { await updateCourse(rl);}        
        else if (['dc', 'dc'].includes(cmd)) { await deleteCourse(rl);}        
        else if (['as', 'sa'].includes(cmd)) { await addStudentsToCourse(rl);}     
        else if ('e'===cmd)  { rl.log('Bye!'); process.exit(0);}
        else                 {  rl.log('UNSUPPORTED COMMAND!');
                                // help output
                             };
    } catch (err) { rl.log(`  ${err}`);}
    finally       { rl.prompt(); }
});

        
