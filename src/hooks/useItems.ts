import React from "react";
import { Entity } from "../models/Entity"
import { CrudService } from "../services/CrudService";

export interface IUseItems<T> {
    items: T[];
    selected: T[];
    setSelected: (items: T[]) => void;
}

export const useItems = <T extends Entity>(ctor: new() => T): IUseItems<T> => {
    const [items, setItems] = React.useState<T[]>([]);
    const [selected, setSelected] = React.useState<T[]>([]);

    React.useEffect(() => {
        const service = new CrudService<T>(ctor);
        setItems(service.list())
    }, [ctor])

    return { items, selected, setSelected }
}