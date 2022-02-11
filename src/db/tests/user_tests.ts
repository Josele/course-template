
import * as UserDao from '@daos/User/UserDao';
import { UserRoles, IUser} from '@entities/User';
import bcrypt from 'bcrypt';
import { pwdSaltRounds } from '@shared/constants';
import { userDB } from "@models/index";

export const list = async (rl: any) => {
    await UserDao.getAll().then( users=> {
        users.forEach( u => rl.log(`  ${u.name} is ${u.role} role with ${u.email} `));
    });
}

export const searchUser = async (rl: any) => {
    let query = await rl.scanf("Enter email or id");
    if (!query) throw new Error("Response can't be empty!");
    else if (!isNaN(parseInt(query, 10))){
        
        await UserDao.getById(parseInt(query, 10)).then( u=> {
            if (u === null) {
                rl.log('User request is null');
            }else
            {
                rl.log(`  ${u.name} is ${u.role} role with ${u.email} `);
            }
        });
    }
    else{
        await UserDao.getByEmail(query).then( u=> {
            if (u === null) {
                rl.log('User request is null');
            }else
            {
                rl.log(`  ${u.name} is ${u.role} role with ${u.email} `);
            }
        });
    }
}



export const  addOneUser= async (rl: any) => {
    let name = await rl.scanf("Enter name");
    if (!name) throw new Error("Response can't be empty!");
    
    let email = await rl.scanf("Enter email");
    if (!email) throw new Error("Response can't be empty!");

    let  userRole: UserRoles;
    let role = await rl.scanf("Is admin?");
    if (!role) throw new Error("Response can't be empty!");
    else if(role == 1 || role == "true" || role == "True")
        userRole = UserRoles.Admin;
    else
        userRole = UserRoles.Standard;
    
    const salt = await bcrypt.genSalt(pwdSaltRounds);
    const newUser = userDB.build({
        name: name,
        email: email,
        pwdHash:await bcrypt.hash(name, salt),
        role: role });
    await newUser.save();
//    let newUser: IUser = {
//        name: name,
//        email: email,
//        role: role,
//        pwdHash: await bcrypt.hash(name, salt),
//    }
//    await UserDao.add(newUser); 
}


export const  updateUser= async (rl: any) => {
    let id = await rl.scanf("Enter user id to update ");
    if (!id) throw new Error("Response can't be empty!");

    let name = await rl.scanf("Enter new name");
    if (!name) throw new Error("Response can't be empty!");
    
    let email = await rl.scanf("Enter new email");
    if (!email) throw new Error("Response can't be empty!");

    let  userRole: UserRoles;
    let role = await rl.scanf("Is admin?");
    if (!role) throw new Error("Response can't be empty!");
    else if(role == 1 || role == "true" || role == "True")
        userRole = UserRoles.Admin;
    else
        userRole = UserRoles.Standard;
    
    const salt = await bcrypt.genSalt(pwdSaltRounds);
    let newUser: IUser = {
        name: name,
        email: email,
        role: role,
        pwdHash: await bcrypt.hash(name, salt),
    }
    await UserDao.update(id,newUser); 
}



export const  deleteUser= async (rl: any) => {
    let id = await rl.scanf("Enter user id to delete ");
    if (!id) throw new Error("Response can't be empty!");

    await UserDao.deleteOne(id); 
}
