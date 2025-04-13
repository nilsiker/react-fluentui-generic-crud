
export abstract class Entity {
    readonly key: keyof Keys;

    constructor(key: keyof Keys) {
        this.key = key;
    }

    static columns<T extends Entity>(ctor: new () => T): (keyof T)[] {
        const instance = new ctor();
        return Object.keys(instance).filter(k => k !== "key") as (keyof T)[];
    }
}

export type Keys = {
    "person": string;
    "job": string;
}