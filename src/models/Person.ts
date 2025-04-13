import { Entity, Key } from "./Entity";

export class Person extends Entity implements IPerson {
    key: Key = "person";
    name: string;
    age: number;

    constructor(name: string = "", age: number = -1) {
        super("person");
        this.name = name;
        this.age = age;
    }
}

interface IPerson extends Entity {
    name: string;
    age: number;
}