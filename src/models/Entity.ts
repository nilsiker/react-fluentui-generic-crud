export type Key = "person" | "job" | "task";

export abstract class Entity {
    abstract key: Key;
    abstract id: string;

    static COLUMN_NAMES<T extends Entity>(ctor: new () => T): (keyof T)[] {
        const instance = new ctor();
        return Object.keys(instance).filter(k => k !== "key") as (keyof T)[];
    }
}
