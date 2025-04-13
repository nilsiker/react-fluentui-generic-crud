import React from "react";
import { Entity } from "../models/Entity";
import { IUseItems } from "../hooks/useItems";

export function createItemsContext<T extends Entity>() {
  const Context = React.createContext<IUseItems<T> | undefined>(undefined);

  const useItems = (): IUseItems<T> => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error("useItems must be used within a ItemsContextProvider");
    }
    return context;
  };

  const Provider: React.FC<{
    value: IUseItems<T>;
    children: React.ReactNode;
  }> = ({ value, children }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [useItems, Provider] as const;
}
