import { ICourse } from '@entities/Course';



export interface ICourseDao {
    getOne: (name: string) => Promise<ICourse | null>;
    getAll: () => Promise<ICourse[]>;
    add: (course: ICourse) => Promise<void>;
    update: (course: ICourse) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

class CourseDao implements ICourseDao {


    /**
     * @param name
     */
    public getOne(name: string): Promise<ICourse | null> {
        // TODO
        return Promise.resolve(null);
    }


    /**
     *
     */
    public getAll(): Promise<ICourse[]> {
         // TODO
        return Promise.resolve([]);
    }


    /**
     *
     * @param course
     */
    public async add(course: ICourse): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param course
     */
    public async update(course: ICourse): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }


    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
         // TODO
        return Promise.resolve(undefined);
    }
}

export default CourseDao;
