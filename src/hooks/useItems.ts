import React from "react";
import { Entity, Key } from "../models/Entity"
import { CrudService } from "../services/CrudService";

export interface IUseItems<T> {
    items: T[];
    selected: T[];
    setSelected: (items: T[]) => void;
}

export const useItems = <T extends Entity>(key: Key): IUseItems<T> => {
    const [items, setItems] = React.useState<T[]>([]);
    const [selected, setSelected] = React.useState<T[]>([]);

    React.useEffect(() => {
        const service = new CrudService<T>(key);
        setItems(service.list())
    }, [key])

    return { items, selected, setSelected }
}