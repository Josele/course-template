import { ICourseDao } from '@entities/Course';
import * as CourseDao from '@daos/Course/CourseDao';
import { courseDB, userDB } from "@models/index";
import * as UserDao from '@daos/User/UserDao';

export const addStudentsToCourse = async (rl: any) => {
    
    let courseName = await rl.scanf("Enter name of the Course");
    if (!courseName) throw new Error("Response can't be empty!");

    //To avoid compilation error for invalid null type  we force a cast.
    let course = await CourseDao.getByName(courseName) as ICourseDao; 
    if (course === null) {
        throw new Error('Course request is null');
    } 
        
    rl.log("CLI to add several users");
    rl.log("Press q! to exit");
    while(true){
        let userEmail = await rl.scanf("Enter email of user to add to the Course");
        if (!userEmail) throw new Error("Response can't be empty!");
        if (userEmail === "q!"){
            break;
        }
        UserDao.getByEmail(userEmail).then( user2add=> {
            if (user2add === null) {
                rl.log('User request is null');
            }else{
                user2add.addCourse(course);
            }
        });
    }
    
}
