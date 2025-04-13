import { Entity, Key } from "./Entity";
import { Job } from "./Job";

export class Task extends Entity implements ITask {
    key: Key = "task";

    id: string;
    description: string;
    job?: Job;
    due: Date;
    done: boolean;

    constructor(id = -1, description = "", job: Job | undefined = undefined, done = false) {
        super()
        this.id = String(id);
        this.description = description;
        this.job = job;
        this.due = new Date();
        this.done = done;
    }

    toString(): string {
        return `${this.id}`
    }
}

interface ITask {
    description: string;
    job?: Job;
    due: Date;
    done: boolean;
}