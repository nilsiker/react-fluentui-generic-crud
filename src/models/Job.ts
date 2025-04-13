import { Entity, Key } from "./Entity";

export class Job extends Entity implements IJob {
    key: Key = "job";
    id: string;
    description: string;

    constructor(name: string = "", description: string = "") {
        super()
        this.id = name;
        this.description = description;
    }

    toString(): string {
        return `${this.id}`
    }
}

interface IJob  {
    description: string;
}