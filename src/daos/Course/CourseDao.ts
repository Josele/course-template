import { ICourse, ICourseDao } from '@entities/Course';
import { courseDB } from "@models/index";


/**
 * Module to defer objects from database operations
 * Functions accept ICourseDao | ICourse and return ICourse.
 */

/**
 * @param name
 */
export async function getByName(name: string): Promise< ICourseDao | null> {
    let course  = await courseDB.findOne({
        where: {
            name: name,
        }
    });
    return Promise.resolve(course);
}


/**
 * 
 */
export async function getAll(): Promise<ICourseDao[]> {
    const courses = await courseDB.findAll();
    return Promise.resolve(courses);
}
/**
 *
 * @param course
 */
export async function add(course: ICourseDao |  ICourse): Promise<void> {
    await courseDB.create(course);
    return Promise.resolve(undefined);
}


/**
 *
 * @param id
 */
export async function getById(id: number): Promise< ICourseDao | null> {
    let course  = await courseDB.findOne({
        where: {
            id: id,
        }
    });
    return Promise.resolve(course);
}


/**
 *
 * @param course
 */
export async function update( id: number, course: ICourseDao |  ICourse): Promise<void> {
    let courseEntry  = await courseDB.findOne({
        where: {
            id: id,
        }
    });
    if (courseEntry===null)throw new Error('Course not found');
    courseEntry.update(course);
    return Promise.resolve(undefined);
}


/**
 *
 * @param id
 */
export async function deleteOne( id: number ): Promise<void> {
    let n: number = await courseDB.destroy(
        { where: {id: id}}
    );
    if (n===0)throw new Error('Course not found'); 
    return Promise.resolve(undefined);
}
    

    
