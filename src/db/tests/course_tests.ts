
import * as CourseDao from '@daos/Course/CourseDao';
import { CourseSeason, ICourse} from '@entities/Course';
import { pwdSaltRounds } from '@shared/constants';
import { courseDB } from "@models/index";

export const listCourses = async (rl: any) => {
    await CourseDao.getAll().then( courses=> {
        courses.forEach( c => rl.log(`  ${c.name} open ${c.year} in ${c.season} `));
    });
}

export const searchCourse = async (rl: any) => {
    let query = await rl.scanf("Enter name or id");
    if (!query) throw new Error("Response can't be empty!");
    else if (!isNaN(parseInt(query, 10))){
        
        await CourseDao.getById(parseInt(query, 10)).then( c=> {
            if (c === null) {
                rl.log('Course request is null');
            }else
            {
                rl.log(`  ${c.name} open ${c.year} in ${c.season} `);
            }
        });
    }
    else{
        await CourseDao.getByName(query).then( c=> {
            if (c === null) {
                rl.log('Course request is null');
            }else
            {
                rl.log(`  ${c.name} open ${c.year} in ${c.season} `);
            }
        });
    }
}



export const  addOneCourse= async (rl: any) => {
    let name = await rl.scanf("Enter name");
    if (!name) throw new Error("Response can't be empty!");
    
    let year = await rl.scanf("Enter year");
    if (!year) throw new Error("Response can't be empty!");

    let courseSeason: CourseSeason;
    let season = await rl.scanf("Season");
    if (!season) throw new Error("Response can't be empty!");
    else if(season == 1 || season == "First" || season == "First4mester")
        courseSeason = CourseSeason.First4mester;
    else if(season == 2 || season == "Second" || season == "Second4mester")
        courseSeason = CourseSeason.Second4mester;
    else
        throw new Error("Response is invalid!");
    const newCourse = courseDB.build({
        name: name,
        year:year,
        season: season });
    await newCourse.save();
}


export const  updateCourse= async (rl: any) => {
    let id = await rl.scanf("Enter course id to update ");
    if (!id) throw new Error("Response can't be empty!");
    //searchCourse
}



export const  deleteCourse= async (rl: any) => {
    let id = await rl.scanf("Enter course id to delete ");
    if (!id) throw new Error("Response can't be empty!");

    await CourseDao.deleteOne(id); 
}
