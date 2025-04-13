import { Entity, Key } from "./Entity";
import { Job } from "./Job";

export class Person extends Entity implements IPerson {
    key: Key = "person"
    id: string;
    age: number;
    job?: Job;

    constructor(id: string = "", age: number = -1, job: Job | undefined = undefined) {
        super();
        this.id = id;
        this.age = age;
        this.job = job;
    }
}

interface IPerson extends Entity {
    id: string;
    age: number;
    job?: Job;
}
