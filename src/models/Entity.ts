
export abstract class Entity {
    readonly key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    static columns<T extends Entity>(ctor: new () => T): (keyof T)[] {
        const instance = new ctor();
        return Object.keys(instance).filter(k => k !== "key") as (keyof T)[];
    }
}

export type Key = "person" | "job";