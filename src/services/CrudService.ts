import { Entity, Key } from "../models/Entity";
import { Job } from "../models/Job";
import { Person } from "../models/Person";

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
        new Person("Jane Smith", 25),
        new Person("Bob Johnson", 40),
        new Person("Alice Brown", 35),
        new Person("Mike Brown", 28),
        new Person("Sarah Williams", 32),
        new Person("Tom Smith", 38),
        new Person("Emily Davis", 36),
        new Person("David Miller", 29),
        new Person("Sarah Miller", 31),
        // Add more data here...
    ];
