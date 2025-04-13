import { Entity, Key } from "../models/Entity";
import { Job } from "../models/Job";
import { Person } from "../models/Person";
import { Task } from "../models/Task";

export class CrudService<T extends Entity> {
    readonly key: Key;

    constructor(ctor: new () => T) {
        this.key = new ctor().key;
    }

    list(): T[] {
        let items;
        switch (this.key) {
            case 'job':
                items = jobs;
                break;
            case 'person':
                items = persons;
                break;
            case 'task':
                items = tasks;
                break;
            default:
                throw new Error(`Unknown schema ${this.key}`);
        }

        return items as unknown[] as T[];
    }
}

const jobs = [
    new Job("Software Engineer", "Develop software applications",),
    new Job("Data Scientist", "Analyze and interpret data to make informed decisions"),
    new Job("Carpenter", "Build and repair wooden structures"),
    new Job("Teacher", "Teach students in a classroom"),
    new Job("Doctor", "Provide medical care to patients"),
    new Job("Professor", "Teach advanced courses"),
    new Job("Nurse", "Care for sick people"),
    new Job("Chef", "Prepare and cook delicious meals"),
    new Job("Actor", "Perform on stage or screen"),
    new Job("Dancer", "Move gracefully to music"),
    new Job("Singer", "Sing beautiful songs"),
]


const persons =
    [
        new Person("John Doe", 30, jobs[0]),
        new Person("Jane Smith", 28, jobs[1]),
        new Person("Bob Johnson", 45, jobs[2]),
        new Person("Alice Brown", 35, jobs[3]),
        new Person("Tom Miller", 40, jobs[4]),
        new Person("Sarah Lee", 38, jobs[5]),
        new Person("Mike Davis", 48, jobs[6]),
        new Person("Emily Wilson", 39, jobs[7]),
        new Person("David Taylor", 50, jobs[8]),
        new Person("Jessica Martinez", 29, jobs[9]),
        new Person("William Hall", 42, jobs[10]),
    ];


const tasks: Task[] = [
    new Task(0, "Buy groceries", jobs[0], false),
    new Task(1, "Finish homework", jobs[0], true),
    new Task(2, "Go to the gym", jobs[1], false),
    new Task(3, "Read a book", jobs[1], true),
    new Task(4, "Call mom", jobs[2], false),
    new Task(5, "Buy groceries", jobs[6], false),
    new Task(6, "Finish homework", jobs[4], true),
    new Task(7, "Go to the gym", jobs[3], false),
    new Task(8, "Read a book", jobs[2], true),
    new Task(9, "Call mom", jobs[10], false),
    new Task(10, "Buy groceries", jobs[7], false),
    new Task(11, "Finish homework", jobs[8], true),
    new Task(12, "Go to the gym", jobs[5], false),
    new Task(13, "Read a book", jobs[9], true),
    new Task(14, "Call mom", jobs[6], false),
    new Task(15, "Buy groceries", jobs[10], false),
    new Task(16, "Finish homework", jobs[7], true),
    new Task(17, "Go to the gym", jobs[4], false),
    new Task(18, "Read a book", jobs[5], true),
    new Task(19, "Call mom", jobs[3], false),
    new Task(20, "Buy groceries", jobs[6], false),
    new Task(21, "Finish homework", jobs[4], true),
    new Task(22, "Go to the gym", jobs[7], false),
    new Task(23, "Read a book", jobs[8], true),
]



