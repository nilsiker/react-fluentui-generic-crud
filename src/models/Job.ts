import { Entity, Keys } from "./Entity";

export class Job extends Entity implements IJob {
    key: keyof Keys = "job";
    name: string;
    description: string;

    constructor(name: string = "", description: string = "") {
        super("job")
        this.name = name;
        this.description = description;
    }

    columns(): (keyof Job)[] {
        return Object.keys(this) as (keyof Job)[];
    }
}

interface IJob  {
    name: string;
    description: string;
}