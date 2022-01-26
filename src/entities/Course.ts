export enum CourseSeason {
    First4mester,
    Second4mester,
}

export interface ICourse {
    id: number;
    name: string;
    year: number;
    season: CourseSeason;
}

export class Course implements ICourse {

    public id: number;
    public name: string;
    public year: number;
    public season: CourseSeason;


    constructor(
        nameOrCourse?: string | ICourse,
        year?: number,
        season?: CourseSeason,
        id?: number,
    ) {
        if (typeof nameOrCourse === 'string' || typeof nameOrCourse === 'undefined') {
            this.name = nameOrCourse || '';
            this.year = year || '';
            this.season = season || CourseSeason.First4mester;
            this.id = id || -1;
        } else {
            this.name = nameOrCourse.name;
            this.year = nameOrCourse.year;
            this.season = nameOrCourse.season;
            this.id = nameOrCourse.id;
        }
    }
}
