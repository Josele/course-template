
import { User, Course } from  "../models/index";

// Show all users in DB
export const list = async (rl: any) => {
    rl.log(User);
    await User.findAll().then( users=> {
        users.forEach( u => rl.log(`  ${u.name} is ${u.role} role with ${u.email} creaed the  ${u.createdAt}`));
    });
}
